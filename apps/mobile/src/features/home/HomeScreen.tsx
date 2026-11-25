import { useAtomValue } from "@effect/atom-react";
import { useNavigation, type NavigationProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, Text, View } from "react-native";

import { AppBar } from "../../components/ui/AppBar";
import { AppText } from "../../components/ui/AppText";
import { Screen } from "../../components/ui/Screen";
import type { RootParamList } from "../../navigation-types";
import { SECTIONS, type Section } from "../../sections";
import { listAtom } from "../watchlist/state";

function greeting(hour: number): string {
  if (hour < 5) return "Good night";
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function Tile({
  section,
  subtitle,
  onPress,
}: {
  readonly section: Section;
  readonly subtitle: string;
  readonly onPress: () => void;
}) {
  const Icon = section.icon;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${section.title}`}
      onPress={onPress}
      className="flex-1 active:opacity-90"
    >
      <LinearGradient
        colors={section.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ borderRadius: 28, padding: 16, minHeight: 196, justifyContent: "space-between" }}
      >
        <View className="size-12 items-center justify-center rounded-2xl bg-white/20">
          <Icon size={26} color="#ffffff" strokeWidth={2.2} />
        </View>
        <View>
          <Text numberOfLines={1} className="text-[20px] font-bold text-white">
            {section.title}
          </Text>
          <Text numberOfLines={2} className="mt-1 text-[13px] leading-[18px] text-white/80">
            {subtitle}
          </Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp<RootParamList>>();
  const list = useAtomValue(listAtom);
  const toWatch = list.filter((x) => !x.watched).length;
  const subtitle = (s: Section) =>
    s.route === "Watchlist" && list.length
      ? `${toWatch} to watch · ${list.length - toWatch} watched`
      : s.description;
  const rows: Array<Array<Section>> = [];
  for (let i = 0; i < SECTIONS.length; i += 2) rows.push(SECTIONS.slice(i, i + 2));
  const hour = Number(
    new Intl.DateTimeFormat("en-US", { hour: "numeric", hourCycle: "h23" }).format(),
  );

  return (
    <Screen>
      <AppBar title="Home" />
      <ScrollView contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}>
        <AppText variant="caption" className="mb-4 px-1 text-[15px]">
          {greeting(hour)}
        </AppText>
        <View className="gap-3">
          {rows.map((row) => (
            <View key={row.map((s) => s.route).join("-")} className="flex-row gap-3">
              {row.map((s) => (
                <Tile
                  key={s.route}
                  section={s}
                  subtitle={subtitle(s)}
                  onPress={() => navigation.navigate(s.route)}
                />
              ))}
              {row.length === 1 ? <View className="flex-1" /> : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </Screen>
  );
}
