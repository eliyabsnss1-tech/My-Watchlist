import { Check, ChevronDown } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import { cn } from "../../lib/cn";
import { colors } from "../../theme";

export interface DropdownProps<T extends string> {
  readonly options: Readonly<Record<T, string>>;
  readonly value: T;
  readonly onChange: (value: T) => void;
  readonly label: string;
}

/** A field showing the current choice; tap it to open the list of choices right below. */
export function Dropdown<T extends string>({ options, value, onChange, label }: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${options[value]}`}
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((o) => !o)}
        className={cn(
          "h-12 flex-row items-center justify-between rounded-2xl bg-surface-2 px-4 active:opacity-80",
          open && "rounded-b-none",
        )}
      >
        <Text className="text-[15px] font-semibold text-ink">{options[value]}</Text>
        <View style={{ transform: [{ rotate: open ? "180deg" : "0deg" }] }}>
          <ChevronDown size={20} color={colors.muted} strokeWidth={2.4} />
        </View>
      </Pressable>
      {open ? (
        <Animated.View
          entering={FadeIn.duration(150)}
          exiting={FadeOut.duration(100)}
          className="overflow-hidden rounded-b-2xl border-t border-line bg-surface-2"
        >
          {(Object.keys(options) as Array<T>).map((k) => {
            const on = k === value;
            return (
              <Pressable
                key={k}
                accessibilityRole="radio"
                accessibilityState={{ selected: on }}
                onPress={() => {
                  onChange(k);
                  setOpen(false);
                }}
                className="h-11 flex-row items-center justify-between px-4 active:bg-surface-3"
              >
                <Text className={cn("text-[15px]", on ? "font-semibold text-accent" : "text-ink")}>
                  {options[k]}
                </Text>
                {on ? <Check size={18} color={colors.accent} strokeWidth={2.6} /> : null}
              </Pressable>
            );
          })}
        </Animated.View>
      ) : null}
    </View>
  );
}
