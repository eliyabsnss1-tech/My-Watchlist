import { useAtomSet, useAtomValue } from "@effect/atom-react";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import { Image } from "expo-image";
import { AsyncResult } from "effect/reactivity";
import { Check, ExternalLink, Play, Plus, Share2, Star, Trash2 } from "lucide-react-native";
import { Linking, Pressable, Share, Text, View } from "react-native";

import { AppText } from "../../components/ui/AppText";
import { Button } from "../../components/ui/Button";
import { EmptyState } from "../../components/ui/EmptyState";
import { Poster } from "../../components/ui/Poster";
import { Sheet } from "../../components/ui/Sheet";
import { makeSnack, snackAtom } from "../../components/ui/Snackbar";
import { Surface } from "../../components/ui/Surface";
import { haptic } from "../../lib/haptics";
import { fmtDate, fmtRuntime, isFuture, year } from "../../lib/time";
import type { WatchlistParamList } from "../../navigation-types";
import { colors } from "../../theme";
import { REGIONS, type Availability, type CatalogItem } from "./model";
import { addTitleAtom, detailsAtom, knownItemsAtom, listAtom, settingsAtom } from "./state";
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
          className="flex-row items-center gap-1.5 rounded-full bg-surface py-1 pl-1 pr-3"
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
      <Sheet>
        <EmptyState
          icon={Star}
          title="Not found"
          body="This title isn't in your list or the latest search."
        />
      </Sheet>
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
    <Sheet>
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
              <View key={g} className="rounded-full bg-surface-2 px-3 py-1">
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

      {saved ? (
        <Section title="Your rating">
          <View className="flex-row gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <Pressable
                key={n}
                accessibilityRole="button"
                accessibilityLabel={`${n} star${n > 1 ? "s" : ""}`}
                onPress={() => actions.rate(saved, n)}
                className="size-11 items-center justify-center"
              >
                <Star
                  size={30}
                  color={saved.myRating >= n ? colors.star : colors.muted}
                  fill={saved.myRating >= n ? colors.star : "transparent"}
                />
              </Pressable>
            ))}
          </View>
        </Section>
      ) : null}

      {it.overview ? (
        <Section title="Overview">
          <AppText className="leading-6">{it.overview}</AppText>
        </Section>
      ) : null}

      <Section title="Details">
        <Surface tone="card" className="gap-2.5">
          {facts.map(([k, v]) => (
            <View key={k} className="flex-row justify-between gap-4">
              <Text className="text-[14px] text-muted">{k}</Text>
              <Text className="flex-1 text-right text-[14px] text-ink">{v}</Text>
            </View>
          ))}
        </Surface>
      </Section>

      <AppText variant="caption" className="mt-6 text-[11px] leading-4">
        Movie data: Apple iTunes Search. TV data: TVmaze (CC BY-SA). With a key: this product uses
        the TMDB API but is not endorsed or certified by TMDB. Streaming availability by JustWatch.
      </AppText>
    </Sheet>
  );
}
