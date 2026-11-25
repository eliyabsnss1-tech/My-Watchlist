import type { LucideIcon } from "lucide-react-native";
import { View } from "react-native";

import { colors } from "../../theme";
import { AppText } from "./AppText";

export interface EmptyStateProps {
  readonly icon: LucideIcon;
  readonly title: string;
  readonly body?: string;
}

export function EmptyState({ icon: Icon, title, body }: EmptyStateProps) {
  return (
    <View className="items-center px-8 py-14">
      <View className="mb-4 size-16 items-center justify-center rounded-3xl bg-surface-2">
        <Icon size={30} color={colors.accent} strokeWidth={2} />
      </View>
      <AppText variant="heading" className="text-center">
        {title}
      </AppText>
      {body ? (
        <AppText variant="caption" className="mt-1.5 text-center">
          {body}
        </AppText>
      ) : null}
    </View>
  );
}
