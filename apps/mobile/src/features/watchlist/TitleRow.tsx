import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";

import { Poster } from "../../components/ui/Poster";
import { cn } from "../../lib/cn";
import { fmtDate, fmtRuntime, isFuture } from "../../lib/time";
import type { SavedTitle, Settings } from "./model";

export const TMDB_IMG = "https://image.tmdb.org/t/p/";

export const posterUri = (
  item: { readonly src: string; readonly poster: string },
  big = false,
): string => {
  if (!item.poster) return "";
  if (item.src === "tmdb") return `${TMDB_IMG}${big ? "w342" : "w185"}${item.poster}`;
  return item.poster;
};

const logosOf = (entries: ReadonlyArray<readonly [string, string]>) =>
  entries.slice(0, 3).flatMap(([, logo]) => (logo ? [`${TMDB_IMG}w92${logo}`] : []));

const namesOf = (entries: ReadonlyArray<readonly [string, string]>) =>
  entries
    .slice(0, 2)
    .map(([name]) => name)
    .join(", ") + (entries.length > 2 ? ` +${entries.length - 2}` : "");

function whereLine(
  item: SavedTitle,
  settings: Settings,
): { readonly logos: ReadonlyArray<string>; readonly text: string } {
  const p = item.prov;
  const coming = isFuture(item.date) ? `Coming ${fmtDate(item.date)}` : "";
  if (p && p.region === settings.region) {
    const s = [...p.stream, ...p.free];
    if (s.length) return { logos: logosOf(s), text: namesOf(s) };
    const likely = p.likely ?? [];
    if (likely.length) return { logos: logosOf(likely), text: `${namesOf(likely)} (likely)` };
    if (coming) return { logos: [], text: coming };
    const shops = [...p.rent, ...p.buy].filter(
      ([name], i, all) => all.findIndex(([n]) => n === name) === i,
    );
    if (shops.length)
      return {
        logos: logosOf(shops),
        text: `${p.rent.length && p.buy.length ? "Rent or buy" : p.rent.length ? "Rent" : "Buy"} · ${namesOf(shops)}`,
      };
    return { logos: [], text: `Not streaming in ${settings.region}` };
  }
  if (coming) return { logos: [], text: coming };
  if (item.channel) return { logos: [], text: `On ${item.channel}` };
  return { logos: [], text: "Tap for where to watch" };
}

/** A faint wash of the poster's colors behind the row; the title page shows them fully. */
export function PosterTint({ uri }: { readonly uri: string }) {
  if (!uri) return null;
  return (
    <Image
      source={{ uri }}
      blurRadius={24}
      contentFit="cover"
      pointerEvents="none"
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.22 }}
    />
  );
}

export interface TitleRowProps {
  readonly item: SavedTitle;
  readonly settings: Settings;
  readonly onOpen: () => void;
}

/** Every row is exactly the same height: each line is one line and trims with "…". */
export function TitleRow({ item, settings, onOpen }: TitleRowProps) {
  const movie = item.type === "movie";
  const length = movie
    ? fmtRuntime(item.runtime)
    : [
        item.seasons ? `${item.seasons} season${item.seasons > 1 ? "s" : ""}` : "",
        item.runtime ? `${item.runtime}m/ep` : "",
      ]
        .filter(Boolean)
        .join(" · ");
  const released = item.date ? fmtDate(item.date) : "Release TBA";
  const line1 = [movie ? "Movie" : "Show", movie ? released : "", length]
    .filter(Boolean)
    .join(" · ");
  const line2 = [
    item.rating ? `★ ${item.rating.toFixed(1)}` : "",
    item.genres.slice(0, 2).join(", "),
  ]
    .filter(Boolean)
    .join(" · ");
  const where = whereLine(item, settings);
  const dim = item.watched ? "opacity-60" : "";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${item.title}, ${line1}`}
      onPress={onOpen}
      className="h-[98px] flex-row items-center gap-3 overflow-hidden rounded-3xl bg-surface px-2.5"
    >
      <PosterTint uri={posterUri(item)} />
      <Poster uri={posterUri(item)} title={item.title} />
      <View className="flex-1 justify-center">
        <Text numberOfLines={1} className={cn("text-[16px] font-semibold leading-5 text-ink", dim)}>
          {item.title}
        </Text>
        <Text
          numberOfLines={1}
          className={cn("mt-0.5 text-[12.5px] leading-[17px] text-muted", dim)}
        >
          {line1}
          {movie && isFuture(item.date) ? "  ·  Upcoming" : ""}
        </Text>
        <Text numberOfLines={1} className={cn("text-[12.5px] leading-[17px] text-muted", dim)}>
          {line2 || " "}
        </Text>
        <View className={cn("mt-1 h-5 flex-row items-center gap-1", dim)}>
          {where.logos.map((uri) => (
            <Image key={uri} source={{ uri }} style={{ width: 20, height: 20, borderRadius: 6 }} />
          ))}
          <Text numberOfLines={1} className="ml-0.5 flex-1 text-[12.5px] text-ink/80">
            {where.text}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
