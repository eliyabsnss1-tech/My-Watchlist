import "./global.css";

import { RegistryProvider } from "@effect/atom-react";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { SnackbarHost } from "./components/ui/Snackbar";
import { AppNavigation } from "./navigation";
import { colors } from "./theme";

export function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.bg }}>
      <SafeAreaProvider>
        <RegistryProvider>
          <StatusBar style="light" />
          <AppNavigation />
          <SnackbarHost />
        </RegistryProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
