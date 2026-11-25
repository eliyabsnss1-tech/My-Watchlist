import { useAtom } from "@effect/atom-react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { Button } from "../../components/ui/Button";
import { Chip } from "../../components/ui/Chip";
import { haptic } from "../../lib/haptics";
import * as Engine from "./engine";
import { Note } from "./parts";
import { selectionAtom, toggleSelection, type Selection } from "./state";
import { highlight, SvgMarkup } from "./SvgMarkup";

export interface StructureModelProps {
  readonly result: Engine.Analysis;
  readonly prepared: Engine.Prepared;
  readonly onOpenElement: (sym: string) => void;
}

export const share = (prepared: Engine.Prepared, c: Engine.Component): number =>
  (prepared.key === "atomPct" ? c.atomPct : c.pct) ?? c.pct;

export const ofWhat = (prepared: Engine.Prepared) =>
  prepared.key === "atomPct" ? "of all atoms" : "of the mass";

/** The structure picture, its legend, and what the current selection means. */
export function StructureModel({ result, prepared, onOpenElement }: StructureModelProps) {
  const [sel, setSel] = useAtom(selectionAtom);
  const { model } = prepared;
  const pick = (next: Selection) => {
    haptic("light");
    setSel((cur) => toggleSelection(cur, next));
  };
  const zoneOn = (z: Engine.Zone) =>
    sel.zone ? z.id === sel.zone : sel.el ? z.els.includes(sel.el) : false;
  const active = !!(sel.zone || sel.el);
  const flat = model.type === "field" || model.type === "bond";
  const numbered = model.type === "concentric" || model.type === "stack";
  const zone = sel.zone ? model.zones.find((z) => z.id === sel.zone) : undefined;
  const bonds = zone && model.type !== "bond" ? Engine.zoneBonds(prepared, result, zone.id) : [];

  return (
    <View>
      <SvgMarkup
        svg={highlight(prepared.svg, model, sel)}
        maxHeight={model.type === "bond" ? 300 : undefined}
      />
      {model.note ? <Note>{model.note}</Note> : null}

      <View className="mt-3 flex-row flex-wrap gap-2">
        {model.zones.map((z, i) => (
          <Chip
            key={z.id}
            label={`${numbered ? `${i + 1}. ` : ""}${z.name}`}
            {...(flat && z.color ? { dot: z.color } : {})}
            {...(flat && z.pc ? { trailing: z.pc } : {})}
            selected={active && zoneOn(z)}
            dimmed={active && !zoneOn(z)}
            onPress={() => pick({ zone: z.id, el: null })}
          />
        ))}
      </View>

      <Animated.View
        key={`${sel.zone}-${sel.el}`}
        entering={FadeIn.duration(260)}
        className="mt-3.5 min-h-17 rounded-[18px] bg-surface-2 px-4 py-3.5"
      >
        {zone ? (
          <>
            <Text className="text-[15px] font-semibold text-ink">{zone.name}</Text>
            {zone.desc ? (
              <Text className="mt-0.5 text-[14px] leading-[21px] text-muted">{zone.desc}</Text>
            ) : null}
            {zone.els.map((sym) => {
              const c = prepared.comp.find((x) => x.sym === sym);
              return c ? (
                <ElementLine
                  key={sym}
                  c={c}
                  prepared={prepared}
                  onPress={() => onOpenElement(sym)}
                />
              ) : null;
            })}
          </>
        ) : sel.el ? (
          <SelectedElement sym={sel.el} prepared={prepared} onOpenElement={onOpenElement} />
        ) : (
          <Text className="text-[14px] leading-[21px] text-muted">
            {model.type === "bond"
              ? "Tap an element chip to highlight it and see where it sits and why."
              : "Showing every part. Tap a part to zoom in on its atoms and bonds."}
          </Text>
        )}
      </Animated.View>

      {zone && bonds.length ? (
        <Animated.View entering={FadeIn.duration(320)} className="mt-5 border-t border-line pt-4">
          <Text className="mb-1.5 text-[12px] font-semibold uppercase tracking-[0.7px] text-muted">
            Atomic bonding · {zone.name}
          </Text>
          {bonds.map((b) => (
            <View key={b.title + b.note}>
              {b.title ? (
                <Text className="mt-3 text-[14px] font-semibold text-ink">{b.title}</Text>
              ) : null}
              <SvgMarkup svg={b.svg} maxHeight={230} />
              {b.note ? <Note>{b.note}</Note> : null}
            </View>
          ))}
        </Animated.View>
      ) : null}
    </View>
  );
}

function SelectedElement({
  sym,
  prepared,
  onOpenElement,
}: {
  readonly sym: string;
  readonly prepared: Engine.Prepared;
  readonly onOpenElement: (sym: string) => void;
}) {
  const c = prepared.comp.find((x) => x.sym === sym);
  if (!c) return null;
  const zones =
    prepared.model.kind === "atoms" ? [] : prepared.model.zones.filter((z) => z.els.includes(sym));
  return (
    <>
      <Text className="text-[14px] leading-[21px] text-muted">
        <Text className="font-semibold text-ink">{Engine.elementName(sym)}</Text> ·{" "}
        {Engine.fmtPct(share(prepared, c))} {ofWhat(prepared)}
        {zones.length ? `\nFound in: ${zones.map((z) => z.name).join(", ")}` : ""}
      </Text>
      <ElementLine c={c} prepared={prepared} onPress={() => onOpenElement(sym)} />
      <Button
        className="mt-3 self-start"
        tone="primary"
        label="Atom profile ›"
        onPress={() => onOpenElement(sym)}
      />
    </>
  );
}

/** Symbol badge, where it is, and its share; opens the element profile. */
export function ElementLine({
  c,
  prepared,
  onPress,
}: {
  readonly c: Engine.Component;
  readonly prepared: Engine.Prepared;
  readonly onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${Engine.elementName(c.sym)} profile`}
      onPress={onPress}
      className="mt-2.5 flex-row items-start gap-2.5 rounded-xl active:bg-surface-3"
    >
      <View
        className="min-w-8 items-center rounded-lg px-1 py-0.5"
        style={{ backgroundColor: c.color }}
      >
        <Text className="text-[13px] font-bold" style={{ color: Engine.txtCol(c.color) }}>
          {c.sym}
        </Text>
      </View>
      <View className="flex-1">
        <Text className="text-[14px] leading-[20px] text-ink">{c.where}</Text>
        {c.role ? (
          <Text className="mt-0.5 text-[14px] leading-[20px] text-muted">{c.role}</Text>
        ) : null}
      </View>
      <Text className="pl-2 text-[13px] font-semibold text-ink">
        {Engine.fmtPct(share(prepared, c))}
      </Text>
    </Pressable>
  );
}
