import type { LucideIcon } from "lucide-react-native";
import { Text, View } from "react-native";
import Animated, { Easing, withDelay, withTiming } from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { motion } from "../../theme";

export interface Flight {
  readonly id: number;
  readonly from: { readonly x: number; readonly y: number };
  readonly to: { readonly x: number; readonly y: number };
  readonly icon: LucideIcon;
  readonly color: string;
  /** Where it went, e.g. "Watched". */
  readonly label: string;
}

const W = 132;
const H = 36;
const RING = 56;
const TRAVEL = 720;
const LAND = 520;
// Different curves for x and y make the pill travel in an arc instead of a straight line.
const ACROSS = Easing.bezier(...motion.standard);
const UP = Easing.bezier(...motion.emphasizedDecelerate);
const OUT = Easing.bezier(...motion.standardDecelerate);

/**
 * A labelled pill that flies from a swiped row to where the title went (a tab or Recently
 * deleted), then a ring ripples out from that spot.
 */
export function FlyingBadge({
  flight,
  onDone,
}: {
  readonly flight: Flight;
  readonly onDone: () => void;
}) {
  const { from, to, color } = flight;
  const Icon = flight.icon;
  const pill = () => {
    "worklet";
    return {
      initialValues: {
        opacity: 1,
        transform: [{ translateX: from.x }, { translateY: from.y }, { scale: 1 }],
      },
      animations: {
        opacity: withDelay(TRAVEL - 120, withTiming(0, { duration: 160 })),
        transform: [
          { translateX: withTiming(to.x, { duration: TRAVEL, easing: ACROSS }) },
          { translateY: withTiming(to.y, { duration: TRAVEL, easing: UP }) },
          { scale: withTiming(0.45, { duration: TRAVEL, easing: ACROSS }) },
        ],
      },
    };
  };
  const ring = () => {
    "worklet";
    return {
      initialValues: { opacity: 0, transform: [{ scale: 0.3 }] },
      animations: {
        opacity: withDelay(TRAVEL - 120, withTiming(0.95, { duration: 80 })),
        transform: [
          { scale: withDelay(TRAVEL - 120, withTiming(2.2, { duration: LAND, easing: OUT })) },
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
        entering={ring}
        style={{
          position: "absolute",
          left: to.x - RING / 2,
          top: to.y - RING / 2,
          width: RING,
          height: RING,
          borderRadius: RING / 2,
          borderWidth: 3,
          borderColor: color,
          opacity: 0,
        }}
      />
      <Animated.View
        pointerEvents="none"
        entering={pill}
        style={{ position: "absolute", left: -W / 2, top: -H / 2, width: W, opacity: 0 }}
      >
        <View
          style={{ backgroundColor: color, height: H, borderRadius: H / 2 }}
          className="flex-row items-center justify-center gap-1.5 self-center px-3.5 shadow-lg"
        >
          <Icon size={17} color="#06102a" strokeWidth={2.6} />
          <Text numberOfLines={1} className="text-[14px] font-bold text-[#06102a]">
            {flight.label}
          </Text>
        </View>
      </Animated.View>
    </>
  );
}
