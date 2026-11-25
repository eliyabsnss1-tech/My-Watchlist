import type { ReactNode } from "react";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { AppText } from "../../components/ui/AppText";
import { cn } from "../../lib/cn";

export interface SectionProps {
  readonly title: string;
  /** Shown at the right of the title, e.g. a toggle. */
  readonly right?: ReactNode;
  readonly children: ReactNode;
}

export function Section({ title, right, children }: SectionProps) {
  return (
    <View className="mt-7">
      <View className="mb-3 min-h-8 flex-row items-center justify-between gap-3">
        <AppText variant="overline">{title}</AppText>
        {right}
      </View>
      {children}
    </View>
  );
}

export function Collapsible({
  title,
  children,
}: {
  readonly title: string;
  readonly children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <View className="border-t border-line">
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        onPress={() => setOpen((o) => !o)}
        className="min-h-13 flex-row items-center justify-between py-3.5"
      >
        <Text className="text-[15px] font-medium text-ink">{title}</Text>
        <Text className="text-[20px] text-muted">{open ? "–" : "+"}</Text>
      </Pressable>
      {open ? (
        <Animated.View entering={FadeIn.duration(220)} className="gap-3 pb-4">
          {children}
        </Animated.View>
      ) : null}
    </View>
  );
}

export interface StatProps {
  readonly label: string;
  readonly value: string;
  /** Cells per row. */
  readonly per?: 1 | 2 | 3;
}

const BASIS = { 1: "basis-full", 2: "basis-[48%]", 3: "basis-[31%]" } as const;

export function Stat({ label, value, per = 3 }: StatProps) {
  return (
    <View className={cn("grow rounded-2xl bg-surface-2 px-3.5 py-3", BASIS[per])}>
      <Text className="mb-0.5 text-[11.5px] text-muted">{label}</Text>
      <Text className="text-[17px] font-semibold text-ink">{value}</Text>
    </View>
  );
}

export function StatGrid({ children }: { readonly children: ReactNode }) {
  return <View className="mb-2.5 flex-row flex-wrap gap-2">{children}</View>;
}

export function Note({
  children,
  center,
}: {
  readonly children: ReactNode;
  readonly center?: boolean;
}) {
  return (
    <Text className={cn("my-1.5 text-[13px] leading-[20px] text-muted", center && "text-center")}>
      {children}
    </Text>
  );
}

/** List with hairlines between items. */
export function Lines({ items }: { readonly items: ReadonlyArray<string> }) {
  return (
    <View>
      {items.map((item, i) => (
        <Text
          key={item}
          className={cn(
            "py-3 text-[15px] leading-[22px] text-muted",
            i > 0 && "border-t border-line",
          )}
        >
          {item}
        </Text>
      ))}
    </View>
  );
}
