import { useAtom, useAtomSet, useAtomValue } from "@effect/atom-react";
import * as Updates from "expo-updates";
import { Download, KeyRound, RefreshCw, Upload } from "lucide-react-native";
import { useState } from "react";
import { Linking, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppBar } from "../../components/ui/AppBar";
import { AppText } from "../../components/ui/AppText";
import { Button } from "../../components/ui/Button";
import { ChoiceChips } from "../../components/ui/ChoiceChips";
import { Screen } from "../../components/ui/Screen";
import { makeSnack, snackAtom } from "../../components/ui/Snackbar";
import { Surface } from "../../components/ui/Surface";
import { TextField } from "../../components/ui/TextField";
import { pickBackup, shareBackup } from "./backup";
import * as List from "./list";
import { REGIONS, SORT_LABELS } from "./model";
import { checkTmdbKeyAtom, deletedAtom, listAtom, settingsAtom } from "./state";

function Group({
  title,
  children,
}: {
  readonly title: string;
  readonly children: React.ReactNode;
}) {
  return (
    <View className="mt-6">
      <AppText variant="overline" className="mb-2.5 px-1">
        {title}
      </AppText>
      <Surface className="gap-3">{children}</Surface>
    </View>
  );
}

export function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [settings, setSettings] = useAtom(settingsAtom);
  const [list, setList] = useAtom(listAtom);
  const deleted = useAtomValue(deletedAtom);
  const checkKey = useAtomSet(checkTmdbKeyAtom, { mode: "promiseExit" });
  const setSnack = useAtomSet(snackAtom);
  const [key, setKey] = useState(settings.tmdbKey);
  const [keyState, setKeyState] = useState<"idle" | "checking" | "bad" | "offline">("idle");
  const info = (title: string, message?: string) =>
    setSnack(makeSnack({ kind: "info", title, ...(message ? { message } : {}) }));

  const saveKey = async () => {
    setKeyState("checking");
    const exit = await checkKey(key.trim());
    if (exit._tag === "Success") {
      setKeyState("idle");
      info(key.trim() ? "TMDB key saved" : "Using the free sources");
      return;
    }
    setKeyState(String(exit.cause).includes("TmdbKeyRejected") ? "bad" : "offline");
  };

  const importBackup = async () => {
    const raw = await pickBackup();
    if (raw === undefined) return;
    if (raw === "invalid") return info("That file isn't a valid backup");
    const result = List.importTitles(list, raw);
    setList(result.list);
    info(
      result.added
        ? `Imported ${result.added} title${result.added > 1 ? "s" : ""}`
        : "Nothing new to import",
    );
  };

  const checkUpdates = async () => {
    if (!Updates.isEnabled)
      return info("Updates work in the installed app", "Not in Expo Go or the browser");
    const check = await Updates.checkForUpdateAsync();
    if (!check.isAvailable) return info("You have the latest version");
    info("Downloading update…");
    await Updates.fetchUpdateAsync();
    await Updates.reloadAsync();
  };

  return (
    <Screen>
      <AppBar title="Settings" leading="back" />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: insets.bottom + 32 }}
        keyboardShouldPersistTaps="handled"
      >
        <Group title="TMDB key">
          <Text className="text-[14px] leading-5 text-muted">
            A free TMDB key adds streaming services for your country, ratings, trailers and a
            trending list. Without one the app uses free sources.
          </Text>
          <TextField
            icon={KeyRound}
            value={key}
            onChangeText={setKey}
            placeholder="Paste your TMDB API key"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
          {keyState === "bad" ? (
            <Text className="text-[13px] text-danger">
              TMDB says this key isn't valid. Copy the "API Key" or the long "Read Access Token".
            </Text>
          ) : null}
          {keyState === "offline" ? (
            <Text className="text-[13px] text-danger">
              Couldn't reach TMDB. Check your connection.
            </Text>
          ) : null}
          <View className="flex-row gap-2.5">
            <Button
              className="flex-1"
              tone="primary"
              label="Save key"
              loading={keyState === "checking"}
              onPress={() => void saveKey()}
            />
            <Button
              className="flex-1"
              label="Get a key"
              onPress={() => void Linking.openURL("https://www.themoviedb.org/settings/api")}
            />
          </View>
        </Group>

        <Group title="Where to watch (country)">
          <ChoiceChips
            options={REGIONS}
            value={settings.region}
            onChange={(region) => setSettings({ ...settings, region })}
          />
        </Group>

        <Group title="Sort my list by">
          <ChoiceChips
            options={SORT_LABELS}
            value={settings.sort}
            onChange={(sort) => setSettings({ ...settings, sort })}
          />
        </Group>

        <Group title="Title language">
          <ChoiceChips
            options={{ "en-US": "English", "he-IL": "עברית" }}
            value={settings.lang}
            onChange={(lang) => setSettings({ ...settings, lang })}
          />
        </Group>

        <Group title="Your data">
          <Text className="text-[14px] leading-5 text-muted">
            Your list lives on this phone. Import a backup from the old Watchlist website (Settings
            ▸ Export backup there) or from this app.
          </Text>
          <View className="flex-row gap-2.5">
            <Button
              className="flex-1"
              icon={Download}
              label="Import"
              onPress={() => void importBackup()}
            />
            <Button
              className="flex-1"
              icon={Upload}
              label="Export"
              onPress={() =>
                void shareBackup(list, deleted).then((ok) => {
                  if (!ok) info("Export works in the installed app");
                })
              }
            />
          </View>
        </Group>

        <Group title="App">
          <Text className="text-[14px] leading-5 text-muted">
            {Updates.isEnabled
              ? `Channel ${Updates.channel ?? "default"} · update ${Updates.updateId?.slice(0, 8) ?? "built-in"}. New versions download on their own.`
              : "Running in development. The installed app updates itself."}
          </Text>
          <Button
            icon={RefreshCw}
            label="Check for updates now"
            onPress={() => void checkUpdates()}
          />
        </Group>
      </ScrollView>
    </Screen>
  );
}
