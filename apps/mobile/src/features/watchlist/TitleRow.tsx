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

function whereLine(
  item: SavedTitle,
  settings: Settings,
): { readonly logos: ReadonlyArray<string>; readonly text: string } {
  const p = item.prov;
  if (p && p.region === settings.region) {
    const s = [...p.stream, ...p.free];
    if (s.length)
      return {
        logos: s.slice(0, 3).flatMap(([, logo]) => (logo ? [`${TMDB_IMG}w92${logo}`] : [])),
        text:
          s
            .slice(0, 2)
            .map(([name]) => name)
            .join(", ") + (s.length > 2 ? ` +${s.length - 2}` : ""),
      };
    if (p.rent.length || p.buy.length)
      return { logos: [], text: `Rent or buy only in ${settings.region}` };
    return { logos: [], text: `Not streaming in ${settings.region}` };
  }
  if (item.channel) return { logos: [], text: `On ${item.channel}` };
  return { logos: [], text: "Tap for where to watch" };
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
      className="h-[98px] flex-row items-center gap-3 rounded-3xl bg-surface px-2.5"
    >
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
