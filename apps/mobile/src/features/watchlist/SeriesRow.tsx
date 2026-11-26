import { ChevronDown, Layers } from "lucide-react-native";
import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { Poster } from "../../components/ui/Poster";
import { cn } from "../../lib/cn";
import { fmtRuntime, year } from "../../lib/time";
import { colors } from "../../theme";
import type { SavedTitle } from "./model";
import { PosterTint, posterUri } from "./TitleRow";

export interface SeriesRowProps {
  readonly name: string;
  readonly items: ReadonlyArray<SavedTitle>;
  readonly open: boolean;
  readonly onToggle: () => void;
  /** The series' own rows, shown under it while open. */
  readonly children: ReactNode;
}

const FAN = 9;

/** One row for several movies of the same series; tap to show or hide them. */
export function SeriesRow({ name, items, open, onToggle, children }: SeriesRowProps) {
  const years = [...new Set(items.map((x) => year(x.date)).filter(Boolean))];
  const minutes = items.reduce((s, x) => s + x.runtime, 0);
  const line1 = [
    `${items.length} movies`,
    years.length > 1 ? `${years[0]}–${years.at(-1)}` : years[0],
    fmtRuntime(minutes),
  ]
    .filter(Boolean)
    .join(" · ");
  const dim = items.every((x) => x.watched) ? "opacity-60" : "";
  // Up to three posters fanned out, first movie in front.
  const fan = items.slice(0, 3).reverse();

  return (
    <View className="mb-4">
      {/* Two cards peeking out underneath: reads as a stack, not a single title. */}
      <View
        className="rounded-3xl bg-surface-3"
        style={{ position: "absolute", left: 28, right: 28, top: 10, height: 98, opacity: 0.4 }}
      />
      <View
        className="rounded-3xl bg-surface-3"
        style={{ position: "absolute", left: 20, right: 20, top: 5, height: 98, opacity: 0.7 }}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={`${name} series, ${line1}`}
        onPress={onToggle}
        className="mx-3 h-[98px] flex-row items-center gap-3 overflow-hidden rounded-3xl border border-primary/40 bg-surface-2 pl-2.5 pr-2.5 active:opacity-90"
      >
        <PosterTint uri={posterUri(items[0]!)} />
        <View style={{ width: 54 + 2 * FAN, height: 81 }}>
          {fan.map((x, i) => (
            <View
              key={x.key}
              style={{
                position: "absolute",
                left: (fan.length - 1 - i) * FAN,
                top: 0,
                transform: [{ rotate: `${(fan.length - 1 - i) * 5}deg` }],
                opacity: i === fan.length - 1 ? 1 : 0.75,
              }}
            >
              <Poster uri={posterUri(x)} title={x.title} />
            </View>
          ))}
        </View>
        <View className="flex-1 justify-center">
          <View className="mb-0.5 flex-row items-center gap-1.5">
            <View className="flex-row items-center gap-1 rounded-full bg-primary px-2 py-0.5">
              <Layers size={11} color={colors.onPrimary} strokeWidth={2.6} />
              <Text className="text-[10.5px] font-bold tracking-wide text-on-primary">
                SERIES · {items.length}
              </Text>
            </View>
          </View>
          <Text
            numberOfLines={1}
            className={cn("text-[16px] font-semibold leading-5 text-ink", dim)}
          >
            {name}
          </Text>
          <Text
            numberOfLines={1}
            className={cn("mt-0.5 text-[12.5px] leading-[17px] text-muted", dim)}
          >
            {line1}
          </Text>
          <Text numberOfLines={1} className={cn("text-[12.5px] leading-[17px] text-muted", dim)}>
            {items.map((x) => x.title).join(" · ")}
          </Text>
        </View>
        <View
          className="size-10 items-center justify-center rounded-full bg-surface-3"
          style={{ transform: [{ rotate: open ? "180deg" : "0deg" }] }}
        >
          <ChevronDown size={20} color={colors.ink} strokeWidth={2.4} />
        </View>
      </Pressable>
      {open ? (
        <Animated.View
          entering={FadeIn.duration(220)}
          className="ml-4 mt-2 border-l-2 border-surface-2"
        >
          {children}
        </Animated.View>
      ) : null}
    </View>
  );
}
