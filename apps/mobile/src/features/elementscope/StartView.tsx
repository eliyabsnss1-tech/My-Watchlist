import { useAtom } from "@effect/atom-react";
import { Pressable, Text, View } from "react-native";

import { Chip } from "../../components/ui/Chip";
import * as Engine from "./engine";
import { Lines, Section } from "./parts";
import { recentAtom } from "./state";

const Title = ({ children }: { readonly children: string }) => (
  <Text className="mb-2.5 text-[30px] font-semibold leading-[36px] tracking-tight text-ink">
    {children}
  </Text>
);

export function StartView({ onSearch }: { readonly onSearch: (query: string) => void }) {
  const [recent, setRecent] = useAtom(recentAtom);
  return (
    <View>
      <Title>What is it made of?</Title>
      <Text className="text-[15px] leading-[23px] text-muted">
        Search any material, object, liquid, gas, formula, device or particle to see what it is made
        of and where each part sits.
      </Text>
      {recent.length ? (
        <Section
          title="Recent"
          right={
            <Pressable accessibilityRole="button" onPress={() => setRecent([])} hitSlop={10}>
              <Text className="text-[13px] font-semibold text-accent">Clear</Text>
            </Pressable>
          }
        >
          <View className="flex-row flex-wrap gap-2">
            {recent.map((q) => (
              <Chip key={q} label={q} onPress={() => onSearch(q)} />
            ))}
          </View>
        </Section>
      ) : null}
      {Engine.SUGGESTIONS.map(([group, items]) => (
        <Section key={group} title={group}>
          <View className="flex-row flex-wrap gap-2">
            {items.map((q) => (
              <Chip key={q} label={q} onPress={() => onSearch(q)} />
            ))}
          </View>
        </Section>
      ))}
    </View>
  );
}

export function UnrecognizedView({
  result,
  onSearch,
}: {
  readonly result: Engine.Unrecognized;
  readonly onSearch: (query: string) => void;
}) {
  return (
    <View>
      <Text className="text-[13px] text-muted">No match</Text>
      <Title>{`Couldn’t recognize “${result.query}”`}</Title>
      <Text className="text-[15px] leading-[23px] text-muted">
        ElementScope only shows a breakdown when it can match a known item, element, compound or
        chemical formula. It won’t guess.
      </Text>
      {result.suggest.length ? (
        <Section title="Did you mean">
          <View className="flex-row flex-wrap gap-2">
            {result.suggest.map((s) => (
              <Chip key={s.q} label={s.t} onPress={() => onSearch(s.q)} />
            ))}
          </View>
        </Section>
      ) : null}
      <Section title="Try instead">
        <Lines
          items={[
            "A more common name, like “granite”, “banana” or “stainless steel”",
            "A chemical formula, like H2O, NaCl or C6H12O6",
            "A basic material, food or object, like “glass”, “honey” or “smartphone”",
          ]}
        />
      </Section>
    </View>
  );
}
