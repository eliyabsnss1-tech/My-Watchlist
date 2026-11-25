import * as Clock from "effect/Clock";
import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";
import { Atom } from "effect/reactivity";

import { runtime } from "../../lib/runtime";
import * as Catalog from "./Catalog";
import * as List from "./list";
import { DeletedTitle, SavedTitle, Settings, type CatalogItem } from "./model";

export const listAtom = Atom.kvs({
  runtime,
  key: "watchlist.list",
  schema: Schema.Array(SavedTitle),
  defaultValue: () => [],
}).pipe(Atom.keepAlive);

export const deletedAtom = Atom.kvs({
  runtime,
  key: "watchlist.deleted",
  schema: Schema.Array(DeletedTitle),
  defaultValue: () => [],
}).pipe(Atom.keepAlive);

export const settingsAtom = Atom.kvs({
  runtime,
  key: "watchlist.settings",
  schema: Settings,
  defaultValue: () => Schema.decodeSync(Settings)({}),
}).pipe(Atom.keepAlive);

export const segmentAtom = Atom.make<"todo" | "done">("todo").pipe(Atom.keepAlive);

export const queryAtom = Atom.make("").pipe(Atom.keepAlive);

const debouncedQueryAtom = Atom.debounce(queryAtom, "400 millis");

export const searchAtom = runtime
  .atom((get) =>
    Effect.gen(function* () {
      const catalog = yield* Catalog.Catalog;
      return yield* catalog.search(get(debouncedQueryAtom), get(settingsAtom));
    }),
  )
  .pipe(Atom.keepAlive);

/** Search results and saved titles by key, so details can open either. */
export const knownItemsAtom = Atom.make((get): ReadonlyMap<string, CatalogItem> => {
  const known = new Map<string, CatalogItem>();
  const search = get(searchAtom);
  if (search._tag === "Success") for (const item of search.value.items) known.set(item.key, item);
  for (const item of get(listAtom)) known.set(item.key, item);
  return known;
});

export const detailsAtom = Atom.family((key: string) =>
  runtime.atom((get) =>
    Effect.gen(function* () {
      const base = get.once(knownItemsAtom).get(key);
      if (!base) return undefined;
      const catalog = yield* Catalog.Catalog;
      const full = yield* catalog
        .details(base, get(settingsAtom))
        .pipe(Effect.orElseSucceed(() => ({})));
      const merged = { ...base, ...full };
      if (get.once(listAtom).some((x) => x.key === key)) {
        get.set(listAtom, List.patch(get.once(listAtom), key, full));
      }
      return merged;
    }),
  ),
);

export const addTitleAtom = runtime.fn(
  Effect.fnUntraced(function* (item: CatalogItem, get: Atom.FnContext) {
    const now = yield* Clock.currentTimeMillis;
    get.set(listAtom, List.add(get(listAtom), item, now));
    const catalog = yield* Catalog.Catalog;
    const full = yield* catalog
      .details(item, get(settingsAtom))
      .pipe(Effect.orElseSucceed(() => ({})));
    get.set(listAtom, List.patch(get(listAtom), item.key, full));
  }),
);

export const checkTmdbKeyAtom = runtime.fn(
  Effect.fnUntraced(function* (key: string, get: Atom.FnContext) {
    if (key) {
      const catalog = yield* Catalog.Catalog;
      yield* catalog.checkTmdbKey(key);
    }
    get.set(settingsAtom, { ...get(settingsAtom), tmdbKey: key });
  }),
);

const WEEK = 7 * 864e5;

/** Mounted by the watchlist screen: refreshes runtime, seasons and streaming info for stale titles. */
export const refreshStaleAtom = runtime.atom((get) =>
  Effect.gen(function* () {
    const settings = get(settingsAtom);
    const now = yield* Clock.currentTimeMillis;
    const catalog = yield* Catalog.Catalog;
    const stale = get
      .once(listAtom)
      .filter((x) => {
        if (x.src === "itunes") return false;
        if (x.src === "tvmaze") return !x.refreshed || now - x.refreshed > WEEK;
        return (
          !!settings.tmdbKey &&
          (!x.prov ||
            x.prov.region !== settings.region ||
            !x.refreshed ||
            now - x.refreshed > WEEK ||
            (x.type === "movie" && x.coll === undefined))
        );
      })
      .slice(0, 12);
    for (const item of stale) {
      const full = yield* catalog.details(item, settings).pipe(Effect.orElseSucceed(() => ({})));
      get.set(listAtom, List.patch(get.once(listAtom), item.key, full));
    }
    return stale.length;
  }),
);
