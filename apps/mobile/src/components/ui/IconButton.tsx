import type { LucideIcon } from "lucide-react-native";
import { Pressable } from "react-native";

import { cn } from "../../lib/cn";
import { colors } from "../../theme";

const TONES = {
  surface: { box: "bg-surface-2", icon: colors.ink },
  primary: { box: "bg-primary", icon: colors.onPrimary },
  ok: { box: "bg-ok", icon: "#032417" },
  quiet: { box: "bg-transparent", icon: colors.ink },
} as const;

const SIZES = {
  sm: { box: "size-10", icon: 19 },
  md: { box: "size-11", icon: 21 },
  lg: { box: "size-16", icon: 28 },
} as const;

export interface IconButtonProps {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly tone?: keyof typeof TONES;
  readonly size?: keyof typeof SIZES;
  readonly onPress: () => void;
  /** Layout only (position, margin). */
  readonly className?: string;
}

export function IconButton({
  icon: Icon,
  label,
  tone = "surface",
  size = "md",
  onPress,
  className,
}: IconButtonProps) {
  const t = TONES[tone];
  const s = SIZES[size];
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={6}
      onPress={onPress}
      className={cn(
        "items-center justify-center rounded-full active:opacity-75",
        t.box,
        s.box,
        className,
      )}
    >
      <Icon size={s.icon} color={t.icon} strokeWidth={2.2} />
    </Pressable>
  );
}
