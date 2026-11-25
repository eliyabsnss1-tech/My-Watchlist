import type { LucideIcon } from "lucide-react-native";
import { useRef, type ReactNode } from "react";
import { Text, View, type HostInstance } from "react-native";
import { GestureDetector, usePanGesture } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { haptic } from "../../lib/haptics";
import { motion } from "../../theme";

export interface SwipeAction {
  readonly label: string;
  readonly icon: LucideIcon;
  readonly color: string;
}

export interface SwipeRowProps {
  /** Revealed when the row is dragged to the right. */
  readonly right: SwipeAction;
  /** Revealed when the row is dragged to the left. */
  readonly left: SwipeAction;
  readonly onSwipe: (direction: "right" | "left") => void;
  /** As soon as a swipe is let go: the row's center on screen, for showing where it goes. */
  readonly onLaunch?: (direction: "right" | "left", from: { x: number; y: number }) => void;
  readonly children: ReactNode;
}

let lastSwipeAt = -Infinity;
const markSwipe = () => {
  lastSwipeAt = performance.now();
};
/** True right after a row was dragged, so the release doesn't also count as a tap. */
export const swipedRecently = (): boolean => performance.now() - lastSwipeAt < 450;

// Deliberately firm, so scrolling the list doesn't trigger a swipe by accident.
const FLING_VELOCITY = 1100; // px/s
const START_DISTANCE = 26;
const commitDistance = (width: number) => {
  "worklet";
  return Math.min(170, width * 0.42);
};
// Built once here: the gesture callbacks run on the UI thread and can't call plain JS helpers.
const SNAP_BACK = Easing.bezier(...motion.emphasizedDecelerate);
const FLY_OFF = Easing.bezier(...motion.standardDecelerate);
const COLLAPSE = Easing.bezier(...motion.standard);

function ActionLabel({
  action,
  align,
}: {
  readonly action: SwipeAction;
  readonly align: "start" | "end";
}) {
  const Icon = action.icon;
  return (
    <View
      className={
        align === "start" ? "flex-row items-center gap-2" : "flex-row-reverse items-center gap-2"
      }
    >
      <Icon size={22} color="#06102a" strokeWidth={2.4} />
      <Text className="text-[15px] font-bold text-[#06102a]">{action.label}</Text>
    </View>
  );
}

export function SwipeRow({ right, left, onSwipe, onLaunch, children }: SwipeRowProps) {
  const x = useSharedValue(0);
  const width = useSharedValue(360);
  const height = useSharedValue(-1);
  const measured = useSharedValue(0);
  const armed = useSharedValue(false);

  const wrap = useRef<HostInstance>(null);
  const launch = (direction: "right" | "left") =>
    wrap.current?.measureInWindow((x, y, w, h) =>
      onLaunch?.(direction, { x: x + w / 2, y: y + h / 2 }),
    );
  const commit = (direction: "right" | "left") => onSwipe(direction);
  const buzz = () => haptic("light");

  const pan = usePanGesture({
    activeOffsetX: [-START_DISTANCE, START_DISTANCE],
    failOffsetY: [-12, 12],
    onActivate: () => {
      "worklet";
      scheduleOnRN(markSwipe);
    },
    onUpdate: (e) => {
      "worklet";
      x.value = e.translationX;
      const nowArmed = Math.abs(e.translationX) > commitDistance(width.value);
      if (nowArmed !== armed.value) {
        armed.value = nowArmed;
        if (nowArmed) scheduleOnRN(buzz);
      }
    },
    onDeactivate: (e) => {
      "worklet";
      const tx = e.translationX;
      const v = e.velocityX;
      const flung =
        Math.abs(v) > FLING_VELOCITY && Math.abs(tx) > 80 && Math.sign(v) === Math.sign(tx);
      armed.value = false;
      if (e.canceled || !(Math.abs(tx) > commitDistance(width.value) || flung)) {
        x.value = withTiming(0, { duration: 300, easing: SNAP_BACK });
        return;
      }
      scheduleOnRN(markSwipe);
      const direction = tx > 0 ? "right" : "left";
      scheduleOnRN(launch, direction);
      const target = Math.sign(tx) * (width.value + 20);
      const remaining = Math.abs(target - tx);
      const fly = Math.min(220, Math.max(110, (remaining / Math.max(Math.abs(v), 1500)) * 1000));
      x.value = withTiming(target, { duration: fly, easing: FLY_OFF }, () => {
        height.value = measured.value;
        height.value = withTiming(0, { duration: 200, easing: COLLAPSE }, () => {
          scheduleOnRN(commit, direction);
        });
      });
    },
  });

  const rowStyle = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));
  const wrapStyle = useAnimatedStyle(() =>
    height.value < 0 ? {} : { height: height.value, marginBottom: height.value > 0 ? 8 : 0 },
  );
  const rightBg = useAnimatedStyle(() => ({
    opacity: x.value > 0 ? 1 : 0,
    backgroundColor: right.color,
  }));
  const leftBg = useAnimatedStyle(() => ({
    opacity: x.value < 0 ? 1 : 0,
    backgroundColor: left.color,
  }));

  return (
    <Animated.View
      ref={wrap}
      style={wrapStyle}
      className="mx-3 mb-2 overflow-hidden rounded-3xl"
      onLayout={(e) => {
        width.value = e.nativeEvent.layout.width;
        if (height.value < 0) measured.value = e.nativeEvent.layout.height;
      }}
    >
      <Animated.View
        style={[
          { position: "absolute", inset: 0, justifyContent: "center", paddingHorizontal: 22 },
          rightBg,
        ]}
      >
        <ActionLabel action={right} align="start" />
      </Animated.View>
      <Animated.View
        style={[
          {
            position: "absolute",
            inset: 0,
            justifyContent: "center",
            alignItems: "flex-end",
            paddingHorizontal: 22,
          },
          leftBg,
        ]}
      >
        <ActionLabel action={left} align="end" />
      </Animated.View>
      <GestureDetector gesture={pan}>
        <Animated.View style={rowStyle}>{children}</Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
