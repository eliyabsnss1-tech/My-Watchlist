import { ChevronDown } from "lucide-react-native";
import type { ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { Poster } from "../../components/ui/Poster";
import { cn } from "../../lib/cn";
import { fmtRuntime, year } from "../../lib/time";
import { colors } from "../../theme";
import type { SavedTitle } from "./model";
import { posterUri } from "./TitleRow";

export interface SeriesRowProps {
  readonly name: string;
  readonly items: ReadonlyArray<SavedTitle>;
  readonly open: boolean;
  readonly onToggle: () => void;
  /** The series' own rows, shown under it while open. */
  readonly children: ReactNode;
}

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

  return (
    <View className="mb-2">
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={`${name}, ${line1}`}
        onPress={onToggle}
        className="mx-3 h-[98px] flex-row items-center gap-3 rounded-3xl bg-surface px-2.5 active:opacity-90"
      >
        <View>
          <View className="absolute left-2 top-[-4px] opacity-50">
            <Poster uri={posterUri(items[1] ?? items[0]!)} title={name} />
          </View>
          <View style={{ marginLeft: -2 }}>
            <Poster uri={posterUri(items[0]!)} title={name} />
          </View>
          <View className="absolute bottom-1 left-1 h-[22px] min-w-[22px] items-center justify-center rounded-full bg-primary px-1.5">
            <Text className="text-[12px] font-bold text-on-primary">{items.length}</Text>
          </View>
        </View>
        <View className="flex-1 justify-center">
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
          <Text numberOfLines={1} className="mt-1 text-[12.5px] text-ink/70">
            {open ? "Tap to close" : `Tap to see all ${items.length}`}
          </Text>
        </View>
        <View
          className="size-10 items-center justify-center rounded-full bg-surface-2"
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
