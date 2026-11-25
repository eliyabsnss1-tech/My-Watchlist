import { useAtom, useAtomSet } from "@effect/atom-react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { AppText } from "../../components/ui/AppText";
import { Segmented } from "../../components/ui/Segmented";
import { cn } from "../../lib/cn";
import { colors } from "../../theme";
import * as Engine from "./engine";
import { Collapsible, Section } from "./parts";
import { modeAtom, NO_SELECTION, selectionAtom, showAllAtom, type Mode } from "./state";
import { share, StructureModel } from "./StructureModel";

const SHOW = 6;

const BASIS = {
  calc: { label: "Calculated", color: "#1f9d6b" },
  typical: { label: "Typical values", color: colors.primaryStrong },
  guess: { label: "Rough guess", color: "#c27a14" },
} as const;

export interface AnalysisViewProps {
  readonly result: Engine.Analysis;
  readonly prepared: Engine.Prepared;
  readonly onOpenElement: (sym: string) => void;
}

export function AnalysisView({ result: r, prepared, onOpenElement }: AnalysisViewProps) {
  const [mode, setMode] = useAtom(modeAtom);
  const [showAll, setShowAll] = useAtom(showAllAtom);
  const setSel = useAtomSet(selectionAtom);
  const comp = prepared.comp;
  const shown = showAll ? comp : comp.slice(0, SHOW);
  const traces = comp
    .filter((c) => c.color === Engine.TRACE)
    .reduce((t, c) => t + share(prepared, c), 0);
  const about = [...r.notes.map((n) => n.text), ...(r.how?.length ? [r.how.join("\n")] : [])];

  return (
    <View>
      <AppText variant="caption">
        {r.badge.t}
        {r.label ? ` · ${r.label}` : ""}
      </AppText>
      <Text className="mb-2 mt-1.5 text-[28px] font-semibold leading-[33px] tracking-tight text-ink">
        {Engine.plainTitle(r.title)}
      </Text>
      {r.summary ? (
        <Text className="text-[15px] leading-[23px] text-muted">{r.summary}</Text>
      ) : null}
      {r.interp ? (
        <AppText variant="caption" className="mt-2">
          {r.interp}
        </AppText>
      ) : null}
      {r.mass ? (
        <AppText variant="caption" className="mt-2">
          Molar mass {r.mass.toFixed(2)} g/mol
        </AppText>
      ) : null}
      {r.basis ? (
        <View className="mt-3 flex-row items-start gap-2.5 rounded-xl bg-surface-2 px-3 py-2.5">
          <View
            className="rounded-full px-2 py-0.5"
            style={{ backgroundColor: BASIS[r.basis.k].color }}
          >
            <Text className="text-[11px] font-semibold uppercase tracking-[0.4px] text-white">
              {BASIS[r.basis.k].label}
            </Text>
          </View>
          <Text className="flex-1 text-[13px] leading-[19px] text-muted">{r.basis.t}</Text>
        </View>
      ) : r.estimate ? (
        <Text className="mt-3 text-[13px] text-star">● Estimate based on typical composition</Text>
      ) : null}

      <Section
        title="Composition"
        right={
          r.hasAtoms ? (
            <Segmented<Mode>
              className="w-40"
              options={[
                { value: "mass", label: "Mass" },
                { value: "atoms", label: "Atoms" },
              ]}
              value={mode}
              onChange={(m) => {
                setMode(m);
                setSel(NO_SELECTION);
              }}
            />
          ) : null
        }
      >
        <View className="h-2.5 flex-row gap-0.5 overflow-hidden rounded-full bg-surface-2">
          {comp
            .filter((c) => c.color !== Engine.TRACE)
            .map((c) => (
              <Animated.View
                key={c.sym}
                entering={FadeIn.duration(500)}
                style={{ flexGrow: share(prepared, c), minWidth: 3, backgroundColor: c.color }}
              />
            ))}
          {traces > 0 ? (
            <View style={{ flexGrow: traces, minWidth: 3, backgroundColor: Engine.TRACE }} />
          ) : null}
        </View>
      </Section>

      <Section title="Structure model">
        <StructureModel result={r} prepared={prepared} onOpenElement={onOpenElement} />
      </Section>

      <Section title="Elements & location">
        <AppText variant="caption" className="-mt-1 mb-1">
          Tap an element for its full atomic profile.
        </AppText>
        {shown.map((c, i) => (
          <Pressable
            key={c.sym}
            accessibilityRole="button"
            accessibilityLabel={`Open ${Engine.elementName(c.sym)} profile`}
            onPress={() => onOpenElement(c.sym)}
            className={cn("py-3.5 active:opacity-70", i > 0 && "border-t border-line")}
          >
            <View className="flex-row items-center gap-2.5">
              <View className="size-2 rounded-full" style={{ backgroundColor: c.color }} />
              <Text className="w-9 text-[17px] font-bold text-ink">{c.sym}</Text>
              <Text className="flex-1 text-[16px] font-medium text-ink">
                {Engine.elementName(c.sym)}
              </Text>
              <Text className="text-[15px] font-semibold text-ink">
                {Engine.fmtPct(share(prepared, c))}
              </Text>
            </View>
            <Text numberOfLines={2} className="ml-16 mt-0.5 text-[14px] leading-[21px] text-muted">
              {c.where}
            </Text>
          </Pressable>
        ))}
        {comp.length > shown.length ? (
          <Pressable
            accessibilityRole="button"
            onPress={() => setShowAll(true)}
            className="mt-1.5 items-center rounded-2xl bg-surface-2 py-3.5 active:opacity-70"
          >
            <Text className="text-[14px] font-medium text-ink">
              Show {comp.length - shown.length} more element
              {comp.length - shown.length > 1 ? "s" : ""}
            </Text>
          </Pressable>
        ) : null}
      </Section>

      <View className="mt-7">
        {r.arrange ? (
          <Collapsible title="How the atoms are arranged">
            <Text className="text-[14px] leading-[22px] text-muted">{r.arrange}</Text>
          </Collapsible>
        ) : null}
        {about.length ? (
          <Collapsible title="About this result">
            {about.map((t) => (
              <Text key={t} className="text-[14px] leading-[22px] text-muted">
                {t}
              </Text>
            ))}
          </Collapsible>
        ) : null}
      </View>
    </View>
  );
}
