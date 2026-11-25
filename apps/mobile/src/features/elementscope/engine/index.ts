// The original "what is it made of?" engine from the ElementScope website: pure data and logic, no UI.
import { ELEMENTS } from "./core";

export * from "./core";
export type * from "./core";

export const elementName = (sym: string): string =>
  ELEMENTS.find((e) => e.sym === sym)?.name ?? sym;

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";

/** 12 → ¹², for isotope labels like ¹²C. */
export const superscript = (n: number): string =>
  String(n).replace(/\d/g, (d) => SUP[Number(d)] ?? d);

/** Plain-text title: formula titles come as "H<sub>2</sub>O"; turn subscripts into ₂ and drop other tags. */
export const plainTitle = (title: string): string =>
  title
    .replace(/<sub>(\d+)<\/sub>/g, (_, d: string) =>
      d.replace(/\d/g, (x) => "₀₁₂₃₄₅₆₇₈₉"[Number(x)] ?? x),
    )
    .replace(/<[^>]+>/g, "");
