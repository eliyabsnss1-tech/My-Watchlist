import { useAtom, useAtomSet, useAtomValue } from "@effect/atom-react";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowRight, Search } from "lucide-react-native";
import { useRef } from "react";
import { Keyboard, ScrollView, Text, View, type ScrollViewInstance } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppBar } from "../../components/ui/AppBar";
import { IconButton } from "../../components/ui/IconButton";
import { Screen } from "../../components/ui/Screen";
import { TextField } from "../../components/ui/TextField";
import type { ElementScopeParamList } from "../../navigation-types";
import { AnalysisView } from "./AnalysisView";
import { ParticleView } from "./ParticleView";
import { StartView, UnrecognizedView } from "./StartView";
import { inputAtom, preparedAtom, queryAtom, resultAtom, searchAtom } from "./state";

export function ElementScopeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<ElementScopeParamList>>();
  const [input, setInput] = useAtom(inputAtom);
  const query = useAtomValue(queryAtom);
  const result = useAtomValue(resultAtom);
  const prepared = useAtomValue(preparedAtom);
  const search = useAtomSet(searchAtom);
  const scroll = useRef<ScrollViewInstance>(null);
  const insets = useSafeAreaInsets();

  const run = (q: string) => {
    Keyboard.dismiss();
    search(q);
    scroll.current?.scrollTo({ y: 0, animated: false });
  };
  const openElement = (sym: string) => navigation.navigate("Element", { sym });

  let body;
  if (!result) body = <StartView onSearch={run} />;
  else if (result.unrecognized) body = <UnrecognizedView result={result} onSearch={run} />;
  else if (result.particle) body = <ParticleView particle={result.particle} onSearch={run} />;
  else if (prepared)
    body = <AnalysisView result={result} prepared={prepared} onOpenElement={openElement} />;
  else
    body = (
      <Text className="text-[15px] leading-[23px] text-muted">
        Something went wrong with this one. Please try a different search.
      </Text>
    );

  return (
    <Screen>
      <AppBar title="ElementScope" />
      <View className="flex-row items-center gap-2 px-4 pb-3">
        <TextField
          className="flex-1"
          icon={Search}
          value={input}
          onChangeText={(text) => {
            setInput(text);
            if (!text.trim() && query) search("");
          }}
          onSubmitEditing={() => run(input)}
          placeholder="Try “smartphone”, “H2O” or “gold”"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          accessibilityLabel="What is it made of?"
        />
        <IconButton icon={ArrowRight} label="Search" tone="primary" onPress={() => run(input)} />
      </View>
      <ScrollView
        ref={scroll}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      >
        <Animated.View
          key={query}
          entering={FadeInDown.duration(420)}
          className="mx-4 rounded-[32px] bg-surface px-5 pb-6 pt-6"
        >
          {body}
        </Animated.View>
      </ScrollView>
    </Screen>
  );
}
