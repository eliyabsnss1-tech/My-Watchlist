import * as DateTime from "effect/DateTime";

export const nowMillis = (): number => DateTime.toEpochMillis(DateTime.nowUnsafe());

export const todayIso = (): string => DateTime.formatIsoDateUtc(DateTime.nowUnsafe());

export const isFuture = (date: string): boolean => !!date && date > todayIso();

export const year = (date: string): string => date.slice(0, 4);

export function fmtRuntime(minutes: number): string {
  if (!minutes) return "";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h${m ? ` ${m}m` : ""}` : `${m}m`;
}

export function fmtDuration(minutes: number): string {
  if (!minutes) return "0m";
  if (minutes >= 2880) return `${(minutes / 1440).toFixed(1)} days`;
  return fmtRuntime(minutes);
}

export function fmtDate(date: string): string {
  if (!date) return "";
  const parsed = DateTime.make(`${date}T00:00:00Z`);
  if (parsed._tag === "None") return date;
  return DateTime.formatUtc(parsed.value, {
    locale: "en-US",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** "2026-12-03" → { month: "Dec", day: "3" } for calendar chips. */
export function monthDay(date: string): { readonly month: string; readonly day: string } {
  const [, m, d] = date.split("-");
  return { month: MONTHS[Number(m) - 1] ?? "", day: String(Number(d) || "") };
}

export function ago(millis: number): string {
  const minutes = Math.round((nowMillis() - millis) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

const pad2 = (n: number) => String(n).padStart(2, "0");

/** The phone's wall-clock time now, as "2026-12-03T18:00:00". */
export function localNowIso(): string {
  const p = DateTime.toParts(DateTime.setZone(DateTime.nowUnsafe(), DateTime.zoneMakeLocal()));
  return `${p.year}-${pad2(p.month)}-${pad2(p.day)}T${pad2(p.hour)}:${pad2(p.minute)}:${pad2(p.second)}`;
}

/** Epoch millis of a wall-clock time like "2026-12-03T18:00:00" in the phone's time zone. */
export function localMillis(iso: string): number | undefined {
  const [year = 0, month = 0, day = 0, hour = 0, minute = 0] = iso.split(/[-T:]/).map(Number);
  const zoned = DateTime.makeZoned(
    { year, month, day, hour, minute },
    { timeZone: DateTime.zoneMakeLocal(), adjustForTimeZone: true },
  );
  return zoned._tag === "Some" ? DateTime.toEpochMillis(zoned.value) : undefined;
}
