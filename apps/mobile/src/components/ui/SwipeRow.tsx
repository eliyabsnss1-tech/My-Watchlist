import type { LucideIcon } from "lucide-react-native";
import { useRef, type ReactNode } from "react";
import { Text, View, type HostInstance } from "react-native";
import { GestureDetector, usePanGesture } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
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
  /**
   * This direction flips the page instead of moving the row: the row springs back and
   * `onPage` runs once the drag passes a short distance.
   */
  readonly pageSide?: "right" | "left";
  readonly onPage?: () => void;
  /** As soon as a swipe is let go: the row's center on screen, for showing where it goes. */
  readonly onLaunch?: (
    direction: "right" | "left",
    from: { x: number; y: number; w: number; h: number },
  ) => void;
  readonly children: ReactNode;
}

let lastSwipeAt = -Infinity;
const markSwipe = () => {
  lastSwipeAt = performance.now();
};
/** True right after a row was dragged, so the release doesn't also count as a tap. */
export const swipedRecently = (): boolean => performance.now() - lastSwipeAt < 450;

// Firm on purpose: the row resists (moves a fraction of the finger) until the finger passes
// `commitDistance`, then pops out to the finger. Letting go before that snaps it back.
const RESIST = 0.3;
const FLING_VELOCITY = 1400; // px/s, a hard flick past most of the distance also counts
const START_DISTANCE = 26;
const commitDistance = (width: number) => {
  "worklet";
  return Math.min(160, width * 0.4);
};
const POP = { duration: 140 };
const PAGE_SHARE = 0.6; // flipping the page needs a shorter drag than moving a title
const CORNER = 28; // the row's corner radius
const LABEL_W = 200; // fixed, so the label is uncovered as the gap opens instead of squeezed
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

export function SwipeRow({
  right,
  left,
  onSwipe,
  onLaunch,
  pageSide,
  onPage,
  children,
}: SwipeRowProps) {
  const drag = useSharedValue(0);
  const pop = useSharedValue(0);
  // What the row shows: a resisted fraction of the finger, and the full finger once popped.
  const x = useDerivedValue(() => drag.value * (RESIST + (1 - RESIST) * pop.value));
  const width = useSharedValue(360);
  const height = useSharedValue(-1);
  const measured = useSharedValue(0);
  const armed = useSharedValue(false);

  const wrap = useRef<HostInstance>(null);
  const launch = (direction: "right" | "left") =>
    wrap.current?.measureInWindow((x, y, w, h) => onLaunch?.(direction, { x, y, w, h }));
  const commit = (direction: "right" | "left") => onSwipe(direction);
  const page = () => onPage?.();
  const buzz = () => haptic("medium");

  const pan = usePanGesture({
    activeOffsetX: [-START_DISTANCE, START_DISTANCE],
    failOffsetY: [-12, 12],
    onActivate: () => {
      "worklet";
      scheduleOnRN(markSwipe);
    },
    onUpdate: (e) => {
      "worklet";
      drag.value = e.translationX;
      const toPage = (e.translationX > 0 ? "right" : "left") === pageSide;
      const reach = commitDistance(width.value) * (toPage ? PAGE_SHARE : 1);
      const nowArmed = Math.abs(e.translationX) > reach;
      if (nowArmed !== armed.value) {
        armed.value = nowArmed;
        pop.value = withTiming(nowArmed ? 1 : 0, POP);
        if (nowArmed) scheduleOnRN(buzz);
      }
    },
    onDeactivate: (e) => {
      "worklet";
      const tx = e.translationX;
      const v = e.velocityX;
      const flung =
        Math.abs(v) > FLING_VELOCITY &&
        Math.abs(tx) > commitDistance(width.value) * 0.7 &&
        Math.sign(v) === Math.sign(tx);
      armed.value = false;
      const direction = tx > 0 ? "right" : "left";
      if (direction === pageSide) {
        // Flip the page: the row itself stays put.
        const far = Math.abs(tx) > commitDistance(width.value) * PAGE_SHARE;
        drag.value = withTiming(0, { duration: 320, easing: SNAP_BACK });
        pop.value = withTiming(0, POP);
        if (!e.canceled && (far || flung)) {
          scheduleOnRN(markSwipe);
          scheduleOnRN(page);
        }
        return;
      }
      if (e.canceled || !(Math.abs(tx) > commitDistance(width.value) || flung)) {
        drag.value = withTiming(0, { duration: 320, easing: SNAP_BACK });
        pop.value = withTiming(0, POP);
        return;
      }
      scheduleOnRN(markSwipe);
      scheduleOnRN(launch, direction);
      const target = Math.sign(tx) * (width.value + 20);
      const remaining = Math.abs(target - tx);
      const fly = Math.min(220, Math.max(110, (remaining / Math.max(Math.abs(v), 1500)) * 1000));
      pop.value = withTiming(1, POP);
      drag.value = withTiming(target, { duration: fly, easing: FLY_OFF }, () => {
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
  // The color only fills the gap the row leaves on the side it moves away from (plus its rounded
  // corner), so it never peeks out along the row's top or bottom edge.
  const rightBg = useAnimatedStyle(() => ({
    opacity: x.value > 0.5 ? 1 : 0,
    width: Math.max(0, x.value) + CORNER,
    backgroundColor: right.color,
  }));
  const leftBg = useAnimatedStyle(() => ({
    opacity: x.value < -0.5 ? 1 : 0,
    width: Math.max(0, -x.value) + CORNER,
    backgroundColor: left.color,
  }));
  const labelPop = useAnimatedStyle(() => ({
    opacity: 0.55 + 0.45 * pop.value,
    transform: [{ scale: 0.9 + 0.2 * pop.value }],
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
          {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            overflow: "hidden",
            justifyContent: "center",
            paddingHorizontal: 22,
          },
          rightBg,
        ]}
      >
        <Animated.View
          style={[{ alignSelf: "flex-start", width: LABEL_W, flexShrink: 0 }, labelPop]}
        >
          <ActionLabel action={right} align="start" />
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={[
          {
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            overflow: "hidden",
            justifyContent: "center",
            alignItems: "flex-end",
            paddingHorizontal: 22,
          },
          leftBg,
        ]}
      >
        <Animated.View
          style={[
            { alignSelf: "flex-end", width: LABEL_W, flexShrink: 0, alignItems: "flex-end" },
            labelPop,
          ]}
        >
          <ActionLabel action={left} align="end" />
        </Animated.View>
      </Animated.View>
      <GestureDetector gesture={pan}>
        <Animated.View style={rowStyle}>{children}</Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
