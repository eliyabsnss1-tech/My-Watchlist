import type { LucideIcon } from "lucide-react-native";
import { ActivityIndicator, Pressable, Text } from "react-native";

import { cn } from "../../lib/cn";
import { colors } from "../../theme";

const TONES = {
  primary: { box: "bg-primary", text: "text-on-primary", icon: colors.onPrimary },
  secondary: { box: "bg-surface-2", text: "text-ink", icon: colors.ink },
  danger: { box: "bg-surface-2", text: "text-danger", icon: colors.danger },
  ghost: { box: "bg-transparent", text: "text-accent", icon: colors.accent },
  /** See-through, for buttons over a picture (a title page's poster backdrop). */
  glass: { box: "bg-white/12", text: "text-ink", icon: colors.ink },
  glassDanger: { box: "bg-white/12", text: "text-danger", icon: colors.danger },
} as const;

const SIZES = {
  md: { box: "h-12 px-5 gap-2", text: "text-[15px]", icon: 19 },
  lg: { box: "h-14 px-6 gap-2.5", text: "text-[16px]", icon: 21 },
} as const;

export interface ButtonProps {
  readonly label?: string;
  readonly icon?: LucideIcon;
  readonly tone?: keyof typeof TONES;
  readonly size?: keyof typeof SIZES;
  readonly loading?: boolean;
  readonly disabled?: boolean;
  readonly accessibilityLabel?: string;
  readonly onPress: () => void;
  /** Layout only (flex, width, margin). */
  readonly className?: string;
}

export function Button({
  label,
  icon: Icon,
  tone = "secondary",
  size = "md",
  loading,
  disabled,
  accessibilityLabel,
  onPress,
  className,
}: ButtonProps) {
  const t = TONES[tone];
  const s = SIZES[size];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      disabled={disabled || loading}
      onPress={onPress}
      className={cn(
        "flex-row items-center justify-center rounded-full active:opacity-80",
        t.box,
        s.box,
        (disabled || loading) && "opacity-50",
        className,
      )}
    >
      {loading ? (
        <ActivityIndicator color={t.icon} />
      ) : (
        <>
          {Icon ? <Icon size={s.icon} color={t.icon} strokeWidth={2.2} /> : null}
          {label ? <Text className={cn("font-semibold", t.text, s.text)}>{label}</Text> : null}
        </>
      )}
    </Pressable>
  );
}
