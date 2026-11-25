import { useAtomValue } from "@effect/atom-react";
import { useRoute, type RouteProp } from "@react-navigation/native";
import { Text, View } from "react-native";

import { Sheet } from "../../components/ui/Sheet";
import type { ElementScopeParamList } from "../../navigation-types";
import * as Engine from "./engine";
import { Note, Stat, StatGrid } from "./parts";
import { preparedAtom } from "./state";
import { ofWhat, share } from "./StructureModel";
import { SvgMarkup } from "./SvgMarkup";

const PROTON = "#ef6b6b";
const NEUTRON = "#8b93a7";

const H3 = ({ children }: { readonly children: string }) => (
  <Text className="mb-2.5 mt-7 text-[12.5px] font-semibold uppercase tracking-[0.75px] text-muted">
    {children}
  </Text>
);

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

const isoPct = (pct: number) => (pct >= 1 ? pct.toFixed(pct >= 10 ? 1 : 2) : String(pct));

export function ElementSheet() {
  const { sym } = useRoute<RouteProp<ElementScopeParamList, "Element">>().params;
  const prepared = useAtomValue(preparedAtom);
  const e = Engine.elementProfile(sym);
  if (!e) return <Sheet title="Unknown element">{null}</Sheet>;

  const item = prepared?.comp.find((c) => c.sym === sym);
  const ink = Engine.txtCol(/^#[0-9a-f]{6}$/i.test(e.color) ? e.color : "#888888");
  const isotopes = e.isotopes.slice(0, 6);
  const radioactive = e.z >= 84 || !e.stable;
  const facts = [
    {
      b: `${(3 * e.massNumber).toLocaleString("en-US")} quarks`,
      t: ` in the nucleus: ${e.upQuarks} up and ${e.downQuarks} down.`,
    },
    {
      b: "Gluons",
      t: " carry the strong force that glues quarks into protons and neutrons; the leftover strong force then holds the nucleus together against the protons’ electric repulsion. Only about 1% of a proton’s mass is quark rest mass; the rest is the energy of this binding.",
    },
    {
      b: "Mass:",
      t: " a proton is 1.00728 u, a neutron 1.00866 u, and an electron only 0.000549 u (about 1/1836 of a proton), so nearly all the atom’s mass sits in the tiny nucleus.",
    },
    {
      b: "Photons:",
      t: " when an electron drops to a lower shell it emits a photon. Every element has its own pattern of colours (its emission spectrum), which is how astronomers identify elements in stars.",
    },
    ...(radioactive
      ? [
          {
            b: "Radioactive decay:",
            t: " unstable nuclei change by emitting an alpha particle (2 protons + 2 neutrons), a beta particle (an electron or positron, with a neutrino, as a neutron turns into a proton or the reverse) or gamma-ray photons.",
          },
        ]
      : []),
  ];

  return (
    <Sheet>
      <View className="mb-4 flex-row items-center gap-4">
        <View
          className="size-[88px] items-center justify-center rounded-[22px]"
          style={{ backgroundColor: e.color }}
        >
          <Text
            className="absolute left-2.5 top-2 text-[12px] font-semibold"
            style={{ color: ink }}
          >
            {e.z}
          </Text>
          <Text className="text-[34px] font-bold tracking-tight" style={{ color: ink }}>
            {e.sym}
          </Text>
          <Text
            className="absolute inset-x-0 bottom-1.5 text-center text-[10.5px] font-medium"
            style={{ color: ink }}
          >
            {e.mass.toString().slice(0, 7)}
          </Text>
        </View>
        <View className="flex-1">
          <Text className="mb-1 text-[26px] font-semibold tracking-tight text-ink">{e.name}</Text>
          <View className="flex-row items-start gap-2">
            <View className="mt-1.5 size-2.5 rounded-full" style={{ backgroundColor: e.color }} />
            <Text className="flex-1 text-[14px] leading-[20px] text-muted">
              {e.category} · {e.state} at room temperature
            </Text>
          </View>
        </View>
      </View>

      {item && prepared ? (
        <View className="mb-3.5 rounded-[18px] bg-surface-2 px-4 py-3">
          <Text className="text-[14px] font-semibold leading-[21px] text-ink">
            In this item · {Engine.fmtPct(share(prepared, item))} {ofWhat(prepared)}
          </Text>
          <Text className="text-[14px] leading-[21px] text-ink">{item.where}</Text>
          {item.role ? (
            <Text className="mt-0.5 text-[14px] leading-[21px] text-muted">{item.role}</Text>
          ) : null}
        </View>
      ) : null}

      <Text className="mb-4 text-[15px] leading-[23px] text-muted">{e.info}</Text>

      <StatGrid>
        <Stat label="Atomic number" value={String(e.z)} />
        <Stat label="Atomic mass" value={`${e.mass} u`} />
        <Stat label="Protons" value={String(e.z)} />
        <Stat label={e.stable ? "Neutrons" : "Neutrons*"} value={String(e.neutrons)} />
        <Stat label="Electrons" value={String(e.z)} />
        <Stat label="Group · period" value={`${e.group} · ${e.period}`} />
      </StatGrid>
      <Note>
        Counts are for a neutral atom of the main isotope, {e.name}-{e.massNumber}
        {e.stable ? "" : `. ${e.name} has no stable isotope, so this is its longest-lived one`}.
        Atomic mass is the average over all natural isotopes, in atomic mass units (1 u ≈ 1.66×10⁻²⁷
        kg).
      </Note>

      <H3>Atomic structure</H3>
      <SvgMarkup svg={e.bohrSvg} maxHeight={300} />
      <View className="my-2 flex-row flex-wrap items-center justify-center gap-x-3 gap-y-1">
        {[
          [PROTON, "proton"],
          [NEUTRON, "neutron"],
          [e.color, "electron"],
        ].map(([color, label]) => (
          <View key={label} className="flex-row items-center gap-1.5">
            <View className="size-2.5 rounded-full" style={{ backgroundColor: color }} />
            <Text className="text-[13px] text-muted">{label}</Text>
          </View>
        ))}
        {e.massNumber > 56 ? (
          <Text className="text-[13px] text-muted">· nucleus shown scaled down</Text>
        ) : null}
      </View>
      <StatGrid>
        <Stat label="Electrons per shell" value={e.shells.join(" · ")} per={2} />
        <Stat label="Outer-shell electrons" value={String(e.outer)} per={2} />
        <Stat label="Electron configuration" value={e.config} per={1} />
      </StatGrid>
      <Note>
        Electrons occupy shells and subshells (s, p, d, f). The outermost electrons decide how the
        element bonds
        {e.nobleGas ? "; here the outer shell is full, so it barely reacts." : "."}
      </Note>

      <H3>Subatomic particles</H3>
      <View className="flex-row gap-2">
        {(
          [
            [e.quarkSvgs.p, plural(e.z, "proton"), "charge +1 · made of 2 up + 1 down quark"],
            [
              e.quarkSvgs.n,
              plural(e.neutrons, "neutron"),
              "charge 0 · made of 1 up + 2 down quarks",
            ],
            [e.quarkSvgs.e, plural(e.z, "electron"), "charge −1 · fundamental, no known parts"],
          ] as const
        ).map(([svg, title, caption]) => (
          <View
            key={caption}
            className="flex-1 items-center rounded-2xl bg-surface-2 px-1.5 pb-3 pt-2.5"
          >
            <View className="h-14 w-[72px]">
              <SvgMarkup svg={svg} />
            </View>
            <Text className="mt-0.5 text-center text-[14px] font-bold text-ink">{title}</Text>
            <Text className="mt-1 text-center text-[11px] leading-[15px] text-muted">
              {caption}
            </Text>
          </View>
        ))}
      </View>
      <View className="mt-3.5">
        {facts.map((f) => (
          <Text
            key={f.b}
            className="border-t border-line py-3 text-[14px] leading-[22px] text-muted"
          >
            <Text className="font-semibold text-ink">{f.b}</Text>
            {f.t}
          </Text>
        ))}
      </View>

      <H3>Isotopes</H3>
      <Note>
        Isotopes have the same number of protons ({e.z}) but different numbers of neutrons.
      </Note>
      {e.isotopes.length ? (
        <>
          {isotopes.map((iso) => (
            <View key={iso.mass} className="flex-row items-center gap-2.5 py-1.5">
              <Text className="w-14 text-[14px] font-semibold text-ink">
                {Engine.superscript(iso.mass)}
                {e.sym}
              </Text>
              <View className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2">
                <View
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(100, Math.max(iso.pct, 0.6))}%`,
                    backgroundColor: e.color,
                  }}
                />
              </View>
              <Text className="w-14 text-right text-[14px] text-ink">{isoPct(iso.pct)}%</Text>
              <Text className="w-9 text-[12.5px] text-muted">{iso.mass - e.z} n</Text>
            </View>
          ))}
          {e.isotopes.length > 6 ? (
            <Note>+ {e.isotopes.length - 6} rarer natural isotopes.</Note>
          ) : null}
          <Note>
            Natural isotopes: {e.isotopes.length}
            {e.isotopes.length === 1 ? " (every atom of this element in nature is identical)" : ""}.
          </Note>
        </>
      ) : (
        <Note>There are no stable isotopes: every isotope of {e.name} is radioactive.</Note>
      )}
      {e.isotopeNote ? (
        <Text className="mt-2 text-[15px] leading-[23px] text-muted">{e.isotopeNote}</Text>
      ) : null}
    </Sheet>
  );
}
