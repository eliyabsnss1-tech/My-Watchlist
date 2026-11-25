import { View } from "react-native";
import { SvgCss } from "react-native-svg/css";

import { colors } from "../../theme";
import type { Model } from "./engine";
import type { Selection } from "./state";

// The engine draws with CSS classes and var(--x) colors, like the original website.
// SvgCss inlines this stylesheet, so the pictures keep their look in the app's deep blue.
const VARS = {
  ink: colors.ink,
  mute: colors.muted,
  line: colors.line,
  soft: colors.surface2,
  card: colors.surface,
  accent: colors.primary,
};

const CSS = `
.zn{fill:${colors.accent};stroke:${VARS.line};stroke-width:1}
.zn.on{stroke:${VARS.accent};stroke-width:2.5}
.zn.dim{opacity:.45}
.ch circle{stroke:${VARS.card};stroke-width:1.5}
.ch text{font-size:9px;font-weight:700}
.ch.on circle{stroke:${VARS.ink};stroke-width:2.5}
.ch.dim{opacity:.22}
.ch .pl{font-size:7px;font-weight:600;fill:${VARS.ink}}
.pl.h{opacity:0}
.ch.on .pl.h{opacity:1}
.zl{font-size:10.5px;font-weight:600;fill:${VARS.ink}}
.zb{font-size:9px;font-weight:600;fill:${VARS.mute}}
.eb{fill:${VARS.accent};opacity:.7}
.chg{font-size:8px;font-weight:700;fill:${VARS.ink}}
`;

const ENTITIES: Readonly<Record<string, string>> = {
  amp: "&",
  lt: "‹",
  gt: "›",
  quot: "”",
  "#39": "’",
};

const withTheme = (svg: string): string =>
  svg
    .replace(
      /var\(--(\w+)\)/g,
      (_, name: string) => VARS[name as keyof typeof VARS] ?? colors.muted,
    )
    // Inline styles carry web-only animations and per-label sizes; keep only the sizes,
    // as inline styles so they still win over the stylesheet.
    .replace(/ style="([^"]*)"/g, (_, style: string) => {
      const size = /font-size:\s*([\d.]+)px/.exec(style)?.[1];
      return size ? ` style="font-size:${size}px"` : "";
    })
    // The SVG parser here neither decodes entities nor accepts a bare "<" in labels like "<0.1%",
    // which browsers forgive. ‹ reads the same at label size.
    .replace(/<(?![a-zA-Z/!?])/g, "‹")
    .replace(/&(amp|lt|gt|quot|#39);/g, (_, e: string) => ENTITIES[e] ?? "")
    // Hooks for the website's click handling and screen readers; not SVG props in React Native.
    .replace(/ (?:data-[a-z]+|role|aria-label|tabindex)="[^"]*"/g, "")
    .replace(/(<svg[^>]*>)/, `$1<style>${CSS}</style>`);

/** Adds on/dim classes to model parts and atom chips, the way the website highlighted them. */
export function highlight(svg: string, model: Model, sel: Selection): string {
  if (!sel.zone && !sel.el) return svg;
  const zoneHas = (zone: string | undefined, el: string) =>
    !!zone && !!model.zones.find((z) => z.id === zone)?.els.includes(el);
  return svg.replace(
    /<(\w+) class="(zn|ch)"([^>]*)>/g,
    (_, tag: string, cls: string, rest: string) => {
      const attr = (name: string) => new RegExp(`data-${name}="([^"]*)"`).exec(rest)?.[1];
      let on: boolean;
      if (cls === "zn") {
        const zone = attr("zone");
        on = sel.zone ? zone === sel.zone : zoneHas(zone, sel.el ?? "");
      } else {
        const zin = attr("zin");
        const sym = attr("sym");
        if (sel.zone) on = zin === sel.zone;
        else on = sym ? sym === sel.el : zoneHas(zin, sel.el ?? "");
      }
      return `<${tag} class="${cls} ${on ? "on" : "dim"}"${rest}>`;
    },
  );
}

export interface SvgMarkupProps {
  readonly svg: string;
  /** Upper bound on the drawn height. */
  readonly maxHeight?: number | undefined;
  /** Layout only. */
  readonly className?: string;
}

/** Draws engine SVG markup at full width, keeping its aspect ratio. */
export function SvgMarkup({ svg, maxHeight, className }: SvgMarkupProps) {
  const box = /viewBox="[\d.\s-]*?([\d.]+)\s+([\d.]+)"/.exec(svg);
  const ratio = box ? Number(box[1]) / Number(box[2]) : 1;
  return (
    <View
      {...(className ? { className } : {})}
      style={{ width: "100%", aspectRatio: ratio, maxHeight, alignSelf: "center" }}
    >
      <SvgCss xml={withTheme(svg)} width="100%" height="100%" />
    </View>
  );
}
