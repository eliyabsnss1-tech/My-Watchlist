import { useAtomValue } from "@effect/atom-react";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { Linking, Platform } from "react-native";

import { localMillis, localNowIso } from "../../lib/time";
import type { SavedTitle } from "../watchlist/model";
import { upcomingReminders } from "../watchlist/reminders";
import { listAtom } from "../watchlist/state";
import { hasWidgets } from "./hasWidgets";

const CHANNEL = "releases";

async function scheduleReminders(list: ReadonlyArray<SavedTitle>) {
  await Notifications.setNotificationChannelAsync(CHANNEL, {
    name: "New episodes and releases",
    importance: Notifications.AndroidImportance.DEFAULT,
  });
  const perm = await Notifications.getPermissionsAsync();
  const granted =
    perm.granted || (perm.canAskAgain && (await Notifications.requestPermissionsAsync()).granted);
  if (!granted) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
  for (const r of upcomingReminders(list, localNowIso())) {
    const date = localMillis(r.at);
    if (date === undefined) continue;
    await Notifications.scheduleNotificationAsync({
      identifier: r.id,
      content: {
        title: r.title,
        body: r.body,
        data: { url: `myapps://watchlist/title/${encodeURIComponent(r.key)}` },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date,
        channelId: CHANNEL,
      },
    });
  }
}

async function refreshWidget(list: ReadonlyArray<SavedTitle>) {
  if (!hasWidgets()) return;
  // Loaded lazily: the widget library needs native code that Expo Go doesn't have.
  const [{ requestWidgetUpdate }, { renderUpNext }] = await Promise.all([
    import("react-native-android-widget"),
    import("./UpNextWidget"),
  ]);
  await requestWidgetUpdate({ widgetName: "UpNext", renderWidget: () => renderUpNext(list) });
}

/** Keeps the phone in step with the list: release notifications and the home-screen widget. */
export function useDeviceSync() {
  const list = useAtomValue(listAtom);

  // oxlint-disable-next-line apps/no-unreasoned-state-sync -- notifications and widgets are external systems.
  useEffect(() => {
    if (Platform.OS !== "android") return;
    scheduleReminders(list).catch(() => {});
    refreshWidget(list).catch(() => {});
  }, [list]);

  // Tapping a notification opens the title it is about.
  // oxlint-disable-next-line apps/no-unreasoned-state-sync -- notification taps come from the system.
  useEffect(() => {
    if (Platform.OS === "web") return;
    const sub = Notifications.addNotificationResponseReceivedListener((r) => {
      const url = r.notification.request.content.data?.url;
      if (typeof url === "string") Linking.openURL(url).catch(() => {});
    });
    return () => sub.remove();
  }, []);
}
