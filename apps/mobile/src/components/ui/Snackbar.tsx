import { useAtomSet, useAtomValue } from "@effect/atom-react";
import { Atom } from "effect/reactivity";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { haptic } from "../../lib/haptics";

export interface Snack {
  readonly id: number;
  readonly kind: "deleted" | "watched" | "unwatched" | "info";
  /** Bold first line, usually the title the action touched. */
  readonly title: string;
  readonly message?: string;
  readonly undo?: () => void;
}

const SNACK_MS = 5000;
const MESSAGES: Readonly<Record<Exclude<Snack["kind"], "info">, string>> = {
  deleted: "Deleted",
  watched: "Marked watched",
  unwatched: "Back to To watch",
};

export const snackAtom = Atom.make<Snack | null>(null).pipe(Atom.keepAlive);

let nextId = 1;
export const makeSnack = (snack: Omit<Snack, "id">): Snack => ({ ...snack, id: nextId++ });

export function SnackbarHost() {
  const snack = useAtomValue(snackAtom);
  const setSnack = useAtomSet(snackAtom);
  const insets = useSafeAreaInsets();

  // oxlint-disable-next-line apps/no-unreasoned-state-sync -- a timer is an external system: hide the row after it runs out.
  useEffect(() => {
    if (!snack) return;
    // @effect-diagnostics-next-line globalTimers:off - a React-owned UI timer, cleared on unmount.
    const timer = setTimeout(() => setSnack((s) => (s?.id === snack.id ? null : s)), SNACK_MS);
    return () => clearTimeout(timer);
  }, [snack, setSnack]);

  if (!snack) return null;
  const undo = snack.undo;
  // Two short lines: what happened, then which title (or the note's details).
  const line1 = snack.kind === "info" ? snack.title : MESSAGES[snack.kind];
  const line2 = snack.kind === "info" ? snack.message : snack.title;
  return (
    <Animated.View
      key={snack.id}
      entering={FadeInDown.duration(220)}
      exiting={FadeOut.duration(140)}
      pointerEvents="box-none"
      // Centered, and never wider than the space between the + button (left 20, 64 wide) and the
      // matching margin on the right, so it never covers it.
      style={{
        position: "absolute",
        left: 92,
        right: 92,
        bottom: insets.bottom + 28,
        alignItems: "center",
      }}
    >
      <View className="flex-row items-center gap-1 rounded-2xl border border-white/10 bg-surface-3 py-2 pl-4 pr-1.5 shadow-lg">
        <View className="shrink">
          <Text numberOfLines={2} className="text-[13.5px] font-semibold leading-[18px] text-ink">
            {line1}
          </Text>
          {line2 ? (
            <Text numberOfLines={1} className="text-[12px] leading-4 text-muted">
              {line2}
            </Text>
          ) : null}
        </View>
        {undo ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Undo: ${line1} ${line2 ?? ""}`}
            hitSlop={8}
            onPress={() => {
              setSnack(null);
              undo();
              haptic("light");
            }}
            className="ml-1 h-9 justify-center rounded-xl px-3 active:bg-white/10"
          >
            <Text className="text-[14px] font-bold text-accent">Undo</Text>
          </Pressable>
        ) : (
          <View className="w-2.5" />
        )}
      </View>
    </Animated.View>
  );
}
