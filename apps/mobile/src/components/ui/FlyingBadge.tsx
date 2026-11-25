import type { LucideIcon } from "lucide-react-native";
import Animated, { Easing, withDelay, withTiming } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { motion } from "../../theme";

export interface Flight {
  readonly id: number;
  readonly from: { readonly x: number; readonly y: number };
  readonly to: { readonly x: number; readonly y: number };
  readonly icon: LucideIcon;
  readonly color: string;
}

const SIZE = 34;
const DURATION = 560;
// Different curves for x and y make the badge travel in an arc instead of a straight line.
const ACROSS = Easing.bezier(...motion.standard);
const UP = Easing.bezier(...motion.emphasizedDecelerate);

/** A small badge that flies from where a row was to where it went (a tab or a button), then fades. */
export function FlyingBadge({
  flight,
  onDone,
}: {
  readonly flight: Flight;
  readonly onDone: () => void;
}) {
  const { from, to, color } = flight;
  const Icon = flight.icon;
  const entering = () => {
    "worklet";
    return {
      initialValues: {
        opacity: 1,
        transform: [{ translateX: from.x }, { translateY: from.y }, { scale: 1.15 }],
      },
      animations: {
        opacity: withDelay(DURATION - 140, withTiming(0, { duration: 140 })),
        transform: [
          { translateX: withTiming(to.x, { duration: DURATION, easing: ACROSS }) },
          { translateY: withTiming(to.y, { duration: DURATION, easing: UP }) },
          { scale: withTiming(0.55, { duration: DURATION, easing: ACROSS }) },
        ],
      },
      callback: (finished: boolean) => {
        "worklet";
        if (finished) scheduleOnRN(onDone);
      },
    };
  };
  return (
    <Animated.View
      pointerEvents="none"
      entering={entering}
      style={{
        position: "absolute",
        left: -SIZE / 2,
        top: -SIZE / 2,
        width: SIZE,
        height: SIZE,
        borderRadius: SIZE / 2,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
        opacity: 0,
      }}
    >
      <Icon size={18} color="#06102a" strokeWidth={2.6} />
    </Animated.View>
  );
}
