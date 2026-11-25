export interface Component {
  readonly sym: string;
  /** Percent of the mass. */
  readonly pct: number;
  /** Percent of all atoms, when known. */
  readonly atomPct?: number;
  readonly where: string;
  readonly role?: string;
  readonly color: string;
}

export interface Particle {
  readonly name: string;
  readonly sym?: string;
  readonly fam?: string;
  readonly family?: boolean;
  readonly sum: string;
  readonly status: string;
  readonly atoms: "yes" | "part" | "decay" | "no";
  readonly svg?: string;
  readonly where: string;
  readonly tags?: ReadonlyArray<string>;
  readonly members?: ReadonlyArray<string>;
  readonly made?: ReadonlyArray<string>;
  readonly rel?: ReadonlyArray<string>;
  readonly facts?: ReadonlyArray<string>;
  readonly q?: string;
  readonly sp?: string;
  readonly m?: string;
  readonly kg?: string;
  readonly life?: string;
  readonly disc?: string;
  readonly cnt?: string;
}

export interface Analysis {
  readonly title: string;
  readonly titleHtml?: boolean;
  readonly label?: string;
  readonly badge: { readonly t: string; readonly c: string };
  readonly summary?: string;
  readonly interp?: string;
  readonly mass?: number;
  readonly basis?: { readonly k: "calc" | "typical" | "guess"; readonly t: string };
  readonly estimate?: boolean;
  readonly comp: ReadonlyArray<Component>;
  readonly hasAtoms?: boolean;
  readonly arrange?: string;
  readonly notes: ReadonlyArray<{ readonly cls: string; readonly text: string }>;
  readonly how?: ReadonlyArray<string>;
  readonly particle?: undefined;
  readonly unrecognized?: undefined;
}

export interface ParticleResult {
  readonly particle: Particle;
  readonly title: string;
  readonly unrecognized?: undefined;
}

export interface Unrecognized {
  readonly unrecognized: true;
  readonly query: string;
  readonly suggest: ReadonlyArray<{ readonly q: string; readonly t: string }>;
  readonly particle?: undefined;
}

export type Resolved = Analysis | ParticleResult | Unrecognized;

export interface Zone {
  readonly id: string;
  readonly name: string;
  readonly desc?: string;
  readonly els: ReadonlyArray<string>;
  readonly pc?: string;
  readonly color?: string | null;
}

export interface Model {
  readonly type: "bond" | "concentric" | "stack" | "phases" | "field";
  readonly kind?: "atoms" | "mix";
  readonly note: string;
  readonly zones: ReadonlyArray<Zone>;
}

export interface Prepared {
  readonly key: "pct" | "atomPct";
  readonly comp: ReadonlyArray<Component>;
  readonly model: Model;
  /** Main structure picture (SVG markup, still using --theme variables). */
  readonly svg: string;
}

export interface BondPicture {
  readonly title: string;
  readonly svg: string;
  readonly note: string;
}

export interface ElementProfile {
  readonly z: number;
  readonly sym: string;
  readonly name: string;
  readonly mass: number;
  readonly category: string;
  readonly color: string;
  readonly state: string;
  readonly info: string;
  readonly massNumber: number;
  readonly neutrons: number;
  readonly group: string;
  readonly period: number;
  readonly shells: ReadonlyArray<number>;
  readonly outer: number;
  readonly config: string;
  readonly nobleGas: boolean;
  readonly upQuarks: number;
  readonly downQuarks: number;
  readonly stable: boolean;
  readonly isotopes: ReadonlyArray<{ readonly mass: number; readonly pct: number }>;
  readonly isotopeNote: string;
  readonly bohrSvg: string;
  readonly quarkSvgs: { readonly p: string; readonly n: string; readonly e: string };
}

export interface Theme {
  readonly ink: string;
  readonly mute: string;
  readonly line: string;
  readonly soft: string;
  readonly card: string;
  readonly accent: string;
}

export declare function resolve(query: string): Resolved | null;
export declare function prepareResult(r: Analysis, mode: "mass" | "atoms"): Prepared;
export declare function zoneBonds(
  prepared: Prepared,
  r: Analysis,
  zoneId: string,
): ReadonlyArray<BondPicture>;
export declare function elementProfile(sym: string): ElementProfile | null;
export declare function particleCounts(p: Particle): {
  readonly eq: string;
  readonly rows: ReadonlyArray<{ readonly atom: string; readonly value: string }>;
} | null;
export declare function particleSvg(p: Particle): string;
export declare function setTheme(theme: Partial<Theme>): void;
export declare function themeSvg(svg: string): string;
export declare function fmtPct(pct: number): string;
export declare function pctS(pct: number): string;
export declare function txtCol(hex: string): string;
export declare function subTxt(formula: string): string;
export declare const SUGGESTIONS: ReadonlyArray<readonly [string, ReadonlyArray<string>]>;
export declare const TRACE: string;
export declare const ELEMENTS: ReadonlyArray<{
  readonly z: number;
  readonly sym: string;
  readonly name: string;
  readonly cat: string;
  readonly mass: number;
}>;
export declare const CAT: Readonly<Record<string, { readonly n: string; readonly c: string }>>;
