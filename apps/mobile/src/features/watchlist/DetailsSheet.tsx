import { useAtomSet, useAtomValue } from "@effect/atom-react";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { AsyncResult } from "effect/reactivity";
import {
  Check,
  ExternalLink,
  Play,
  Plus,
  RotateCcw,
  Share2,
  Star,
  Trash2,
  type LucideIcon,
} from "lucide-react-native";
import { Linking, Pressable, ScrollView, Share, Text, View } from "react-native";

import { AppText } from "../../components/ui/AppText";
import { EmptyState } from "../../components/ui/EmptyState";
import { Poster } from "../../components/ui/Poster";
import { DragSheet } from "../../components/ui/DragSheet";
import { makeSnack, snackAtom } from "../../components/ui/Snackbar";
import { cn } from "../../lib/cn";
import { haptic } from "../../lib/haptics";
import { colors } from "../../theme";
import { fmtDate, fmtRuntime, isFuture, year } from "../../lib/time";
import type { WatchlistParamList } from "../../navigation-types";
import { REGIONS, type Availability, type CatalogItem } from "./model";
import {
  addTitleAtom,
  detailsAtom,
  knownItemsAtom,
  listAtom,
  relatedAtom,
  settingsAtom,
} from "./state";
import { posterUri, TMDB_IMG } from "./TitleRow";
import { useWatchlistActions } from "./useWatchlistActions";

function Section({
  title,
  children,
}: {
  readonly title: string;
  readonly children: React.ReactNode;
}) {
  return (
    <View className="mt-7">
      <Text className="mb-3 text-[18px] font-bold text-ink">{title}</Text>
      {children}
    </View>
  );
}

/** A round icon with a short word under it, like a player's controls. */
function Action({
  icon: Icon,
  label,
  onPress,
  primary,
  danger,
}: {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly onPress: () => void;
  readonly primary?: boolean;
  readonly danger?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      className="w-[84px] items-center gap-1.5 active:opacity-70"
    >
      <View
        className={cn(
          "size-14 items-center justify-center rounded-full",
          primary ? "bg-primary" : "bg-white/12",
        )}
      >
        <Icon
          size={24}
          strokeWidth={2.2}
          color={primary ? colors.onPrimary : danger ? colors.danger : colors.ink}
        />
      </View>
      <Text numberOfLines={1} className={cn("text-[12px]", danger ? "text-danger" : "text-ink/85")}>
        {label}
      </Text>
    </Pressable>
  );
}

function ProviderGroup({
  label,
  entries,
}: {
  readonly label: string;
  readonly entries: Availability["stream"];
}) {
  if (!entries.length) return null;
  return (
    <View className="mb-4">
      <Text className="mb-2 text-[13px] text-muted">{label}</Text>
      <View className="flex-row flex-wrap gap-4">
        {entries.map(([name, logo]) => (
          <View key={name} className="w-[68px] items-center gap-1.5">
            {logo ? (
              <Image
                source={{ uri: `${TMDB_IMG}w154${logo}` }}
                style={{ width: 52, height: 52, borderRadius: 14 }}
              />
            ) : (
              <View className="size-[52px] items-center justify-center rounded-[14px] bg-white/12">
                <Text className="text-[18px] font-bold text-ink">{name.charAt(0)}</Text>
              </View>
            )}
            <Text
              numberOfLines={2}
              className="text-center text-[11.5px] leading-[14px] text-ink/85"
            >
              {name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

/** The title's own poster, blurred and darkened, so each page takes on its colors. */
function Backdrop({ uri }: { readonly uri: string }) {
  if (!uri) return null;
  return (
    <View
      pointerEvents="none"
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <Image
        source={{ uri }}
        blurRadius={14}
        contentFit="cover"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <LinearGradient
        colors={["rgba(2,5,13,0)", "rgba(2,5,13,0.38)", "rgba(2,5,13,0.6)"]}
        locations={[0, 0.4, 1]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
    </View>
  );
}

/** Related titles TMDB recommends for this one; tap one to open its page. */
function MoreLikeThis({ itemKey }: { readonly itemKey: string }) {
  const navigation = useNavigation<NativeStackNavigationProp<WatchlistParamList>>();
  const related = useAtomValue(relatedAtom(itemKey));
  const items = AsyncResult.isSuccess(related) ? related.value : [];
  if (!items.length) return null;
  return (
    <Section title="More like this">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-5">
        <View className="flex-row gap-3 px-5">
          {items.map((x) => (
            <Pressable
              key={x.key}
              accessibilityRole="button"
              accessibilityLabel={x.title}
              onPress={() => navigation.push("Details", { key: x.key })}
              className="w-[96px] active:opacity-80"
            >
              <Poster uri={posterUri(x, true)} title={x.title} size="tile" />
              <Text numberOfLines={2} className="mt-1.5 text-[12.5px] leading-4 text-ink">
                {x.title}
              </Text>
              <Text numberOfLines={1} className="text-[11.5px] text-muted">
                {[year(x.date), x.type === "movie" ? "Movie" : "Show"].filter(Boolean).join(" · ")}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Section>
  );
}

export function DetailsSheet() {
  const navigation = useNavigation();
  const { key } = useRoute<RouteProp<WatchlistParamList, "Details">>().params;
  const details = useAtomValue(detailsAtom(key));
  const base = useAtomValue(knownItemsAtom).get(key);
  const saved = useAtomValue(listAtom).find((x) => x.key === key);
  const settings = useAtomValue(settingsAtom);
  const add = useAtomSet(addTitleAtom);
  const setSnack = useAtomSet(snackAtom);
  const actions = useWatchlistActions();

  const loaded = AsyncResult.isSuccess(details) ? details.value : undefined;
  const it: CatalogItem | undefined = saved ?? loaded ?? base;
  if (!it) {
    return (
      <DragSheet>
        <EmptyState
          icon={Star}
          title="Not found"
          body="This title isn't in your list or the latest search."
        />
      </DragSheet>
    );
  }

  const trailer =
    it.trailerUrl || (it.trailer ? `https://www.youtube.com/watch?v=${it.trailer}` : "");
  const facts: Array<readonly [string, string]> = [
    ["Released", it.date ? `${fmtDate(it.date)}${isFuture(it.date) ? " (upcoming)" : ""}` : "TBA"],
  ];
  if (it.type === "movie") {
    if (it.runtime) facts.push(["Runtime", `${fmtRuntime(it.runtime)} (${it.runtime} min)`]);
  } else {
    if (it.seasons) facts.push(["Seasons", `${it.seasons} · ${it.episodes ?? 0} episodes`]);
    if (it.runtime) facts.push(["Episode length", `${it.runtime} min`]);
    if (it.next) facts.push(["Next episode", fmtDate(it.next)]);
  }
  if (it.status) facts.push(["Status", it.status]);
  if (it.rating)
    facts.push([it.src === "tmdb" ? "TMDB rating" : "Rating", `★ ${it.rating.toFixed(1)} / 10`]);

  const prov = it.prov && it.prov.region === settings.region ? it.prov : undefined;
  const justWatch = `https://www.justwatch.com/${settings.region.toLowerCase()}/search?q=${encodeURIComponent(it.title)}`;
  const shareUrl = it.url || `https://www.themoviedb.org/${it.type}/${it.id}`;

  return (
    <DragSheet backdrop={<Backdrop uri={posterUri(it, true)} />}>
      <View className="items-center pt-1">
        <View className="shadow-2xl">
          <Poster uri={posterUri(it, true)} title={it.title} size="hero" />
        </View>
        <Text className="mt-4 text-center text-[28px] font-bold leading-[34px] tracking-tight text-ink">
          {it.title}
        </Text>
        <Text className="mt-1.5 text-center text-[14px] text-ink/75">
          {[
            year(it.date) || "TBA",
            it.type === "movie" ? "Movie" : "TV show",
            it.type === "movie"
              ? fmtRuntime(it.runtime)
              : it.seasons
                ? `${it.seasons} season${it.seasons > 1 ? "s" : ""}`
                : "",
            it.rating ? `★ ${it.rating.toFixed(1)}` : "",
          ]
            .filter(Boolean)
            .join("  ·  ")}
        </Text>
        {it.genres.length ? (
          <Text className="mt-1 text-center text-[13px] text-muted">
            {it.genres.slice(0, 3).join(" · ")}
          </Text>
        ) : null}
        {it.tagline ? (
          <Text className="mt-3 px-4 text-center text-[15px] italic leading-5 text-ink/80">
            “{it.tagline}”
          </Text>
        ) : null}
      </View>

      <View className="mt-6 flex-row justify-center gap-2">
        {saved ? (
          <Action
            primary
            icon={saved.watched ? RotateCcw : Check}
            label={saved.watched ? "Unwatch" : "Mark watched"}
            onPress={() => actions.toggleWatched(saved, false)}
          />
        ) : (
          <Action
            primary
            icon={Plus}
            label="Add"
            onPress={() => {
              add(it);
              haptic("success");
              setSnack(
                makeSnack({ kind: "info", title: it.title, message: "Added to your watchlist" }),
              );
            }}
          />
        )}
        {trailer ? (
          <Action icon={Play} label="Trailer" onPress={() => void Linking.openURL(trailer)} />
        ) : null}
        <Action
          icon={Share2}
          label="Share"
          onPress={() =>
            void Share.share({
              message: `${it.title}${it.date ? ` (${year(it.date)})` : ""} ${shareUrl}`,
            })
          }
        />
        {saved ? (
          <Action
            danger
            icon={Trash2}
            label="Delete"
            onPress={() => {
              navigation.goBack();
              actions.remove(saved);
            }}
          />
        ) : null}
      </View>

      <Section
        title={
          prov
            ? `Where to watch in ${REGIONS[settings.region] ?? settings.region}`
            : "Where to watch"
        }
      >
        {prov ? (
          prov.stream.length ||
          prov.free.length ||
          prov.rent.length ||
          prov.buy.length ||
          prov.likely?.length ? (
            <>
              <ProviderGroup label="Streaming" entries={prov.stream} />
              <ProviderGroup label="Probably streaming" entries={prov.likely ?? []} />
              {prov.likely?.length ? (
                <AppText variant="caption" className="mb-2">
                  {`"Probably": TMDB doesn't track ${prov.likely.map(([n]) => n).join(", ")} in ${REGIONS[settings.region] ?? settings.region}, but this title streams there in most other countries.`}
                </AppText>
              ) : null}
              <ProviderGroup label="Free" entries={prov.free} />
              <ProviderGroup
                label={
                  prov.rent.length && prov.buy.length
                    ? "Rent or buy"
                    : prov.rent.length
                      ? "Rent"
                      : "Buy"
                }
                entries={[...prov.rent, ...prov.buy].filter(
                  ([name], i, all) => all.findIndex(([n]) => n === name) === i,
                )}
              />
            </>
          ) : (
            <AppText variant="caption">
              Not available to stream, rent or buy here right now.
            </AppText>
          )
        ) : it.channel ? (
          <AppText variant="body" className="mb-2">
            Original network: {it.channel}
          </AppText>
        ) : null}
        <Pressable
          accessibilityRole="link"
          onPress={() => void Linking.openURL(prov?.link || justWatch)}
          className="mt-1 flex-row items-center gap-1.5 self-start py-1 active:opacity-60"
        >
          <Text className="text-[14px] font-semibold text-accent">More options on JustWatch</Text>
          <ExternalLink size={14} color={colors.accent} strokeWidth={2.4} />
        </Pressable>
      </Section>

      {it.overview ? (
        <Section title="Story">
          <Text className="text-[15.5px] leading-6 text-ink/90">{it.overview}</Text>
        </Section>
      ) : null}

      <Section title="Details">
        <View className="gap-3">
          {facts.map(([k, v]) => (
            <View key={k}>
              <Text className="text-[12.5px] text-muted">{k}</Text>
              <Text className="text-[15px] text-ink">{v}</Text>
            </View>
          ))}
        </View>
      </Section>

      <MoreLikeThis itemKey={it.key} />

      <AppText variant="caption" className="mt-6 text-[11px] leading-4">
        Movie data: Apple iTunes Search. TV data: TVmaze (CC BY-SA). With a key: this product uses
        the TMDB API but is not endorsed or certified by TMDB. Streaming availability by JustWatch.
      </AppText>
    </DragSheet>
  );
}
