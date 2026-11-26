import { useNavigation } from "@react-navigation/native";
import { ChevronDown } from "lucide-react-native";
import { useEffect, useRef, type ReactNode, type Ref } from "react";
import { Pressable, useWindowDimensions, View, type ScrollViewInstance } from "react-native";
import { GestureDetector, ScrollView, usePanGesture } from "react-native-gesture-handler";
import Animated, {
  Easing,
  FadeIn,
  interpolate,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";

import { colors, motion } from "../../theme";
import { AppText } from "./AppText";

export interface DragSheetProps {
  readonly title?: string;
  readonly subtitle?: string;
  /** Stays put above the scrolling content (e.g. a search field). */
  readonly header?: ReactNode;
  /** Drawn behind everything, e.g. a title's poster as the sheet's backdrop. */
  readonly backdrop?: ReactNode;
  readonly scrollRef?: Ref<ScrollViewInstance | null>;
  readonly children: ReactNode;
}

// Built once here: gesture callbacks run on the UI thread and can't call plain JS helpers.
const SETTLE = Easing.bezier(...motion.emphasizedDecelerate);
const THROW = Easing.bezier(...motion.standardDecelerate);
const LEAVE = Easing.bezier(...motion.emphasizedAccelerate);
const FLING_VELOCITY = 600;

/**
 * Bottom sheet for a `transparentModal` route. Drag it down from anywhere once its content is
 * scrolled to the top; it follows the finger and leaves at the finger's speed.
 */
export function DragSheet({
  title,
  subtitle,
  header,
  backdrop,
  scrollRef,
  children,
}: DragSheetProps) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { height: screen } = useWindowDimensions();
  const height = Math.round(screen * 0.87);
  const y = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const startAt = useSharedValue(0);
  // Height of the top part (handle, title, header such as a search field) and whether the
  // finger started there: dragging from the top always moves the sheet, however far the list
  // below is scrolled.
  const topHeight = useSharedValue(0);
  const fromTop = useSharedValue(false);
  const leaving = useRef(false);

  const finish = () => {
    leaving.current = true;
    navigation.goBack();
  };

  // Back button / back gesture: slide out first instead of vanishing.
  // oxlint-disable-next-line apps/no-unreasoned-state-sync -- navigation events are an external system.
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        if (leaving.current) return;
        e.preventDefault();
        y.set(
          withTiming(height, { duration: 260, easing: LEAVE }, (done) => {
            if (done) scheduleOnRN(finish);
          }),
        );
      }),
    [navigation, height, y, finish],
  );

  const pan = usePanGesture({
    activeOffsetY: 8,
    failOffsetX: [-20, 20],
    onActivate: (e) => {
      "worklet";
      startAt.set(e.translationY);
      fromTop.set(e.y - e.translationY < topHeight.get());
    },
    onUpdate: (e) => {
      "worklet";
      // While the content is still scrolling up, keep re-anchoring so the sheet starts moving
      // exactly when the content reaches its top.
      if (!fromTop.get() && scrollY.get() > 0 && y.get() === 0) {
        startAt.set(e.translationY);
        return;
      }
      y.set(Math.max(0, e.translationY - startAt.get()));
    },
    onDeactivate: (e) => {
      "worklet";
      const v = e.velocityY;
      if (y.get() > Math.min(160, height * 0.25) || (v > FLING_VELOCITY && y.get() > 24)) {
        const remaining = height - y.get();
        const duration = Math.min(320, Math.max(140, (remaining / Math.max(v, 1400)) * 1000));
        y.set(
          withTiming(height, { duration, easing: THROW }, (done) => {
            if (done) scheduleOnRN(finish);
          }),
        );
      } else if (y.get() > 0) {
        y.set(withTiming(0, { duration: 380, easing: SETTLE }));
      }
    },
  });

  const sheetStyle = useAnimatedStyle(() => ({ transform: [{ translateY: y.get() }] }));
  const scrimStyle = useAnimatedStyle(() => ({
    opacity: interpolate(y.get(), [0, height], [1, 0], "clamp"),
  }));

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <Animated.View
        entering={FadeIn.duration(300)}
        style={[{ position: "absolute", inset: 0, backgroundColor: colors.scrim }, scrimStyle]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Close"
          style={{ flex: 1 }}
          onPress={() => navigation.goBack()}
        />
      </Animated.View>
      <Animated.View
        entering={SlideInDown.duration(480).easing(Easing.bezierFn(...motion.emphasizedDecelerate))}
      >
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[{ height, borderTopLeftRadius: 28, borderTopRightRadius: 28 }, sheetStyle]}
            className="overflow-hidden bg-bg"
          >
            {backdrop}
            <View
              onLayout={(e) => {
                topHeight.set(e.nativeEvent.layout.height);
              }}
            >
              <View accessibilityHint="Swipe down to close" className="items-center pb-1 pt-2.5">
                <View className="h-1.5 w-14 rounded-full bg-muted/50" />
                <ChevronDown
                  size={16}
                  color={colors.muted}
                  strokeWidth={2.4}
                  style={{ marginTop: 1 }}
                />
              </View>
              {title || subtitle || header ? (
                <View className="px-5 pb-2">
                  {title ? <AppText variant="title">{title}</AppText> : null}
                  {subtitle ? (
                    <AppText variant="caption" className="mt-1">
                      {subtitle}
                    </AppText>
                  ) : null}
                  {header}
                </View>
              ) : null}
            </View>
            <ScrollView
              ref={scrollRef}
              simultaneousWith={pan}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              onScroll={(e) => {
                scrollY.set(e.nativeEvent.contentOffset.y);
              }}
              scrollEventThrottle={16}
              overScrollMode="never"
              contentContainerStyle={{ paddingBottom: insets.bottom + 28 }}
            >
              <View className="px-5 pt-2">{children}</View>
            </ScrollView>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </View>
  );
}
