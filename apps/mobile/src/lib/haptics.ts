import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export function haptic(kind: "light" | "medium" | "success"): void {
  if (Platform.OS === "web") return;
  if (kind === "success") void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  else
    void Haptics.impactAsync(
      kind === "light" ? Haptics.ImpactFeedbackStyle.Light : Haptics.ImpactFeedbackStyle.Medium,
    );
}
