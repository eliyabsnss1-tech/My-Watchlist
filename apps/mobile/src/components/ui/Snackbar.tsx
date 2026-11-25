import { useAtomSet, useAtomValue } from "@effect/atom-react";
import { Atom } from "effect/reactivity";
import { Check, Info, RotateCcw, Trash2, type LucideIcon } from "lucide-react-native";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  SlideInDown,
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
    watched: { icon: Check, color: colors.ok, message: "Moved to Watched" },
    unwatched: { icon: RotateCcw, color: colors.accent, message: "Moved back to To watch" },
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
  return (
    <Animated.View
      key={snack.id}
      entering={SlideInDown.duration(400).easing(Easing.bezierFn(...motion.emphasizedDecelerate))}
      pointerEvents="box-none"
      style={{ position: "absolute", left: 12, right: 12, bottom: insets.bottom + 96 }}
    >
      <View className="min-h-16 flex-row items-center gap-3 overflow-hidden rounded-3xl bg-[#e9efff] py-2 pl-3 pr-2">
        <View
          style={{ backgroundColor: k.color }}
          className="size-9 items-center justify-center rounded-full"
        >
          <Icon size={18} color="#06102a" strokeWidth={2.4} />
        </View>
        <View className="flex-1">
          <Text numberOfLines={1} className="text-[15px] font-bold text-[#0a1430]">
            {snack.title}
          </Text>
          <Text numberOfLines={1} className="text-[13px] text-[#33416a]">
            {snack.message ?? k.message}
          </Text>
        </View>
        {undo ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Undo: ${k.message} ${snack.title}`}
            onPress={() => {
              setSnack(null);
              undo();
              haptic("light");
            }}
            className="h-11 flex-row items-center gap-1.5 rounded-full bg-primary-strong pl-3 pr-4 active:opacity-80"
          >
            <RotateCcw size={17} color="#fff" strokeWidth={2.4} />
            <Text className="text-[15px] font-bold text-white">Undo</Text>
          </Pressable>
        ) : null}
        <Animated.View
          style={[
            {
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 3,
              backgroundColor: colors.primaryStrong,
              opacity: 0.5,
              transformOrigin: "left",
            },
            bar,
          ]}
        />
      </View>
    </Animated.View>
  );
}
