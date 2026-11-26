import { useAtomValue } from "@effect/atom-react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import {
  CalendarClock,
  Clapperboard,
  Hourglass,
  Heart,
  Timer,
  Tv,
  type LucideIcon,
} from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

import { AppText } from "../../components/ui/AppText";
import { EmptyState } from "../../components/ui/EmptyState";
import { Poster } from "../../components/ui/Poster";
import { DragSheet } from "../../components/ui/DragSheet";
import { Surface } from "../../components/ui/Surface";
import { fmtDuration, fmtRuntime, monthDay, nowMillis, todayIso } from "../../lib/time";
import type { WatchlistParamList } from "../../navigation-types";
import { colors } from "../../theme";
import { computeStats } from "./stats";
import { listAtom } from "./state";
import { posterUri } from "./TitleRow";

function Heading({ icon: Icon, title }: { readonly icon: LucideIcon; readonly title: string }) {
  return (
    <View className="mb-3 mt-6 flex-row items-center gap-2 px-1">
      <Icon size={17} color={colors.accent} strokeWidth={2.4} />
      <AppText variant="overline" className="text-accent">
        {title}
      </AppText>
    </View>
  );
}

function SplitCard({
  icon: Icon,
  label,
  count,
  detail,
}: {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly count: number;
  readonly detail: string;
}) {
  return (
    <Surface className="flex-1 gap-1">
      <View className="mb-1 size-10 items-center justify-center rounded-2xl bg-surface-2">
        <Icon size={20} color={colors.accent} strokeWidth={2.2} />
      </View>
      <Text className="text-[28px] font-bold leading-8 text-ink">{count}</Text>
      <Text className="text-[14px] font-semibold text-ink">{label}</Text>
      <Text className="text-[12.5px] text-muted">{detail}</Text>
    </Surface>
  );
}

export function StatsSheet() {
  const navigation = useNavigation<NativeStackNavigationProp<WatchlistParamList>>();
  const list = useAtomValue(listAtom);
  if (!list.length) {
    return (
      <DragSheet title="Your watchlist in numbers">
        <EmptyState
          icon={Hourglass}
          title="No numbers yet"
          body="Add a movie or show and your stats show up here."
        />
      </DragSheet>
    );
  }
  const s = computeStats(list, todayIso(), nowMillis());
  const pct = s.total ? Math.round((s.watched / s.total) * 100) : 0;
  const maxGenre = s.topGenres[0]?.count ?? 1;
  const open = (key: string) => navigation.navigate("Details", { key });

  return (
    <DragSheet title="Your watchlist in numbers">
      <LinearGradient
        colors={["#4d8bff", "#1a3a9c"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 28, padding: 20 }}
      >
        <Text className="text-[13px] font-semibold uppercase tracking-[0.8px] text-white/75">
          Time left to watch
        </Text>
        <Text className="mt-1 text-[44px] font-bold leading-[50px] text-white">
          {fmtRuntime(s.left.minutes) || "0m"}
        </Text>
        {s.left.minutes >= 1440 ? (
          <Text className="text-[15px] text-white/85">
            That's about {fmtDuration(s.left.minutes)} of non-stop watching
          </Text>
        ) : null}
        <View className="mt-4 flex-row flex-wrap gap-2">
          {[
            `${s.left.movies} movie${s.left.movies === 1 ? "" : "s"}`,
            `${s.left.shows} show${s.left.shows === 1 ? "" : "s"}`,
            `${s.left.episodes} episodes`,
          ].map((t) => (
            <View key={t} className="rounded-full bg-white/20 px-3 py-1.5">
              <Text className="text-[13px] font-semibold text-white">{t}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>

      <Surface className="mt-3">
        <View className="flex-row items-end justify-between">
          <View>
            <Text className="text-[14px] text-muted">Watched</Text>
            <Text className="text-[22px] font-bold text-ink">
              {s.watched} <Text className="text-[15px] font-normal text-muted">of {s.total}</Text>
            </Text>
          </View>
          <Text className="text-[28px] font-bold text-ok">{pct}%</Text>
        </View>
        <View className="mt-3 h-3 overflow-hidden rounded-full bg-surface-3">
          <View
            style={{ width: `${pct}%`, backgroundColor: colors.ok }}
            className="h-full rounded-full"
          />
        </View>
        <Text className="mt-2.5 text-[13px] text-muted">
          {fmtDuration(s.watchedMinutes)} watched so far
          {s.watchedLast30Days ? ` · ${s.watchedLast30Days} in the last 30 days` : ""}
        </Text>
      </Surface>

      <View className="mt-3 flex-row gap-3">
        <SplitCard
          icon={Clapperboard}
          label="Movies left"
          count={s.left.movies}
          detail={fmtDuration(s.left.movieMinutes)}
        />
        <SplitCard
          icon={Tv}
          label="Shows left"
          count={s.left.shows}
          detail={`${s.left.episodes} eps · ${fmtDuration(s.left.showMinutes)}`}
        />
      </View>

      {s.quickPicks.length ? (
        <>
          <Heading icon={Timer} title="Short on time? Quickest picks" />
          <View className="gap-2">
            {s.quickPicks.map((item) => (
              <Pressable
                key={item.key}
                onPress={() => open(item.key)}
                className="flex-row items-center gap-3 rounded-3xl bg-surface p-2.5 active:opacity-90"
              >
                <Poster uri={posterUri(item)} title={item.title} size="sm" />
                <Text numberOfLines={1} className="flex-1 text-[15px] font-semibold text-ink">
                  {item.title}
                </Text>
                <View className="rounded-full bg-primary px-3 py-1.5">
                  <Text className="text-[13px] font-bold text-white">
                    {fmtRuntime(item.runtime)}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </>
      ) : null}

      {s.comingUp.length ? (
        <>
          <Heading icon={CalendarClock} title="Coming up" />
          <Surface className="gap-3">
            {s.comingUp.map(({ item, date, label }) => (
              <Pressable
                key={item.key}
                onPress={() => open(item.key)}
                className="flex-row items-center gap-3"
              >
                <View className="w-14 items-center rounded-2xl bg-surface-2 py-1.5">
                  <Text className="text-[11px] font-semibold uppercase text-accent">
                    {monthDay(date).month}
                  </Text>
                  <Text className="text-[18px] font-bold text-ink">{monthDay(date).day}</Text>
                </View>
                <View className="flex-1">
                  <Text numberOfLines={1} className="text-[15px] font-semibold text-ink">
                    {item.title}
                  </Text>
                  <Text className="text-[12.5px] text-muted">{label}</Text>
                </View>
              </Pressable>
            ))}
          </Surface>
        </>
      ) : null}

      {s.topGenres.length ? (
        <>
          <Heading icon={Heart} title="What you're into" />
          <Surface className="gap-3">
            {s.topGenres.map((g) => (
              <View key={g.name}>
                <View className="mb-1.5 flex-row justify-between">
                  <Text className="text-[14px] text-ink">{g.name}</Text>
                  <Text className="text-[13px] text-muted">{g.count}</Text>
                </View>
                <View className="h-2 overflow-hidden rounded-full bg-surface-3">
                  <View
                    style={{ width: `${(g.count / maxGenre) * 100}%` }}
                    className="h-full rounded-full bg-primary"
                  />
                </View>
              </View>
            ))}
          </Surface>
        </>
      ) : null}

      {s.missingInfo ? (
        <AppText variant="caption" className="mt-5 px-1">
          {s.missingInfo} title{s.missingInfo > 1 ? "s are" : " is"} missing runtime or episode
          info, so times may be a little low. Show time = episodes × episode length.
        </AppText>
      ) : null}
    </DragSheet>
  );
}
