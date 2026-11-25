import * as Schema from "effect/Schema";
import { Atom } from "effect/reactivity";

import { runtime } from "../../lib/runtime";
import * as Engine from "./engine";

export type Mode = "mass" | "atoms";

/** What is highlighted in the structure model: one part (zone) or one element everywhere. */
export interface Selection {
  readonly zone: string | null;
  readonly el: string | null;
}

export const NO_SELECTION: Selection = { zone: null, el: null };

const RECENT_MAX = 8;

/** Text in the search field. */
export const inputAtom = Atom.make("").pipe(Atom.keepAlive);

/** The query that was last searched. */
export const queryAtom = Atom.make("").pipe(Atom.keepAlive);

export const modeAtom = Atom.make<Mode>("mass").pipe(Atom.keepAlive);

export const selectionAtom = Atom.make<Selection>(NO_SELECTION).pipe(Atom.keepAlive);

export const showAllAtom = Atom.make(false).pipe(Atom.keepAlive);

export const recentAtom = Atom.kvs({
  runtime,
  key: "elementscope.recent",
  schema: Schema.Array(Schema.String),
  defaultValue: () => [],
}).pipe(Atom.keepAlive);

export const resultAtom = Atom.make((get): Engine.Resolved | null => {
  const q = get(queryAtom).trim();
  if (!q) return null;
  try {
    return Engine.resolve(q);
  } catch {
    // The engine is the website's untyped code; a crash on odd input reads as "no match".
    return { unrecognized: true, query: q, suggest: [] };
  }
});

export const isAnalysis = (r: Engine.Resolved | null): r is Engine.Analysis =>
  !!r && !r.unrecognized && !r.particle;

/** Composition sorted and colored for the current mode, plus the structure model. */
export const preparedAtom = Atom.make((get) => {
  const r = get(resultAtom);
  return isAnalysis(r) ? Engine.prepareResult(r, get(modeAtom)) : null;
});

/** Runs a search and resets everything that belonged to the previous result. */
export const searchAtom = Atom.fnSync((query: string, get) => {
  const q = query.trim();
  get.set(inputAtom, q);
  get.set(queryAtom, q);
  get.set(modeAtom, "mass");
  get.set(selectionAtom, NO_SELECTION);
  get.set(showAllAtom, false);
  const r = get(resultAtom);
  if (!r || r.unrecognized) return;
  const recent = get(recentAtom).filter((x) => x.toLowerCase() !== q.toLowerCase());
  get.set(recentAtom, [q, ...recent].slice(0, RECENT_MAX));
});

/** Tapping the selected part or element again clears the selection. */
export const toggleSelection = (current: Selection, next: Selection): Selection =>
  (next.zone && next.zone === current.zone) || (next.el && next.el === current.el)
    ? NO_SELECTION
    : next;
