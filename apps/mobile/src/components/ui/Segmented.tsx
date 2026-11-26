import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, withTiming } from "react-native-reanimated";

import { cn } from "../../lib/cn";
import { motion } from "../../theme";

export interface SegmentedOption<T extends string> {
  readonly value: T;
  readonly label: string;
}

export interface SegmentedProps<T extends string> {
  readonly options: ReadonlyArray<SegmentedOption<T>>;
  readonly value: T;
  readonly onChange: (value: T) => void;
  /** Layout only. */
  readonly className?: string;
}

const SLIDE = { duration: 320, easing: Easing.bezier(...motion.emphasizedDecelerate) };
const PAD = 4;

/** Tabs in a pill; the highlight slides to the chosen one. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className,
}: SegmentedProps<T>) {
  const [width, setWidth] = useState(0);
  const index = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  const tab = width ? (width - PAD * 2) / options.length : 0;
  const highlight = useAnimatedStyle(() => ({
    width: tab,
    transform: [{ translateX: withTiming(index * tab, SLIDE) }],
  }));

  return (
    <View
      className={cn("flex-row rounded-full bg-surface p-1", className)}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
    >
      {tab ? (
        <Animated.View
          pointerEvents="none"
          className="absolute bottom-1 left-1 top-1 rounded-full bg-primary"
          style={highlight}
        />
      ) : null}
      {options.map((o) => {
        const on = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            onPress={() => onChange(o.value)}
            className={cn(
              "h-10 flex-1 items-center justify-center rounded-full",
              on && !tab && "bg-primary",
            )}
          >
            <Text
              className={cn("text-[14px] font-semibold", on ? "text-on-primary" : "text-muted")}
            >
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
