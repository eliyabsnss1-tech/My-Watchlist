import { assert, describe, it } from "@effect/vitest";

import { elementProfile, plainTitle, prepareResult, resolve } from "./index";

describe("elementscope engine", () => {
  it("computes exact formula percentages", () => {
    const r = resolve("H2O");
    assert.isTrue(!!r && !r.unrecognized && !r.particle);
    if (!r || r.unrecognized || r.particle) return;
    const o = r.comp.find((c) => c.sym === "O");
    assert.closeTo(o?.pct ?? 0, 88.8, 0.1);
  });

  it("resolves objects, names, elements, particles and Hebrew", () => {
    const kinds = ["smartphone", "sodium chloride", "gold", "electron", "מים", "xyzzy"].map((q) => {
      const r = resolve(q);
      return !r ? "none" : r.unrecognized ? "unrecognized" : r.particle ? "particle" : "analysis";
    });
    assert.deepStrictEqual(kinds, [
      "analysis",
      "analysis",
      "analysis",
      "particle",
      "analysis",
      "unrecognized",
    ]);
  });

  it("builds a layered model for devices and a profile for elements", () => {
    const r = resolve("smartphone");
    if (!r || r.unrecognized || r.particle) return assert.fail("expected an analysis");
    const p = prepareResult(r, "mass");
    assert.strictEqual(p.model.type, "stack");
    assert.isTrue(p.svg.startsWith("<svg"));
    assert.strictEqual(elementProfile("Au")?.config, "[Xe] 4f¹⁴ 5d¹⁰ 6s¹");
    assert.strictEqual(elementProfile("Br")?.state, "liquid");
    assert.strictEqual(plainTitle("H<sub>2</sub>O"), "H₂O");
  });
});
