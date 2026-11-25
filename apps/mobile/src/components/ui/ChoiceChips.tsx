import { Pressable, Text, View } from "react-native";

import { cn } from "../../lib/cn";

export interface ChoiceChipsProps<T extends string> {
  readonly options: Readonly<Record<T, string>>;
  readonly value: T;
  readonly onChange: (value: T) => void;
}

export function ChoiceChips<T extends string>({ options, value, onChange }: ChoiceChipsProps<T>) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {(Object.keys(options) as Array<T>).map((k) => {
        const on = k === value;
        return (
          <Pressable
            key={k}
            accessibilityRole="radio"
            accessibilityState={{ selected: on }}
            onPress={() => onChange(k)}
            className={cn(
              "h-10 justify-center rounded-full px-4",
              on ? "bg-primary" : "bg-surface-2",
            )}
          >
            <Text
              className={cn("text-[14px] font-semibold", on ? "text-on-primary" : "text-muted")}
            >
              {options[k]}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
