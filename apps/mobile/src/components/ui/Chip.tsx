import { Pressable, Text, View } from "react-native";

import { cn } from "../../lib/cn";

export interface ChipProps {
  readonly label: string;
  /** Colored dot before the label. */
  readonly dot?: string;
  /** Dimmed trailing text, e.g. a percentage. */
  readonly trailing?: string;
  readonly selected?: boolean;
  /** Faded while something else is selected. */
  readonly dimmed?: boolean;
  /** Without it the chip is a plain tag. */
  readonly onPress?: () => void;
}

/** Small rounded pill: a tappable suggestion, filter or legend entry. */
export function Chip({ label, dot, trailing, selected, dimmed, onPress }: ChipProps) {
  const body = (
    <>
      {dot ? <View className="size-2 rounded-full" style={{ backgroundColor: dot }} /> : null}
      <Text className={cn("text-[14px]", selected ? "font-semibold text-on-primary" : "text-ink")}>
        {label}
      </Text>
      {trailing ? (
        <Text className={cn("text-[13px]", selected ? "text-on-primary" : "text-muted")}>
          {trailing}
        </Text>
      ) : null}
    </>
  );
  const box = cn(
    "min-h-10 flex-row items-center gap-2 rounded-full border px-3.5",
    selected ? "border-primary bg-primary" : "border-line bg-surface-2",
    dimmed && "opacity-45",
  );
  if (!onPress) return <View className={box}>{body}</View>;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      onPress={onPress}
      className={cn(box, "active:opacity-70")}
    >
      {body}
    </Pressable>
  );
}
