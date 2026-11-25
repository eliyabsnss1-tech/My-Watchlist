import { Text, View } from "react-native";

import { AppText } from "../../components/ui/AppText";
import { Chip } from "../../components/ui/Chip";
import { colors } from "../../theme";
import * as Engine from "./engine";
import { Lines, Section, Stat, StatGrid } from "./parts";
import { SvgMarkup } from "./SvgMarkup";

const STATUS = {
  yes: { bg: "rgba(52, 211, 153, 0.15)", fg: colors.ok },
  part: { bg: "rgba(59, 124, 255, 0.18)", fg: colors.accent },
  decay: { bg: "rgba(255, 200, 87, 0.18)", fg: colors.star },
  no: { bg: "rgba(143, 162, 204, 0.16)", fg: colors.muted },
} as const;

export interface ParticleViewProps {
  readonly particle: Engine.Particle;
  readonly onSearch: (query: string) => void;
}

/** Unique names with a ×count when a name repeats (a proton is made of up, up, down). */
function counted(list: ReadonlyArray<string>): ReadonlyArray<readonly [string, number]> {
  const counts = new Map<string, number>();
  for (const n of list) counts.set(n, (counts.get(n) ?? 0) + 1);
  return [...counts];
}

function SearchChips({
  list,
  onSearch,
}: {
  readonly list: ReadonlyArray<string>;
  readonly onSearch: (q: string) => void;
}) {
  return (
    <View className="flex-row flex-wrap gap-2">
      {counted(list).map(([name, n]) => (
        <Chip
          key={name}
          label={name}
          {...(n > 1 ? { trailing: `×${n}` } : {})}
          onPress={() => onSearch(name)}
        />
      ))}
    </View>
  );
}

export function ParticleView({ particle: p, onSearch }: ParticleViewProps) {
  const status = STATUS[p.atoms];
  const svg = Engine.particleSvg(p);
  const counts = Engine.particleCounts(p);
  const props = [
    p.q ? (["Charge (e)", p.q] as const) : null,
    p.sp ? (["Spin", p.sp] as const) : null,
    p.m ? (["Mass", p.m] as const) : null,
    p.kg ? (["In kilograms", p.kg] as const) : null,
  ].filter((x) => x !== null);
  const wide = [
    p.life ? (["Lifetime", p.life] as const) : null,
    p.disc ? (["Discovered", p.disc] as const) : null,
  ].filter((x) => x !== null);

  return (
    <View>
      <AppText variant="caption">
        {p.family ? "Particle type" : "Subatomic particle"}
        {p.fam ? ` · ${p.fam}` : ""}
      </AppText>
      <Text className="mb-2 mt-1.5 text-[28px] font-semibold leading-[33px] tracking-tight text-ink">
        {p.name}
        {p.sym ? <Text className="text-[16px] font-normal text-muted">{`   ${p.sym}`}</Text> : null}
      </Text>
      <Text className="text-[15px] leading-[23px] text-muted">{p.sum}</Text>
      <View
        className="mt-2.5 flex-row items-center gap-2 self-start rounded-full px-3.5 py-2"
        style={{ backgroundColor: status.bg }}
      >
        <View className="size-2 rounded-full" style={{ backgroundColor: status.fg }} />
        <Text className="text-[13px] font-semibold" style={{ color: status.fg }}>
          {p.status}
        </Text>
      </View>

      <Section
        title={
          p.atoms === "yes" || p.atoms === "part" ? "Where it is in an atom" : "Is it in atoms?"
        }
      >
        {svg ? <SvgMarkup svg={svg} maxHeight={290} /> : null}
        <Text className="mt-2 text-[15px] leading-[23px] text-muted">{p.where}</Text>
      </Section>

      {p.tags?.length ? (
        <Section title={p.atoms === "yes" ? "Also found in" : "Where it shows up"}>
          <View className="flex-row flex-wrap gap-2">
            {p.tags.map((t) => (
              <Chip key={t} label={t} />
            ))}
          </View>
        </Section>
      ) : null}
      {p.members?.length ? (
        <Section title="Includes">
          <SearchChips list={p.members} onSearch={onSearch} />
        </Section>
      ) : null}
      {p.made?.length ? (
        <Section title="Made of">
          <SearchChips list={p.made} onSearch={onSearch} />
        </Section>
      ) : null}

      {props.length || wide.length ? (
        <Section title="Properties">
          <StatGrid>
            {props.map(([label, value]) => (
              <Stat key={label} label={label} value={value} per={2} />
            ))}
            {wide.map(([label, value]) => (
              <Stat key={label} label={label} value={value} per={1} />
            ))}
          </StatGrid>
        </Section>
      ) : null}

      {counts ? (
        <Section title="How many in an atom">
          <AppText variant="caption" className="-mt-1 mb-1.5">
            {counts.eq}
          </AppText>
          {counts.rows.map((row) => (
            <View
              key={row.atom}
              className="flex-row justify-between gap-3 border-t border-line py-3"
            >
              <Text className="text-[15px] text-muted">{row.atom}</Text>
              <Text className="text-right text-[15px] font-semibold text-ink">{row.value}</Text>
            </View>
          ))}
        </Section>
      ) : null}

      {p.facts?.length ? (
        <Section title="Good to know">
          <Lines items={p.facts} />
        </Section>
      ) : null}
      {p.rel?.length ? (
        <Section title="Related">
          <SearchChips list={p.rel} onSearch={onSearch} />
        </Section>
      ) : null}
    </View>
  );
}
