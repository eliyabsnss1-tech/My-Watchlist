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
import { useRef, useState, type RefObject } from "react";
import { Pressable, Text, View, type HostInstance } from "react-native";
import Animated, { Easing, SlideInLeft, SlideInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppBar } from "../../components/ui/AppBar";
import { EmptyState } from "../../components/ui/EmptyState";
import { FlyingBadge, type Flight } from "../../components/ui/FlyingBadge";
import { IconButton } from "../../components/ui/IconButton";
import { Screen } from "../../components/ui/Screen";
import { Segmented } from "../../components/ui/Segmented";
import { SwipeRow, swipedRecently, type SwipeAction } from "../../components/ui/SwipeRow";
import type { WatchlistParamList } from "../../navigation-types";
import { colors, motion } from "../../theme";
import * as List from "./list";
import type { SavedTitle } from "./model";
import { SeriesRow } from "./SeriesRow";
import { listAtom, refreshStaleAtom, segmentAtom, settingsAtom } from "./state";
import { posterUri, TitleRow } from "./TitleRow";
import { useWatchlistActions } from "./useWatchlistActions";

const DELETE: SwipeAction = { label: "Delete", icon: Trash2, color: colors.danger };
const WATCHED: SwipeAction = { label: "Watched", icon: Check, color: colors.ok };
const UNWATCH: SwipeAction = { label: "Not watched", icon: RotateCcw, color: colors.accent };

type Point = { readonly x: number; readonly y: number };
type Rect = Point & { readonly w: number; readonly h: number };

const measure = (ref: RefObject<HostInstance | null>) =>
  new Promise<Rect | undefined>((resolve) => {
    if (!ref.current) return resolve(undefined);
    ref.current.measureInWindow((x, y, w, h) => resolve({ x, y, w, h }));
  });

let nextFlight = 1;

// Rows sit inside the native swipe gesture. When a touch turns into a list scroll, the row's
// press handler isn't told, so lifting the finger would count as a tap. Ignore taps that happen
// while the list is moving or right after it stopped.
let scrolling = false;
let scrollStoppedAt = 0;
const scrollStarted = () => {
  scrolling = true;
};
const scrollStopped = () => {
  scrolling = false;
  scrollStoppedAt = performance.now();
};
const tapIsReal = () =>
  !scrolling && performance.now() - scrollStoppedAt > 200 && !swipedRecently();

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
  const groups = List.groupSeries(items);
  const [openSeries, setOpenSeries] = useState<ReadonlySet<string>>(new Set());
  const toggleSeries = (id: string) =>
    setOpenSeries((s) => {
      const next = new Set(s);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  // To watch: right = watched, left = delete. Watched: right = delete, left = back to To watch.
  const right = segment === "todo" ? WATCHED : DELETE;
  const left = segment === "todo" ? DELETE : UNWATCH;

  // Show where a swiped title went: a badge flies to the tab or to Recently deleted.
  const layer = useRef<HostInstance>(null);
  const tabs = useRef<HostInstance>(null);
  const history = useRef<HostInstance>(null);
  const [flights, setFlights] = useState<ReadonlyArray<Flight>>([]);
  const fly = async (
    from: Rect,
    to: "todo" | "done" | "deleted",
    action: SwipeAction,
    item: SavedTitle,
  ) => {
    const [origin, box] = await Promise.all([
      measure(layer),
      measure(to === "deleted" ? history : tabs),
    ]);
    if (!origin || !box) return;
    // The tab bar has 4px padding around two equal halves; the history button is a circle.
    const half = (box.w - 8) / 2;
    const target =
      to === "deleted"
        ? { x: box.x, y: box.y, w: box.w, h: box.h, radius: box.w / 2 }
        : {
            x: box.x + 4 + (to === "done" ? half : 0),
            y: box.y + 4,
            w: half,
            h: box.h - 8,
            radius: (box.h - 8) / 2,
          };
    const flight: Flight = {
      id: nextFlight++,
      from: { ...from, x: from.x - origin.x, y: from.y - origin.y },
      target: { ...target, x: target.x - origin.x, y: target.y - origin.y },
      icon: action.icon,
      color: action.color,
      poster: posterUri(item),
      title: item.title,
    };
    setFlights((f) => [...f, flight]);
  };

  const row = (item: SavedTitle) => (
    <SwipeRow
      key={item.key}
      right={right}
      left={left}
      onLaunch={(dir, from) => {
        const isDelete = item.watched ? dir === "right" : dir === "left";
        void fly(
          from,
          isDelete ? "deleted" : item.watched ? "todo" : "done",
          dir === "right" ? right : left,
          item,
        );
      }}
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
          if (tapIsReal()) navigation.navigate("Details", { key: item.key });
        }}
      />
    </SwipeRow>
  );

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
            <View ref={history}>
              <IconButton
                icon={History}
                label="Recently deleted"
                size="sm"
                onPress={() => navigation.navigate("Deleted")}
              />
            </View>
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
        <View ref={tabs} className="mx-4 mb-2 mt-1">
          <Segmented
            value={segment}
            onChange={setSegment}
            options={[
              { value: "todo", label: `To watch · ${todo}` },
              { value: "done", label: `Watched · ${list.length - todo}` },
            ]}
          />
        </View>
      ) : null}
      {/* The list slides in from the side of the tab you moved to. */}
      <Animated.View
        key={segment}
        style={{ flex: 1 }}
        entering={(segment === "done" ? SlideInRight : SlideInLeft)
          .duration(320)
          .easing(Easing.bezierFn(...motion.emphasizedDecelerate))}
      >
        <LegendList
          onScrollBeginDrag={scrollStarted}
          onScrollEndDrag={scrollStopped}
          onMomentumScrollBegin={scrollStarted}
          onMomentumScrollEnd={scrollStopped}
          data={groups}
          keyExtractor={(g) => (g.length > 1 ? `series:${List.seriesName(g)}` : g[0]!.key)}
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
          renderItem={({ item: g }) => {
            if (g.length === 1) return row(g[0]!);
            const name = List.seriesName(g);
            return (
              <SeriesRow
                name={name}
                items={g}
                open={openSeries.has(name)}
                onToggle={() => {
                  if (tapIsReal()) toggleSeries(name);
                }}
              >
                {g.map(row)}
              </SeriesRow>
            );
          }}
        />
      </Animated.View>
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
      <View
        ref={layer}
        pointerEvents="none"
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      >
        {flights.map((f) => (
          <FlyingBadge
            key={f.id}
            flight={f}
            onDone={() => setFlights((all) => all.filter((x) => x.id !== f.id))}
          />
        ))}
      </View>
    </Screen>
  );
}
