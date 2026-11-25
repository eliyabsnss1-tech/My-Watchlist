import type { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../theme";

export interface ScreenProps {
  readonly children: ReactNode;
}

/** Full-screen page: deep blue background, safe-area aware. */
export function Screen({ children }: ScreenProps) {
  return (
    <SafeAreaView edges={["top", "left", "right"]} style={{ flex: 1, backgroundColor: colors.bg }}>
      {children}
    </SafeAreaView>
  );
}
