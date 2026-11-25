import { useNavigation, type NavigationProp, type ParamListBase } from "@react-navigation/native";
import { ChevronLeft, Menu } from "lucide-react-native";
import type { ReactNode } from "react";
import { View } from "react-native";

import { AppText } from "./AppText";
import { IconButton } from "./IconButton";

interface DrawerLike extends NavigationProp<ParamListBase> {
  openDrawer?: () => void;
}

export interface AppBarProps {
  readonly title: string;
  /** `menu` opens the side menu; `back` pops the current screen. */
  readonly leading?: "menu" | "back";
  readonly actions?: ReactNode;
}

function findDrawer(nav: DrawerLike | undefined): DrawerLike | undefined {
  let current = nav;
  while (current) {
    if (typeof current.openDrawer === "function") return current;
    current = current.getParent() as DrawerLike | undefined;
  }
  return undefined;
}

export function AppBar({ title, leading = "menu", actions }: AppBarProps) {
  const navigation = useNavigation<DrawerLike>();
  return (
    <View className="flex-row items-center gap-3 px-4 pb-2 pt-2">
      {leading === "menu" ? (
        <IconButton
          icon={Menu}
          label="Open menu"
          onPress={() => findDrawer(navigation)?.openDrawer?.()}
        />
      ) : (
        <IconButton icon={ChevronLeft} label="Back" onPress={() => navigation.goBack()} />
      )}
      <AppText variant="title" numberOfLines={1} className="flex-1">
        {title}
      </AppText>
      {actions ? <View className="flex-row gap-2">{actions}</View> : null}
    </View>
  );
}
