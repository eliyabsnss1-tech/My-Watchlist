import { useAtomSet, useAtomValue } from "@effect/atom-react";
import { Atom } from "effect/reactivity";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
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
  const text =
    snack.kind === "info"
      ? [snack.title, snack.message].filter(Boolean).join(" · ")
      : `${MESSAGES[snack.kind]}: ${snack.title}`;
  return (
    <Animated.View
      key={snack.id}
      entering={FadeIn.duration(180)}
      exiting={FadeOut.duration(140)}
      pointerEvents="box-none"
      // A plain row along the bottom, beside the + button (which sits at left 20, 64 wide).
      style={{ position: "absolute", left: 96, right: 12, bottom: insets.bottom + 30 }}
    >
      <View className="h-11 flex-row items-center rounded-2xl bg-surface-2 pl-4 pr-1">
        <Text numberOfLines={1} className="flex-1 text-[14px] text-ink">
          {text}
        </Text>
        {undo ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Undo: ${text}`}
            hitSlop={8}
            onPress={() => {
              setSnack(null);
              undo();
              haptic("light");
            }}
            className="h-9 justify-center rounded-xl px-3 active:bg-surface-3"
          >
            <Text className="text-[14px] font-bold text-accent">Undo</Text>
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
}
