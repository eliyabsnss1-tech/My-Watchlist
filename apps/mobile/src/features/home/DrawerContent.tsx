import type { DrawerContentComponentProps } from "@react-navigation/drawer";
import { House, type LucideIcon } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "../../components/ui/AppText";
import { cn } from "../../lib/cn";
import { SECTIONS } from "../../sections";

function Item({
  label,
  icon: Icon,
  color,
  active,
  onPress,
}: {
  readonly label: string;
  readonly icon: LucideIcon;
  readonly color: string;
  readonly active: boolean;
  readonly onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      className={cn(
        "h-14 flex-row items-center gap-3.5 rounded-2xl px-3 active:opacity-80",
        active && "bg-surface-3",
      )}
    >
      <View
        style={{ backgroundColor: color }}
        className="size-9 items-center justify-center rounded-xl"
      >
        <Icon size={20} color="#ffffff" strokeWidth={2.2} />
      </View>
      <Text className="text-[16px] font-semibold text-ink">{label}</Text>
    </Pressable>
  );
}

export function DrawerContent({ state, navigation }: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets();
  const current = state.routes[state.index]?.name;
  const go = (route: "Home" | "Watchlist" | "ElementScope") => {
    navigation.navigate(route);
    navigation.closeDrawer();
  };
  return (
    <ScrollView
      contentContainerStyle={{
        paddingTop: insets.top + 20,
        paddingHorizontal: 12,
        paddingBottom: 24,
      }}
    >
      <AppText variant="title" className="mb-4 px-3">
        My apps
      </AppText>
      <Item
        label="Home"
        icon={House}
        color="#3a4f86"
        active={current === "Home"}
        onPress={() => go("Home")}
      />
      <AppText variant="overline" className="mb-2 mt-5 px-3">
        Apps
      </AppText>
      <View className="gap-1">
        {SECTIONS.map((s) => (
          <Item
            key={s.route}
            label={s.title}
            icon={s.icon}
            color={s.gradient[1]}
            active={current === s.route}
            onPress={() => go(s.route)}
          />
        ))}
      </View>
    </ScrollView>
  );
}
