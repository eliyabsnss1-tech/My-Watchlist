import type { ReactNode } from "react";
import { Platform, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "./AppText";

export interface SheetProps {
  readonly title?: string;
  readonly subtitle?: string;
  readonly header?: ReactNode;
  readonly children: ReactNode;
  /** Set when the sheet scrolls its own list (search results). */
  readonly scroll?: boolean;
}

/** Body of a bottom-sheet route. The native sheet owns the drag-down-to-close gesture. */
export function Sheet({ title, subtitle, header, children, scroll = true }: SheetProps) {
  const insets = useSafeAreaInsets();
  const top = (
    <View className="px-5 pt-3">
      {Platform.OS === "web" ? (
        <View className="mb-3 h-1.5 w-12 self-center rounded-full bg-surface-3" />
      ) : null}
      {title ? <AppText variant="title">{title}</AppText> : null}
      {subtitle ? (
        <AppText variant="caption" className="mt-1">
          {subtitle}
        </AppText>
      ) : null}
      {header}
    </View>
  );
  if (!scroll) {
    return (
      <View className="flex-1 bg-bg" style={{ paddingBottom: insets.bottom }}>
        {top}
        {children}
      </View>
    );
  }
  return (
    <ScrollView
      className="flex-1 bg-bg"
      contentContainerStyle={{ paddingBottom: insets.bottom + 28 }}
      nestedScrollEnabled
      keyboardShouldPersistTaps="handled"
    >
      {top}
      <View className="px-5 pt-4">{children}</View>
    </ScrollView>
  );
}
