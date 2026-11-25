import { View } from "react-native";

import { AppBar } from "../../components/ui/AppBar";
import { Screen } from "../../components/ui/Screen";
import { SiteView } from "./SiteView";

export const ELEMENTSCOPE_URL = "https://eliyabsnss1-tech.github.io/elementscope/";

export function ElementScopeScreen() {
  return (
    <Screen>
      <AppBar title="ElementScope" />
      <View className="flex-1 overflow-hidden rounded-t-3xl">
        <SiteView url={ELEMENTSCOPE_URL} />
      </View>
    </Screen>
  );
}
