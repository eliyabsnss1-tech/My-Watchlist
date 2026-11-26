import type { LucideIcon } from "lucide-react-native";
import { Text } from "react-native";
import Animated, { Easing, withDelay, withSequence, withTiming } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { motion } from "../../theme";

type Box = { readonly x: number; readonly y: number; readonly w: number; readonly h: number };

export interface Flight {
  readonly id: number;
  /** The swiped row, on screen. */
  readonly from: Box;
  /** The spot it goes into (a tab or a button), in the same coordinates. */
  readonly target: Box & { readonly radius: number };
  readonly icon: LucideIcon;
  readonly color: string;
  readonly poster: string;
  readonly title: string;
}

const MORPH = 560;
const AFTER = 650;
const SHAPE = Easing.bezier(...motion.emphasizedDecelerate);
const MOVE = Easing.bezier(...motion.standard);

/**
 * The swiped row turns into the place it goes: a copy of the row in the action's color shrinks
 * and reshapes into the tab (or the Recently deleted button), which then pulses while a "+1"
 * rises above it.
 */
export function FlyingBadge({
  flight,
  onDone,
}: {
  readonly flight: Flight;
  readonly onDone: () => void;
}) {
  const { from, target, color } = flight;
  const Icon = flight.icon;
  // The copy is drawn at the row's size and scaled, so it can become any shape.
  const dx = target.x + target.w / 2 - (from.x + from.w / 2);
  const dy = target.y + target.h / 2 - (from.y + from.h / 2);
  const sx = target.w / from.w;
  const sy = target.h / from.h;
  const ghost = () => {
    "worklet";
    return {
      initialValues: {
        opacity: 0.95,
        transform: [{ translateX: 0 }, { translateY: 0 }, { scaleX: 1 }, { scaleY: 1 }],
      },
      animations: {
        opacity: withDelay(MORPH - 60, withTiming(0, { duration: 180 })),
        transform: [
          { translateX: withTiming(dx, { duration: MORPH, easing: MOVE }) },
          { translateY: withTiming(dy, { duration: MORPH, easing: SHAPE }) },
          { scaleX: withTiming(sx, { duration: MORPH, easing: SHAPE }) },
          { scaleY: withTiming(sy, { duration: MORPH, easing: MOVE }) },
        ],
      },
    };
  };
  const pulse = () => {
    "worklet";
    return {
      initialValues: { opacity: 0, transform: [{ scale: 1 }] },
      animations: {
        opacity: withDelay(
          MORPH - 80,
          withSequence(withTiming(1, { duration: 80 }), withTiming(0, { duration: AFTER - 80 })),
        ),
        transform: [
          {
            scale: withDelay(
              MORPH - 80,
              withSequence(withTiming(1.15, { duration: 160 }), withTiming(1, { duration: 260 })),
            ),
          },
        ],
      },
    };
  };
  const plusOne = () => {
    "worklet";
    return {
      initialValues: { opacity: 0, transform: [{ translateY: 0 }, { scale: 0.6 }] },
      animations: {
        opacity: withDelay(
          MORPH - 40,
          withSequence(
            withTiming(1, { duration: 120 }),
            withTiming(1, { duration: 300 }),
            withTiming(0, { duration: 260 }),
          ),
        ),
        transform: [
          { translateY: withDelay(MORPH - 40, withTiming(-26, { duration: 680, easing: SHAPE })) },
          { scale: withDelay(MORPH - 40, withTiming(1, { duration: 200 })) },
        ],
      },
      callback: (finished: boolean) => {
        "worklet";
        if (finished) scheduleOnRN(onDone);
      },
    };
  };
  return (
    <>
      <Animated.View
        pointerEvents="none"
        entering={ghost}
        style={{
          position: "absolute",
          left: from.x,
          top: from.y,
          width: from.w,
          height: from.h,
          borderRadius: 28,
          backgroundColor: `${color}66`,
          borderWidth: 2,
          borderColor: color,
          opacity: 0,
        }}
      />
      <Animated.View
        pointerEvents="none"
        entering={pulse}
        style={{
          position: "absolute",
          left: target.x,
          top: target.y,
          width: target.w,
          height: target.h,
          borderRadius: target.radius,
          borderWidth: 2.5,
          borderColor: color,
          backgroundColor: `${color}40`,
          opacity: 0,
        }}
      />
      <Animated.View
        pointerEvents="none"
        entering={plusOne}
        style={{
          position: "absolute",
          left: target.x + target.w / 2 - 26,
          top: target.y - 14,
          width: 52,
          height: 26,
          borderRadius: 13,
          backgroundColor: color,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
          opacity: 0,
        }}
      >
        <Icon size={13} color="#06102a" strokeWidth={2.8} />
        <Text style={{ color: "#06102a", fontSize: 13, fontWeight: "800" }}>+1</Text>
      </Animated.View>
    </>
  );
}
