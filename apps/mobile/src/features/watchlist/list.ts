import * as Option from "effect/Option";
import * as Schema from "effect/Schema";

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
  date: (a, b) => (b.date || "0").localeCompare(a.date || "0"),
  short: (a, b) => (a.runtime || 9999) - (b.runtime || 9999),
  long: (a, b) => (b.runtime || 0) - (a.runtime || 0),
  rating: (a, b) => b.rating - a.rating,
  title: (a, b) => a.title.localeCompare(b.title),
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
