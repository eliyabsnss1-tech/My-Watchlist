import * as Option from "effect/Option";
import * as Schema from "effect/Schema";

import { todayIso } from "../../lib/time";

import {
  DELETED_MAX,
  SavedTitle,
  type CatalogItem,
  type DeletedTitle,
  type SortOrder,
} from "./model";

type List = ReadonlyArray<SavedTitle>;

export const SORTS: Readonly<Record<SortOrder, (a: SavedTitle, b: SavedTitle) => number>> = {
  added: (a, b) => b.added - a.added,
  addedOld: (a, b) => a.added - b.added,
  date: (a, b) => (b.date || "0").localeCompare(a.date || "0"),
  dateOld: (a, b) => (a.date || "9").localeCompare(b.date || "9"),
  // Next release or episode soonest first; titles with nothing coming go last.
  upcoming: (a, b) => {
    const next = (x: SavedTitle) => x.next || (x.date > todayIso() ? x.date : "") || "9";
    return next(a).localeCompare(next(b)) || b.added - a.added;
  },
  short: (a, b) => (a.runtime || 9999) - (b.runtime || 9999),
  long: (a, b) => (b.runtime || 0) - (a.runtime || 0),
  rating: (a, b) => b.rating - a.rating,
  title: (a, b) => a.title.localeCompare(b.title),
  titleDesc: (a, b) => b.title.localeCompare(a.title),
  movies: (a, b) => Number(a.type !== "movie") - Number(b.type !== "movie") || b.added - a.added,
  shows: (a, b) => Number(a.type !== "tv") - Number(b.type !== "tv") || b.added - a.added,
};

export const visible = (list: List, seg: "todo" | "done", sort: SortOrder): Array<SavedTitle> =>
  list.filter((x) => (seg === "todo" ? !x.watched : x.watched)).sort(SORTS[sort]);

export const add = (list: List, item: CatalogItem, now: number): List =>
  list.some((x) => x.key === item.key)
    ? list
    : [...list, { ...item, added: now, watched: false, myRating: 0 }];

export const patch = (list: List, key: string, update: Partial<SavedTitle>): List =>
  list.map((x) => (x.key === key ? { ...x, ...update } : x));

export const toggleWatched = (list: List, key: string, now: number): List =>
  list.map((x) =>
    x.key === key ? { ...x, watched: !x.watched, watchedAt: x.watched ? 0 : now } : x,
  );

export const remove = (list: List, key: string): List => list.filter((x) => x.key !== key);

export const pushDeleted = (
  deleted: ReadonlyArray<DeletedTitle>,
  item: SavedTitle,
  now: number,
): ReadonlyArray<DeletedTitle> =>
  [{ ...item, deletedAt: now }, ...deleted.filter((x) => x.key !== item.key)].slice(0, DELETED_MAX);

export const restore = (list: List, item: DeletedTitle): List => {
  if (list.some((x) => x.key === item.key)) return list;
  const { deletedAt: _deletedAt, ...rest } = item;
  return [...list, rest];
};

const decodeSaved = Schema.decodeUnknownOption(SavedTitle);

/** Merges titles from a backup file; returns the new list and how many were added. */
export const importTitles = (
  list: List,
  raw: ReadonlyArray<unknown>,
): { readonly list: List; readonly added: number } => {
  const known = new Set(list.map((x) => x.key));
  const incoming = raw
    .flatMap((r) => Option.toArray(decodeSaved(r)))
    .filter((x) => !known.has(x.key));
  return { list: [...list, ...incoming], added: incoming.length };
};

/** A title's name without sequel markers: "Frozen II" → "frozen", "Dune: Part Two" → "dune". */
export const seriesBase = (title: string): string =>
  title
    .toLowerCase()
    .replace(/\s*\(\d{4}\)\s*$/, "")
    .split(/\s*[:–—]\s*|\s+-\s+/)[0]!
    .replace(/[^\p{L}\p{N}\s&']/gu, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\s+(part|chapter|vol|volume|episode)\s+\S+$/, "")
    .replace(/\s+(\d{1,2}|ii|iii|iv|v|vi|vii|viii|ix|x)$/, "")
    .replace(/^the /, "")
    .trim();

// "matrix" groups "matrix reloaded"; a short single word like "up" must not group "up in the air".
const prefixOk = (base: string) => base.includes(" ") || base.length >= 5;

/**
 * Movies from the same series (a trilogy, a franchise) become one group, kept where its first
 * title sits in `items`. TMDB's collection decides when known; otherwise matching names do.
 */
export const groupSeries = (items: ReadonlyArray<SavedTitle>): Array<ReadonlyArray<SavedTitle>> => {
  const movies = items.filter((x) => x.type === "movie");
  const groupOf = new Map<SavedTitle, string>();
  const collOfBase = new Map<string, string>();
  for (const m of movies) {
    if (!m.coll) continue;
    groupOf.set(m, `c${m.coll.id}`);
    const b = seriesBase(m.title);
    if (b.length >= 3 && !collOfBase.has(b)) collOfBase.set(b, `c${m.coll.id}`);
  }
  const rest = movies
    .filter((m) => !groupOf.has(m))
    .map((m) => ({ m, base: seriesBase(m.title) }))
    .filter((x) => x.base.length >= 3);
  const bases = [...new Set([...rest.map((x) => x.base), ...collOfBase.keys()])].sort(
    (a, b) => a.length - b.length,
  );
  for (const { m, base } of rest) {
    const root = bases.find((b) => b === base || (prefixOk(b) && base.startsWith(`${b} `)))!;
    groupOf.set(m, collOfBase.get(root) ?? `n${root}`);
  }
  const groups = new Map<string, Array<SavedTitle>>();
  for (const item of items) {
    const g = groupOf.get(item) ?? item.key;
    groups.set(g, [...(groups.get(g) ?? []), item]);
  }
  return [...groups.values()].map((g) =>
    g.length > 1 ? [...g].sort((a, b) => (a.date || "9").localeCompare(b.date || "9")) : g,
  );
};

/** "Scary Movie series", from TMDB's collection name or the shortest title. */
export const seriesName = (group: ReadonlyArray<SavedTitle>): string => {
  const named = group.find((x) => x.coll?.name)?.coll?.name;
  if (named) return named.replace(/\s+collection$/i, "");
  const shortest = [...group].sort((a, b) => a.title.length - b.title.length)[0]!.title;
  return shortest
    .split(/\s*[:–—]\s*|\s+-\s+/)[0]!
    .replace(/\s+(\d{1,2}|II|III|IV|V|VI)$/, "")
    .trim();
};

/** Titles to base suggestions on: the newest additions from both tabs. */
export const suggestionSeeds = (list: ReadonlyArray<SavedTitle>, count = 6): Array<SavedTitle> => {
  const newest = (xs: ReadonlyArray<SavedTitle>) =>
    xs.filter((x) => x.src === "tmdb").sort((a, b) => b.added - a.added);
  const todo = newest(list.filter((x) => !x.watched));
  const done = newest(list.filter((x) => x.watched));
  const half = Math.ceil(count / 2);
  const picked = [...todo.slice(0, half), ...done.slice(0, count - half)];
  // Top up from either tab when one has fewer than its half.
  for (const x of [...todo, ...done]) {
    if (picked.length >= count) break;
    if (!picked.includes(x)) picked.push(x);
  }
  return picked;
};

/**
 * Merges "more like this" lists into one: a title recommended for several of your titles, or near
 * the top of a list, ranks higher. Titles already saved are left out.
 */
export const rankSuggestions = (
  lists: ReadonlyArray<ReadonlyArray<CatalogItem>>,
  saved: ReadonlySet<string>,
  max = 20,
): Array<CatalogItem> => {
  const score = new Map<string, { item: CatalogItem; score: number }>();
  for (const items of lists)
    items.forEach((item, i) => {
      if (saved.has(item.key)) return;
      const prev = score.get(item.key);
      const add = 1 + Math.max(0, 20 - i) / 20;
      score.set(item.key, { item, score: (prev?.score ?? 0) + add });
    });
  return [...score.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map((x) => x.item);
};
