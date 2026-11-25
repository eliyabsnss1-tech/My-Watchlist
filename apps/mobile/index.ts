import { registerRootComponent } from "expo";
import { I18nManager } from "react-native";

import { App } from "./src/App";
import { hasWidgets } from "./src/features/device/hasWidgets";

// The layout is designed left-to-right. On a phone set to Hebrew (or once Expo Go has been told to
// force RTL) React Native mirrors everything, which flips swipes and drags. Takes effect after a restart.
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

registerRootComponent(App);

// The home-screen widget draws itself through this handler, even when the app isn't open.
if (hasWidgets()) {
  void Promise.all([
    import("react-native-android-widget"),
    import("./src/features/device/widgetTask"),
  ]).then(([{ registerWidgetTaskHandler }, { widgetTaskHandler }]) =>
    registerWidgetTaskHandler(widgetTaskHandler),
  );
}
