import { ActivityIndicator, View } from "react-native";
import { WebView } from "react-native-webview";

import { colors } from "../../theme";

export function SiteView({ url }: { readonly url: string }) {
  return (
    <WebView
      source={{ uri: url }}
      style={{ flex: 1, backgroundColor: colors.bg }}
      startInLoadingState
      renderLoading={() => (
        <View
          style={{
            position: "absolute",
            inset: 0,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.bg,
          }}
        >
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      )}
      allowsBackForwardNavigationGestures
      pullToRefreshEnabled
      forceDarkOn
    />
  );
}
