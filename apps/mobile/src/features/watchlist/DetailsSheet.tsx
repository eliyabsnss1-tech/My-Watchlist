import { useAtomSet, useAtomValue } from "@effect/atom-react";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { AsyncResult } from "effect/reactivity";
import { Check, ExternalLink, Play, Plus, Share2, Star, Trash2 } from "lucide-react-native";
import { Linking, Pressable, ScrollView, Share, Text, View } from "react-native";

import { AppText } from "../../components/ui/AppText";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { Poster } from "../../components/ui/Poster";
import { DragSheet } from "../../components/ui/DragSheet";
import { makeSnack, snackAtom } from "../../components/ui/Snackbar";
import { haptic } from "../../lib/haptics";
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
    <View className="mt-6">
      <AppText variant="overline" className="mb-2.5">
        {title}
      </AppText>
      {children}
    </View>
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
    <View className="mb-2 flex-row flex-wrap items-center gap-2">
      <Text className="w-14 text-[13px] text-muted">{label}</Text>
      {entries.map(([name, logo]) => (
        <View
          key={name}
          className="flex-row items-center gap-1.5 rounded-full bg-black/30 py-1 pl-1 pr-3"
        >
          {logo ? (
            <Image
              source={{ uri: `${TMDB_IMG}w92${logo}` }}
              style={{ width: 26, height: 26, borderRadius: 13 }}
            />
          ) : null}
          <Text className="text-[13px] text-ink">{name}</Text>
        </View>
      ))}
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
        blurRadius={22}
        contentFit="cover"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <LinearGradient
        colors={["rgba(2,5,13,0.05)", "rgba(2,5,13,0.5)", "rgba(2,5,13,0.72)"]}
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
      <View className="flex-row gap-4">
        <Poster uri={posterUri(it, true)} title={it.title} size="lg" />
        <View className="flex-1 pt-1">
          <AppText variant="heading" className="text-[22px] leading-7">
            {it.title}
          </AppText>
          <AppText variant="caption" className="mt-1">
            {[
              year(it.date) || "TBA",
              it.type === "movie" ? "Movie" : "TV show",
              it.type === "movie"
                ? fmtRuntime(it.runtime)
                : it.seasons
                  ? `${it.seasons} season${it.seasons > 1 ? "s" : ""}`
                  : "",
            ]
              .filter(Boolean)
              .join(" · ")}
          </AppText>
          {it.tagline ? (
            <Text className="mt-2 text-[14px] italic text-muted">{it.tagline}</Text>
          ) : null}
          <View className="mt-2.5 flex-row flex-wrap gap-1.5">
            {it.genres.map((g) => (
              <View key={g} className="rounded-full bg-black/30 px-3 py-1">
                <Text className="text-[12px] text-muted">{g}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="mt-5 gap-2.5">
        {saved ? (
          <Button
            tone="primary"
            size="lg"
            icon={Check}
            label={saved.watched ? "Watched · tap to undo" : "Mark as watched"}
            onPress={() => actions.toggleWatched(saved, false)}
          />
        ) : (
          <Button
            tone="primary"
            size="lg"
            icon={Plus}
            label="Add to watchlist"
            onPress={() => {
              add(it);
              haptic("success");
              setSnack(
                makeSnack({ kind: "info", title: it.title, message: "Added to your watchlist" }),
              );
            }}
          />
        )}
        <View className="flex-row gap-2.5">
          {trailer ? (
            <Button
              className="flex-1"
              icon={Play}
              label="Trailer"
              onPress={() => void Linking.openURL(trailer)}
            />
          ) : null}
          <Button
            className="flex-1"
            icon={Share2}
            label="Share"
            onPress={() =>
              void Share.share({
                message: `${it.title}${it.date ? ` (${year(it.date)})` : ""} ${shareUrl}`,
              })
            }
          />
          {saved ? (
            <Button
              className="flex-1"
              tone="danger"
              icon={Trash2}
              label="Delete"
              onPress={() => {
                navigation.goBack();
                actions.remove(saved);
              }}
            />
          ) : null}
        </View>
      </View>

      <Section
        title={
          prov
            ? `Where to watch · ${REGIONS[settings.region] ?? settings.region}`
            : "Where to watch"
        }
      >
        {prov ? (
          prov.stream.length || prov.free.length || prov.rent.length || prov.buy.length ? (
            <>
              <ProviderGroup label="Stream" entries={prov.stream} />
              <ProviderGroup label="Free" entries={prov.free} />
              <ProviderGroup label="Rent" entries={prov.rent} />
              <ProviderGroup label="Buy" entries={prov.buy} />
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
        <Button
          className="mt-1"
          icon={ExternalLink}
          label="Check JustWatch"
          onPress={() => void Linking.openURL(prov?.link || justWatch)}
        />
      </Section>

      {it.overview ? (
        <Section title="Overview">
          <AppText className="leading-6">{it.overview}</AppText>
        </Section>
      ) : null}

      <Section title="Details">
        <View className="gap-2.5 rounded-3xl bg-black/30 p-4">
          {facts.map(([k, v]) => (
            <View key={k} className="flex-row justify-between gap-4">
              <Text className="text-[14px] text-muted">{k}</Text>
              <Text className="flex-1 text-right text-[14px] text-ink">{v}</Text>
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
