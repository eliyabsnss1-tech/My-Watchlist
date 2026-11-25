import { assert, describe, it } from "@effect/vitest";

import * as List from "./list";
import type { SavedTitle } from "./model";
import { computeStats } from "./stats";

const title = (key: string, extra: Partial<SavedTitle> = {}): SavedTitle => ({
  key,
  src: "tvmaze",
  id: 1,
  type: "movie",
  title: key,
  date: "2020-01-01",
  poster: "",
  rating: 0,
  overview: "",
  genres: [],
  runtime: 100,
  added: 1,
  watched: false,
  myRating: 0,
  ...extra,
});

describe("watchlist list", () => {
  it("deleting keeps the newest 15 and restoring puts the title back where it was", () => {
    let deleted = List.pushDeleted([], title("a", { watched: true }), 1);
    for (let i = 0; i < 20; i++) deleted = List.pushDeleted(deleted, title(`x${i}`), 2 + i);
    assert.strictEqual(deleted.length, 15);
    const kept = List.pushDeleted([], title("a", { watched: true }), 1)[0];
    assert.isDefined(kept);
    if (!kept) return;
    const restored = List.restore([], kept);
    assert.deepStrictEqual(
      restored.map((x) => [x.key, x.watched, "deletedAt" in x]),
      [["a", true, false]],
    );
  });

  it("imports old backups and skips titles already in the list", () => {
    const result = List.importTitles(
      [title("a")],
      [
        { key: "a", id: 1, type: "movie", title: "A" },
        { key: "b", id: 2, type: "tv", title: "B" },
        { nope: true },
      ],
    );
    assert.strictEqual(result.added, 1);
    assert.deepStrictEqual(
      result.list.map((x) => x.key),
      ["a", "b"],
    );
  });

  it("stats count time left from runtimes and episodes", () => {
    const s = computeStats(
      [
        title("m", { runtime: 90 }),
        title("s", { type: "tv", runtime: 30, episodes: 10 }),
        title("w", { watched: true }),
      ],
      "2026-01-01",
      0,
    );
    assert.strictEqual(s.left.minutes, 90 + 300);
    assert.strictEqual(s.watched, 1);
    assert.strictEqual(s.quickPicks[0]?.key, "m");
  });

  it("groups movies from the same series and leaves look-alike names apart", () => {
    const items = [
      title("Scary Movie 4", { date: "2006-04-12" }),
      title("Inception"),
      title("Scary Movie", { date: "2000-07-07" }),
      title("Up"),
      title("Up in the Air"),
      title("The Matrix", { date: "1999-03-31" }),
      title("The Matrix Reloaded", { date: "2003-05-15" }),
      title("Frozen II"),
      title("Frozen"),
      title("Dune", { coll: { id: 7, name: "Dune Collection" } }),
      title("Dune: Part Two", { coll: { id: 7, name: "Dune Collection" } }),
      title("Scary Movie 3", { type: "tv" }),
    ];
    const groups = List.groupSeries(items).map((g) => g.map((x) => x.title));
    assert.deepStrictEqual(groups, [
      ["Scary Movie", "Scary Movie 4"],
      ["Inception"],
      ["Up"],
      ["Up in the Air"],
      ["The Matrix", "The Matrix Reloaded"],
      ["Frozen II", "Frozen"],
      ["Dune", "Dune: Part Two"],
      ["Scary Movie 3"],
    ]);
    assert.strictEqual(List.seriesName(List.groupSeries(items)[0]!), "Scary Movie");
    assert.strictEqual(List.seriesName(List.groupSeries(items)[6]!), "Dune");
  });
});
