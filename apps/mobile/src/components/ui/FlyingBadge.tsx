import type { LucideIcon } from "lucide-react-native";
import { View } from "react-native";
import Animated, { Easing, withDelay, withSequence, withTiming } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { motion } from "../../theme";
import { Poster } from "./Poster";

export interface Flight {
  readonly id: number;
  readonly from: { readonly x: number; readonly y: number };
  /** The spot it lands on (a tab or a button), in the same coordinates as `from`. */
  readonly target: {
    readonly x: number;
    readonly y: number;
    readonly w: number;
    readonly h: number;
    readonly radius: number;
  };
  readonly icon: LucideIcon;
  readonly color: string;
  readonly poster: string;
  readonly title: string;
}

const CARD_W = 46;
const CARD_H = 69;
const TRAVEL = 650;
const GLOW = 700;
// Different curves for x and y make the card travel in an arc instead of a straight line.
const ACROSS = Easing.bezier(...motion.standard);
const UP = Easing.bezier(...motion.emphasizedDecelerate);

/**
 * The swiped title's poster shrinks and flies to where it went; the spot it lands on then lights
 * up in the action's color and pulses, so it is clear where the title is now.
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
  const toX = target.x + target.w / 2;
  const toY = target.y + target.h / 2;
  const card = () => {
    "worklet";
    return {
      initialValues: {
        opacity: 1,
        transform: [
          { translateX: from.x },
          { translateY: from.y },
          { scale: 1.1 },
          { rotate: "0deg" },
        ],
      },
      animations: {
        opacity: withDelay(TRAVEL - 100, withTiming(0, { duration: 120 })),
        transform: [
          { translateX: withTiming(toX, { duration: TRAVEL, easing: ACROSS }) },
          { translateY: withTiming(toY, { duration: TRAVEL, easing: UP }) },
          { scale: withTiming(0.35, { duration: TRAVEL, easing: ACROSS }) },
          { rotate: withTiming(from.x < toX ? "12deg" : "-12deg", { duration: TRAVEL }) },
        ],
      },
    };
  };
  const glow = () => {
    "worklet";
    return {
      initialValues: { opacity: 0, transform: [{ scale: 1 }] },
      animations: {
        opacity: withDelay(
          TRAVEL - 80,
          withSequence(
            withTiming(0.9, { duration: 90 }),
            withTiming(0.9, { duration: 260 }),
            withTiming(0, { duration: GLOW - 350 }),
          ),
        ),
        transform: [
          {
            scale: withDelay(
              TRAVEL - 80,
              withSequence(withTiming(1.12, { duration: 140 }), withTiming(1, { duration: 220 })),
            ),
          },
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
        entering={glow}
        style={{
          position: "absolute",
          left: target.x,
          top: target.y,
          width: target.w,
          height: target.h,
          borderRadius: target.radius,
          borderWidth: 2.5,
          borderColor: color,
          backgroundColor: `${color}55`,
          opacity: 0,
        }}
      />
      <Animated.View
        pointerEvents="none"
        entering={card}
        style={{
          position: "absolute",
          left: -CARD_W / 2,
          top: -CARD_H / 2,
          width: CARD_W,
          height: CARD_H,
          opacity: 0,
        }}
      >
        <View
          style={{ borderColor: color, borderWidth: 2, borderRadius: 12, overflow: "hidden" }}
          className="shadow-lg"
        >
          <Poster uri={flight.poster} title={flight.title} size="sm" />
        </View>
        <View
          style={{ backgroundColor: color, position: "absolute", right: -8, top: -8 }}
          className="size-6 items-center justify-center rounded-full"
        >
          <Icon size={14} color="#06102a" strokeWidth={2.8} />
        </View>
      </Animated.View>
    </>
  );
}
