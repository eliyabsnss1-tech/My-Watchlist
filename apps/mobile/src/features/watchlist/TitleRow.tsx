import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Clock, Layers, Star, Trash2, type LucideIcon } from "lucide-react-native";
import { useRef } from "react";
import { Pressable, Text, View, type HostInstance } from "react-native";

import { Poster } from "../../components/ui/Poster";
import { cn } from "../../lib/cn";
import { haptic } from "../../lib/haptics";
import { fmtDate, fmtRuntime, isFuture, year } from "../../lib/time";
import { colors } from "../../theme";
import { REGIONS, type SavedTitle, type Settings } from "./model";

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

type Where = {
  /** What kind of answer this is; decides the color. */
  readonly kind: "stream" | "likely" | "shop" | "coming" | "none" | "unknown";
  readonly logos: ReadonlyArray<string>;
  readonly text: string;
  /** A quiet word after the name, e.g. "rent or buy". */
  readonly note?: string;
};

function whereLine(item: SavedTitle, settings: Settings): Where {
  const p = item.prov;
  const country = REGIONS[settings.region] ?? settings.region;
  const coming = isFuture(item.date) ? `Coming ${fmtDate(item.date)}` : "";
  if (p && p.region === settings.region) {
    const s = [...p.stream, ...p.free];
    if (s.length) return { kind: "stream", logos: logosOf(s), text: namesOf(s) };
    const likely = p.likely ?? [];
    if (likely.length)
      return { kind: "likely", logos: logosOf(likely), text: namesOf(likely), note: "probably" };
    if (coming) return { kind: "coming", logos: [], text: coming };
    const shops = [...p.rent, ...p.buy].filter(
      ([name], i, all) => all.findIndex(([n]) => n === name) === i,
    );
    if (shops.length) {
      const how = p.rent.length && p.buy.length ? "Rent or buy" : p.rent.length ? "Rent" : "Buy";
      return { kind: "shop", logos: logosOf(shops), text: namesOf(shops), note: how.toLowerCase() };
    }
    return { kind: "none", logos: [], text: `Not streaming in ${country}` };
  }
  if (coming) return { kind: "coming", logos: [], text: coming };
  if (item.channel) return { kind: "stream", logos: [], text: `On ${item.channel}` };
  return { kind: "unknown", logos: [], text: "Where to watch: tap to check" };
}

const WHERE_COLOR: Readonly<Record<Where["kind"], string>> = {
  stream: colors.ink,
  likely: colors.ink,
  shop: colors.ink,
  coming: colors.star,
  none: colors.muted,
  unknown: colors.muted,
};

/** The poster's colors glowing from the left of the row and fading to black on the right. */
export function PosterTint({ uri }: { readonly uri: string }) {
  if (!uri) return null;
  return (
    <View
      pointerEvents="none"
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <Image
        source={{ uri }}
        blurRadius={30}
        contentFit="cover"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.7 }}
      />
      <LinearGradient
        colors={["rgba(2,5,13,0.1)", "rgba(2,5,13,0.75)", "rgba(2,5,13,1)"]}
        locations={[0, 0.5, 0.92]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </View>
  );
}

export interface TitleRowProps {
  readonly item: SavedTitle;
  readonly settings: Settings;
  readonly onOpen: () => void;
  /** Shows a trash button on the right; gets the button's spot on screen. */
  readonly onDelete?: ((from: { x: number; y: number; w: number; h: number }) => void) | undefined;
}

function TrashButton({
  title,
  onDelete,
}: {
  readonly title: string;
  readonly onDelete: NonNullable<TitleRowProps["onDelete"]>;
}) {
  const ref = useRef<HostInstance>(null);
  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityLabel={`Delete ${title}`}
      hitSlop={8}
      onPress={() => {
        haptic("light");
        const button = ref.current;
        if (!button) return onDelete({ x: 0, y: 0, w: 0, h: 0 });
        button.measureInWindow((x, y, w, h) => onDelete({ x, y, w, h }));
      }}
      className="size-10 items-center justify-center rounded-full bg-white/10 active:bg-danger/25"
    >
      <Trash2 size={19} color={colors.danger} strokeWidth={2.2} />
    </Pressable>
  );
}

/** One fact with a small icon in front, e.g. a clock and "1h 28m". */
function Fact({
  icon: Icon,
  color = colors.muted,
  children,
}: {
  readonly icon: LucideIcon;
  readonly color?: string;
  readonly children: string;
}) {
  return (
    <View className="flex-row items-center gap-1">
      <Icon size={12} color={color} strokeWidth={2.4} />
      <Text numberOfLines={1} className="text-[12.5px] text-ink/85">
        {children}
      </Text>
    </View>
  );
}

/**
 * Every row is the same height, in four levels: the title; the facts (type, year, length,
 * rating); the genres or next episode; and where to watch, in plain words.
 */
export function TitleRow({ item, settings, onOpen, onDelete }: TitleRowProps) {
  const movie = item.type === "movie";
  const yr = year(item.date);
  const length = movie
    ? fmtRuntime(item.runtime)
    : item.seasons
      ? `${item.seasons} season${item.seasons > 1 ? "s" : ""}`
      : "";
  const episode = !movie && item.runtime ? `${item.runtime}m per episode` : "";
  const nextEpisode = !movie && item.next && isFuture(item.next) ? item.next : "";
  const where = whereLine(item, settings);
  const dim = item.watched ? "opacity-60" : "";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={[item.title, movie ? "Movie" : "Show", yr, length, where.text]
        .filter(Boolean)
        .join(", ")}
      onPress={onOpen}
      className="h-[98px] flex-row items-center gap-3 overflow-hidden rounded-3xl bg-surface px-2.5"
    >
      <PosterTint uri={posterUri(item)} />
      <Poster uri={posterUri(item)} title={item.title} />
      <View className={cn("flex-1 justify-center", dim)}>
        <Text numberOfLines={1} className="text-[16px] font-bold leading-5 text-ink">
          {item.title}
        </Text>
        <View className="mt-1 flex-row items-center gap-2.5 overflow-hidden">
          <View className="rounded-md bg-white/12 px-1.5 py-px">
            <Text className="text-[10px] font-bold tracking-wider text-ink/80">
              {movie ? "MOVIE" : "SHOW"}
            </Text>
          </View>
          {movie && yr ? <Text className="text-[12.5px] text-ink/85">{yr}</Text> : null}
          {length ? <Fact icon={movie ? Clock : Layers}>{length}</Fact> : null}
          {!movie && episode && !length ? <Fact icon={Clock}>{episode}</Fact> : null}
          {item.rating ? (
            <Fact icon={Star} color={colors.star}>
              {item.rating.toFixed(1)}
            </Fact>
          ) : null}
        </View>
        <Text
          numberOfLines={1}
          className={cn(
            "mt-0.5 text-[12px] leading-4",
            nextEpisode ? "font-semibold text-accent" : "text-muted",
          )}
        >
          {nextEpisode
            ? `New episode ${fmtDate(nextEpisode)}`
            : [item.genres.slice(0, 2).join(", "), episode && length ? episode : ""]
                .filter(Boolean)
                .join(" · ") || " "}
        </Text>
        <View className="mt-1.5 h-5 flex-row items-center gap-1.5">
          {where.logos.map((uri) => (
            <Image key={uri} source={{ uri }} style={{ width: 18, height: 18, borderRadius: 5 }} />
          ))}
          <Text
            numberOfLines={1}
            style={{ color: WHERE_COLOR[where.kind] }}
            className="flex-1 text-[12.5px] font-semibold"
          >
            {where.text}
            {where.note ? (
              <Text className="font-normal text-muted">{` · ${where.note}`}</Text>
            ) : null}
          </Text>
        </View>
      </View>
      {onDelete ? <TrashButton title={item.title} onDelete={onDelete} /> : null}
    </Pressable>
  );
}
