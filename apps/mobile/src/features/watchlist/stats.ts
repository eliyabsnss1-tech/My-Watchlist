import type { SavedTitle } from "./model";

export interface Stats {
  readonly total: number;
  readonly watched: number;
  readonly left: {
    readonly movies: number;
    readonly shows: number;
    readonly episodes: number;
    readonly minutes: number;
    readonly movieMinutes: number;
    readonly showMinutes: number;
  };
  readonly watchedMinutes: number;
  readonly watchedLast30Days: number;
  readonly topGenres: ReadonlyArray<{ readonly name: string; readonly count: number }>;
  readonly comingUp: ReadonlyArray<{
    readonly item: SavedTitle;
    readonly date: string;
    readonly label: string;
  }>;
  readonly quickPicks: ReadonlyArray<SavedTitle>;
  readonly missingInfo: number;
}

const minutesOf = (x: SavedTitle) =>
  x.type === "movie" ? x.runtime : (x.episodes ?? 0) * x.runtime;

export function computeStats(list: ReadonlyArray<SavedTitle>, today: string, now: number): Stats {
  const todo = list.filter((x) => !x.watched);
  const done = list.filter((x) => x.watched);
  const movies = todo.filter((x) => x.type === "movie");
  const shows = todo.filter((x) => x.type === "tv");
  const movieMinutes = movies.reduce((s, x) => s + x.runtime, 0);
  const showMinutes = shows.reduce((s, x) => s + minutesOf(x), 0);

  const genreCounts = new Map<string, number>();
  for (const x of todo) for (const g of x.genres) genreCounts.set(g, (genreCounts.get(g) ?? 0) + 1);

  const comingUp = list
    .flatMap((item) => {
      if (item.type === "tv" && item.next && item.next >= today)
        return [{ item, date: item.next, label: "New episode" }];
      if (item.date > today)
        return [{ item, date: item.date, label: item.type === "movie" ? "Release" : "Premiere" }];
      return [];
    })
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);

  return {
    total: list.length,
    watched: done.length,
    left: {
      movies: movies.length,
      shows: shows.length,
      episodes: shows.reduce((s, x) => s + (x.episodes ?? 0), 0),
      minutes: movieMinutes + showMinutes,
      movieMinutes,
      showMinutes,
    },
    watchedMinutes: done.reduce((s, x) => s + minutesOf(x), 0),
    watchedLast30Days: done.filter((x) => (x.watchedAt ?? 0) > now - 30 * 864e5).length,
    topGenres: [...genreCounts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
    comingUp,
    quickPicks: movies
      .filter((x) => x.runtime > 0 && x.date <= today)
      .sort((a, b) => a.runtime - b.runtime)
      .slice(0, 3),
    missingInfo: todo.filter((x) => (x.type === "movie" ? !x.runtime : !x.episodes || !x.runtime))
      .length,
  };
}
