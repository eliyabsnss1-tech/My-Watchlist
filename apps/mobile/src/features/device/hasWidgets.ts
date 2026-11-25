import { Platform, TurboModuleRegistry } from "react-native";

/** True in the installed Android app; false in Expo Go and on the web, which lack widget support. */
export const hasWidgets = (): boolean =>
  Platform.OS === "android" && TurboModuleRegistry.get("AndroidWidget") != null;
