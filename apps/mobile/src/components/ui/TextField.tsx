import type { LucideIcon } from "lucide-react-native";
import { TextInput, View, type TextInputProps } from "react-native";

import { cn } from "../../lib/cn";
import { colors } from "../../theme";

export interface TextFieldProps extends Omit<TextInputProps, "className" | "style"> {
  readonly icon?: LucideIcon;
  /** Layout only. */
  readonly className?: string;
}

export function TextField({ icon: Icon, className, ...props }: TextFieldProps) {
  return (
    <View
      className={cn("h-13 flex-row items-center gap-3 rounded-full bg-surface-2 px-4", className)}
    >
      {Icon ? <Icon size={20} color={colors.muted} strokeWidth={2.2} /> : null}
      <TextInput
        placeholderTextColor={colors.muted}
        selectionColor={colors.primary}
        className="h-full flex-1 text-[16px] text-ink"
        {...props}
      />
    </View>
  );
}
