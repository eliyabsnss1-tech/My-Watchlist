import { useAtom, useAtomMount, useAtomValue } from "@effect/atom-react";
import { LegendList } from "@legendapp/list/react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  BarChart3,
  Bookmark,
  Check,
  ChevronRight,
  History,
  KeyRound,
  Plus,
  RotateCcw,
  Settings2,
  Trash2,
  Tv,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppBar } from "../../components/ui/AppBar";
import { EmptyState } from "../../components/ui/EmptyState";
import { IconButton } from "../../components/ui/IconButton";
import { Screen } from "../../components/ui/Screen";
import { Segmented } from "../../components/ui/Segmented";
import { SwipeRow, swipedRecently, type SwipeAction } from "../../components/ui/SwipeRow";
import { fmtRuntime } from "../../lib/time";
import type { WatchlistParamList } from "../../navigation-types";
import { colors } from "../../theme";
import * as List from "./list";
import { listAtom, refreshStaleAtom, segmentAtom, settingsAtom } from "./state";
import { TitleRow } from "./TitleRow";
import { useWatchlistActions } from "./useWatchlistActions";

const DELETE: SwipeAction = { label: "Delete", icon: Trash2, color: colors.danger };
const WATCHED: SwipeAction = { label: "Watched", icon: Check, color: colors.ok };
const UNWATCH: SwipeAction = { label: "Not watched", icon: RotateCcw, color: colors.accent };

export function WatchlistScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<WatchlistParamList>>();
  const list = useAtomValue(listAtom);
  const settings = useAtomValue(settingsAtom);
  const [segment, setSegment] = useAtom(segmentAtom);
  const actions = useWatchlistActions();
  const insets = useSafeAreaInsets();
  useAtomMount(refreshStaleAtom);

  const todo = list.filter((x) => !x.watched).length;
  const items = List.visible(list, segment, settings.sort);
  const minutes = items
    .filter((x) => x.type === "movie" && !x.watched)
    .reduce((s, x) => s + x.runtime, 0);
  // To watch: right = watched, left = delete. Watched: right = delete, left = back to To watch.
  const right = segment === "todo" ? WATCHED : DELETE;
  const left = segment === "todo" ? DELETE : UNWATCH;

  return (
    <Screen>
      <AppBar
        title="Watchlist"
        actions={
          <>
            <IconButton
              icon={BarChart3}
              label="Stats"
              size="sm"
              onPress={() => navigation.navigate("Stats")}
            />
            <IconButton
              icon={History}
              label="Recently deleted"
              size="sm"
              onPress={() => navigation.navigate("Deleted")}
            />
            <IconButton
              icon={Settings2}
              label="Settings"
              size="sm"
              onPress={() => navigation.navigate("Settings")}
            />
          </>
        }
      />
      {list.length ? (
        <Segmented
          className="mx-4 mb-2 mt-1"
          value={segment}
          onChange={setSegment}
          options={[
            { value: "todo", label: `To watch · ${todo}` },
            { value: "done", label: `Watched · ${list.length - todo}` },
          ]}
        />
      ) : null}
      <LegendList
        data={items}
        keyExtractor={(item) => item.key}
        estimatedItemSize={106}
        contentContainerStyle={{ paddingTop: 4, paddingBottom: insets.bottom + 110 }}
        ListHeaderComponent={
          <View>
            {!settings.tmdbKey ? (
              <Pressable
                onPress={() => navigation.navigate("Settings")}
                className="mx-3 mb-2 flex-row items-center gap-3 rounded-3xl bg-surface-2 px-4 py-3 active:opacity-80"
              >
                <KeyRound size={20} color={colors.accent} />
                <Text className="flex-1 text-[14px] leading-5 text-ink">
                  Add a free TMDB key to see where each title streams in your country.
                </Text>
                <ChevronRight size={18} color={colors.muted} />
              </Pressable>
            ) : null}
            {minutes ? (
              <Pressable
                onPress={() => navigation.navigate("Stats")}
                className="mx-4 mb-2 flex-row items-center gap-1"
              >
                <Text className="text-[14px] text-muted">
                  {fmtRuntime(minutes)} of movies to watch
                </Text>
                <ChevronRight size={15} color={colors.muted} />
              </Pressable>
            ) : null}
          </View>
        }
        ListEmptyComponent={
          list.length ? (
            segment === "todo" ? (
              <EmptyState
                icon={Tv}
                title="Everything is watched"
                body="Nice. Add something new with the + button."
              />
            ) : (
              <EmptyState
                icon={Tv}
                title="Nothing watched yet"
                body="Swipe a title right in To watch to mark it watched."
              />
            )
          ) : (
            <EmptyState
              icon={Bookmark}
              title="Your watchlist is empty"
              body="Tap the + button to add a movie or show."
            />
          )
        }
        renderItem={({ item }) => (
          <SwipeRow
            right={right}
            left={left}
            onSwipe={(dir) => {
              const isDelete = item.watched ? dir === "right" : dir === "left";
              if (isDelete) actions.remove(item);
              else actions.toggleWatched(item, true);
            }}
          >
            <TitleRow
              item={item}
              settings={settings}
              onOpen={() => {
                if (!swipedRecently()) navigation.navigate("Details", { key: item.key });
              }}
              onToggle={() => {
                if (!swipedRecently()) actions.toggleWatched(item, true);
              }}
            />
          </SwipeRow>
        )}
      />
      <View
        style={{ position: "absolute", left: 20, bottom: insets.bottom + 20 }}
        className="rounded-full shadow-lg"
      >
        <IconButton
          icon={Plus}
          label="Add a movie or show"
          tone="primary"
          size="lg"
          onPress={() => navigation.navigate("Search")}
        />
      </View>
    </Screen>
  );
}
