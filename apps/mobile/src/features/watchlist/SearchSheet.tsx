import { useAtom, useAtomSet, useAtomValue } from "@effect/atom-react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AsyncResult } from "effect/reactivity";
import { Check, Film, Plus, Search, X } from "lucide-react-native";
import { useRef } from "react";
import { Pressable, ScrollView, Text, View, type ScrollViewInstance } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "../../components/ui/AppText";
import { EmptyState } from "../../components/ui/EmptyState";
import { IconButton } from "../../components/ui/IconButton";
import { Poster } from "../../components/ui/Poster";
import { Sheet } from "../../components/ui/Sheet";
import { makeSnack, snackAtom } from "../../components/ui/Snackbar";
import { TextField } from "../../components/ui/TextField";
import { haptic } from "../../lib/haptics";
import { isFuture, year } from "../../lib/time";
import type { WatchlistParamList } from "../../navigation-types";
import { colors } from "../../theme";
import type { CatalogItem } from "./model";
import {
  addTitleAtom,
  listAtom,
  queryAtom,
  searchAtom,
  settingsAtom,
  suggestionsAtom,
} from "./state";
import { posterUri } from "./TitleRow";

function ResultRow({
  item,
  saved,
  onOpen,
  onAdd,
}: {
  readonly item: CatalogItem;
  readonly saved: boolean;
  readonly onOpen: () => void;
  readonly onAdd: () => void;
}) {
  const meta = [
    year(item.date) || "TBA",
    item.type === "movie" ? "Movie" : "Show",
    item.rating ? `★ ${item.rating.toFixed(1)}` : "",
  ]
    .filter(Boolean)
    .join(" · ");
  return (
    <Pressable
      onPress={onOpen}
      className="mb-2 h-[98px] flex-row items-center gap-3 rounded-3xl bg-surface px-2.5 active:opacity-90"
    >
      <Poster uri={posterUri(item)} title={item.title} />
      <View className="flex-1">
        <Text numberOfLines={1} className="text-[16px] font-semibold text-ink">
          {item.title}
        </Text>
        <Text numberOfLines={1} className="mt-0.5 text-[13px] text-muted">
          {meta}
          {isFuture(item.date) ? "  ·  Upcoming" : ""}
        </Text>
        <Text numberOfLines={2} className="mt-0.5 text-[12.5px] leading-[17px] text-muted">
          {item.overview}
        </Text>
      </View>
      {saved ? (
        <View
          accessibilityLabel="In your list"
          className="size-10 items-center justify-center rounded-full bg-surface-2"
        >
          <Check size={20} color={colors.ok} strokeWidth={2.4} />
        </View>
      ) : (
        <IconButton
          icon={Plus}
          label={`Add ${item.title}`}
          tone="primary"
          size="sm"
          onPress={onAdd}
        />
      )}
    </Pressable>
  );
}

export function SearchSheet() {
  const navigation = useNavigation<NativeStackNavigationProp<WatchlistParamList>>();
  const [query, setQuery] = useAtom(queryAtom);
  const result = useAtomValue(searchAtom);
  const suggested = useAtomValue(suggestionsAtom);
  const suggestions = !query.trim() && AsyncResult.isSuccess(suggested) ? suggested.value : [];
  const list = useAtomValue(listAtom);
  const settings = useAtomValue(settingsAtom);
  const add = useAtomSet(addTitleAtom);
  const setSnack = useAtomSet(snackAtom);
  const insets = useSafeAreaInsets();
  const savedKeys = new Set(list.map((x) => x.key));
  const scroll = useRef<ScrollViewInstance>(null);
  const search = (text: string) => {
    setQuery(text);
    scroll.current?.scrollTo({ y: 0, animated: false });
  };

  const onAdd = (item: CatalogItem) => {
    add(item);
    haptic("success");
    setSnack(makeSnack({ kind: "info", title: item.title, message: "Added to your watchlist" }));
  };

  const heading = query.trim() ? "Results" : settings.tmdbKey ? "Trending this week" : "";
  const problem = AsyncResult.matchWithError(result, {
    onInitial: () => "",
    onError: (error) =>
      error._tag === "TmdbKeyRejectedError"
        ? "TMDB rejected your key. Check it in Settings."
        : "Couldn't reach the search service. Check your connection; your watchlist still works offline.",
    onDefect: () => "Something went wrong while searching. Try again in a moment.",
    onSuccess: () => "",
  });
  const found = AsyncResult.isSuccess(result) ? result.value : undefined;

  return (
    <Sheet
      scroll={false}
      title="Add to watchlist"
      header={
        <TextField
          className="mt-4"
          icon={Search}
          value={query}
          onChangeText={search}
          placeholder="Search movies & shows"
          autoFocus
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="search"
        />
      }
    >
      <ScrollView
        ref={scroll}
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 14,
          paddingBottom: insets.bottom + 24,
        }}
      >
        {query ? (
          <Pressable
            onPress={() => search("")}
            className="mb-2 flex-row items-center gap-1 self-end px-1"
          >
            <X size={14} color={colors.muted} />
            <Text className="text-[13px] text-muted">Clear</Text>
          </Pressable>
        ) : null}
        {suggestions.length ? (
          <View className="mb-4">
            <AppText variant="overline" className="mb-2 px-1">
              Suggested for you
            </AppText>
            {suggestions.slice(0, 10).map((item) => (
              <ResultRow
                key={item.key}
                item={item}
                saved={savedKeys.has(item.key)}
                onOpen={() => navigation.navigate("Details", { key: item.key })}
                onAdd={() => onAdd(item)}
              />
            ))}
          </View>
        ) : null}
        {heading ? (
          <AppText variant="overline" className="mb-2 px-1">
            {heading}
          </AppText>
        ) : null}
        {AsyncResult.isWaiting(result) && !AsyncResult.isInitial(result) ? (
          <AppText variant="caption" className="mb-2 px-1">
            Updating…
          </AppText>
        ) : null}
        {AsyncResult.isInitial(result) ? <AppText variant="caption">Searching…</AppText> : null}
        {problem ? (
          <View className="rounded-3xl bg-surface p-4">
            <Text className="text-[14px] leading-5 text-danger">{problem}</Text>
          </View>
        ) : null}
        {found?.note ? (
          <AppText variant="caption" className="mb-2">
            {found.note}
          </AppText>
        ) : null}
        {found?.items.map((item) => (
          <ResultRow
            key={item.key}
            item={item}
            saved={savedKeys.has(item.key)}
            onOpen={() => navigation.navigate("Details", { key: item.key })}
            onAdd={() => onAdd(item)}
          />
        ))}
        {found && !found.items.length ? (
          <EmptyState
            icon={Film}
            title={query.trim() ? "Nothing found" : "Find a movie or show"}
            body={query.trim() ? "Try another spelling." : "Type a name to search."}
          />
        ) : null}
      </ScrollView>
    </Sheet>
  );
}
