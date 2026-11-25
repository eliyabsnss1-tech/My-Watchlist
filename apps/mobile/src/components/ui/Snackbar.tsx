import { useAtomSet, useAtomValue } from "@effect/atom-react";
import { Atom } from "effect/reactivity";
import { Check, Info, RotateCcw, Trash2, type LucideIcon } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  FadeInRight,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { haptic } from "../../lib/haptics";
import { colors, motion } from "../../theme";

export interface Snack {
  readonly id: number;
  readonly kind: "deleted" | "watched" | "unwatched" | "info";
  /** Bold first line, usually the title the action touched. */
  readonly title: string;
  readonly message?: string;
  readonly undo?: () => void;
}

const SNACK_MS = 5000;
const KINDS: Readonly<Record<Snack["kind"], { icon: LucideIcon; color: string; message: string }>> =
  {
    deleted: { icon: Trash2, color: colors.danger, message: "Deleted" },
    watched: { icon: Check, color: colors.ok, message: "Marked watched" },
    unwatched: { icon: RotateCcw, color: colors.accent, message: "Back to To watch" },
    info: { icon: Info, color: colors.accent, message: "" },
  };

export const snackAtom = Atom.make<Snack | null>(null).pipe(Atom.keepAlive);

let nextId = 1;
export const makeSnack = (snack: Omit<Snack, "id">): Snack => ({ ...snack, id: nextId++ });

export function SnackbarHost() {
  const snack = useAtomValue(snackAtom);
  const setSnack = useAtomSet(snackAtom);
  const insets = useSafeAreaInsets();
  const progress = useSharedValue(1);

  // oxlint-disable-next-line apps/no-unreasoned-state-sync -- a timer is an external system: hide the bar after it runs out.
  useEffect(() => {
    if (!snack) return;
    progress.value = 1;
    progress.value = withTiming(0, { duration: SNACK_MS, easing: Easing.linear });
    // @effect-diagnostics-next-line globalTimers:off - a React-owned UI timer, cleared on unmount.
    const timer = setTimeout(() => setSnack((s) => (s?.id === snack.id ? null : s)), SNACK_MS);
    return () => clearTimeout(timer);
  }, [snack, setSnack, progress]);

  const bar = useAnimatedStyle(() => ({ transform: [{ scaleX: progress.value }] }));

  if (!snack) return null;
  const k = KINDS[snack.kind];
  const Icon = k.icon;
  const undo = snack.undo;
  // Swipe actions say only what happened (the title flies to where it went); notes show both lines.
  const line1 = snack.kind === "info" ? snack.title : k.message;
  const line2 = snack.kind === "info" ? snack.message : undefined;
  return (
    <Animated.View
      key={snack.id}
      entering={FadeInRight.duration(260).easing(Easing.bezierFn(...motion.emphasizedDecelerate))}
      exiting={FadeOut.duration(160)}
      pointerEvents="box-none"
      style={{ position: "absolute", right: 12, bottom: insets.bottom + 96, maxWidth: "72%" }}
    >
      <View className="min-h-11 flex-row items-center gap-2 overflow-hidden rounded-3xl border border-line bg-surface-2 py-1 pl-2 pr-1">
        <View
          style={{ backgroundColor: k.color }}
          className="size-6 items-center justify-center rounded-full"
        >
          <Icon size={13} color="#06102a" strokeWidth={2.6} />
        </View>
        <View className="shrink">
          <Text numberOfLines={1} className="text-[13px] text-ink">
            {line1}
          </Text>
          {line2 ? (
            <Text numberOfLines={1} className="text-[11.5px] text-muted">
              {line2}
            </Text>
          ) : null}
        </View>
        {undo ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Undo: ${k.message} ${snack.title}`}
            hitSlop={8}
            onPress={() => {
              setSnack(null);
              undo();
              haptic("light");
            }}
            className="h-9 justify-center rounded-full px-3 active:bg-surface-3"
          >
            <Text className="text-[13px] font-bold text-accent">Undo</Text>
          </Pressable>
        ) : (
          <View className="w-2" />
        )}
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 2,
              backgroundColor: colors.accent,
              opacity: 0.45,
              transformOrigin: "left",
            },
            bar,
          ]}
        />
      </View>
    </Animated.View>
  );
}
