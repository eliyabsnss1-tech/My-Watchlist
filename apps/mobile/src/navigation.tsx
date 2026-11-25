import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStaticNavigation, DarkTheme, type Theme } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from "@react-navigation/native-stack";

import { ElementScopeScreen } from "./features/elementscope/ElementScopeScreen";
import { ElementSheet } from "./features/elementscope/ElementSheet";
import { DrawerContent } from "./features/home/DrawerContent";
import { HomeScreen } from "./features/home/HomeScreen";
import { DeletedSheet } from "./features/watchlist/DeletedSheet";
import { DetailsSheet } from "./features/watchlist/DetailsSheet";
import { SearchSheet } from "./features/watchlist/SearchSheet";
import { SettingsScreen } from "./features/watchlist/SettingsScreen";
import { StatsSheet } from "./features/watchlist/StatsSheet";
import { WatchlistScreen } from "./features/watchlist/WatchlistScreen";
import { colors } from "./theme";

/** Bottom sheet route: the native sheet gives drag-down-to-close and the back gesture. */
const sheet: NativeStackNavigationOptions = {
  presentation: "formSheet",
  sheetAllowedDetents: [0.94],
  sheetCornerRadius: 28,
  sheetGrabberVisible: true,
  contentStyle: { backgroundColor: colors.bg },
};

/** Drawn by the screen itself (DragSheet): drag down from anywhere to close. */
const dragSheet: NativeStackNavigationOptions = {
  presentation: "transparentModal",
  animation: "none",
  contentStyle: { backgroundColor: "transparent" },
};

const WatchlistStack = createNativeStackNavigator({
  initialRouteName: "WatchlistHome",
  screenOptions: {
    headerShown: false,
    contentStyle: { backgroundColor: colors.bg },
    animation: "slide_from_right",
  },
  screens: {
    WatchlistHome: { screen: WatchlistScreen, linking: "" },
    Settings: SettingsScreen,
    // myapps://watchlist/add and myapps://watchlist/title/<key> are opened by the widget and notifications.
    Search: { screen: SearchSheet, options: sheet, linking: "add" },
    Details: { screen: DetailsSheet, options: sheet, linking: "title/:key" },
    Stats: { screen: StatsSheet, options: dragSheet },
    Deleted: { screen: DeletedSheet, options: dragSheet },
  },
});

const ElementScopeStack = createNativeStackNavigator({
  screenOptions: {
    headerShown: false,
    contentStyle: { backgroundColor: colors.bg },
  },
  screens: {
    ElementScopeHome: { screen: ElementScopeScreen, options: { title: "ElementScope" } },
    Element: { screen: ElementSheet, options: { ...sheet, title: "Element" } },
  },
});

const Drawer = createDrawerNavigator({
  drawerContent: (props) => <DrawerContent {...props} />,
  screenOptions: {
    headerShown: false,
    drawerType: "front",
    drawerPosition: "left",
    overlayColor: colors.scrim,
    swipeEdgeWidth: 36,
    drawerStyle: {
      backgroundColor: colors.surface,
      width: 300,
      borderTopRightRadius: 28,
      borderBottomRightRadius: 28,
    },
  },
  screens: {
    Home: HomeScreen,
    Watchlist: { screen: WatchlistStack, linking: "watchlist" },
    ElementScope: ElementScopeStack,
  },
});

const theme: Theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.primary,
    background: colors.bg,
    card: colors.surface,
    text: colors.ink,
    border: colors.line,
    notification: colors.primary,
  },
};

const Navigation = createStaticNavigation(Drawer);

export function AppNavigation() {
  // The app is laid out left-to-right; without this the drawer follows the phone's language direction.
  return (
    <Navigation
      theme={theme}
      direction="ltr"
      linking={{ enabled: "auto", prefixes: ["myapps://"] }}
    />
  );
}
