import { View, type ViewProps } from "react-native";

import { cn } from "../../lib/cn";

const TONES = {
  card: "bg-surface rounded-3xl p-4",
  inset: "bg-surface-2 rounded-2xl p-3",
  outline: "bg-surface rounded-3xl p-4 border border-line",
} as const;

export interface SurfaceProps extends ViewProps {
  readonly tone?: keyof typeof TONES;
}

/** A rounded panel. `className` is for layout (margin, flex, gap) only. */
export function Surface({ tone = "card", className, ...props }: SurfaceProps) {
  return <View {...props} className={cn(TONES[tone], className)} />;
}
