import type { SavedTitle } from "./model";

export interface Reminder {
  readonly id: string;
  /** Local time, ISO without zone, e.g. "2026-12-03T18:00:00". */
  readonly at: string;
  readonly title: string;
  readonly body: string;
  readonly key: string;
}

const MAX_REMINDERS = 40;

/** Upcoming episode and release days for titles still to watch, soonest first. */
export const upcomingReminders = (
  list: ReadonlyArray<SavedTitle>,
  nowLocalIso: string,
): Array<Reminder> =>
  list
    .flatMap((x): Array<Reminder> => {
      if (x.watched) return [];
      if (x.type === "tv" && x.next) {
        return [
          {
            id: `ep:${x.key}:${x.next}`,
            at: `${x.next}T18:00:00`,
            title: `New episode of ${x.title}`,
            body: "A new episode is out today.",
            key: x.key,
          },
        ];
      }
      if (x.type === "movie" && x.date) {
        return [
          {
            id: `movie:${x.key}:${x.date}`,
            at: `${x.date}T10:00:00`,
            title: `${x.title} is out today`,
            body: "A movie on your watchlist was released.",
            key: x.key,
          },
        ];
      }
      return [];
    })
    .filter((r) => r.at > nowLocalIso)
    .sort((a, b) => a.at.localeCompare(b.at))
    .slice(0, MAX_REMINDERS);

/** The next few titles to watch, in the list's own order. */
export const upNext = (list: ReadonlyArray<SavedTitle>, count: number): Array<SavedTitle> =>
  list
    .filter((x) => !x.watched)
    .sort((a, b) => b.added - a.added)
    .slice(0, count);
