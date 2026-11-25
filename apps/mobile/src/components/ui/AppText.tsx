import { Text, type TextProps } from "react-native";

import { cn } from "../../lib/cn";

const VARIANTS = {
  display: "text-[34px] leading-[40px] font-bold text-ink tracking-tight",
  title: "text-[26px] leading-[32px] font-bold text-ink tracking-tight",
  heading: "text-[19px] leading-[25px] font-semibold text-ink",
  body: "text-[15px] leading-[22px] text-ink",
  label: "text-[15px] leading-[20px] font-semibold text-ink",
  caption: "text-[13px] leading-[18px] text-muted",
  overline: "text-[12px] leading-[16px] font-semibold uppercase tracking-[0.8px] text-muted",
} as const;

export interface AppTextProps extends TextProps {
  readonly variant?: keyof typeof VARIANTS;
}

export function AppText({ variant = "body", className, ...props }: AppTextProps) {
  return <Text {...props} className={cn(VARIANTS[variant], className)} />;
}
