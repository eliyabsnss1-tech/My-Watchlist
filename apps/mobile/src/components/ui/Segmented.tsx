import { Pressable, Text, View } from "react-native";

import { cn } from "../../lib/cn";

export interface SegmentedOption<T extends string> {
  readonly value: T;
  readonly label: string;
}

export interface SegmentedProps<T extends string> {
  readonly options: ReadonlyArray<SegmentedOption<T>>;
  readonly value: T;
  readonly onChange: (value: T) => void;
  /** Layout only. */
  readonly className?: string;
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className,
}: SegmentedProps<T>) {
  return (
    <View className={cn("flex-row rounded-full bg-surface p-1", className)}>
      {options.map((o) => {
        const on = o.value === value;
        return (
          <Pressable
            key={o.value}
            accessibilityRole="tab"
            accessibilityState={{ selected: on }}
            onPress={() => onChange(o.value)}
            className={cn(
              "h-10 flex-1 items-center justify-center rounded-full",
              on && "bg-primary",
            )}
          >
            <Text
              className={cn("text-[14px] font-semibold", on ? "text-on-primary" : "text-muted")}
            >
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
