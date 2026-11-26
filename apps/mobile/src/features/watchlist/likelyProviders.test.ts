import { assert, describe, it } from "@effect/vitest";

import { likelyProviders } from "./likelyProviders";

const disney = { provider_name: "Disney Plus", logo_path: "/d.png" };
const netflix = { provider_name: "Netflix", logo_path: "/n.png" };

describe("likely providers", () => {
  it("guesses an untracked service the title streams on almost everywhere (Hamilton, Israel)", () => {
    const byRegion = Object.fromEntries(
      Array.from({ length: 67 }, (_, i) => [`R${i}`, { flatrate: [disney] }]),
    );
    const likely = likelyProviders(byRegion, "IL", new Set(["Netflix", "Apple TV"]));
    assert.deepStrictEqual(likely, [["Disney Plus", "/d.png"]]);
  });

  it("never guesses a service tracked in the region, nor one that streams it in few countries", () => {
    const byRegion = Object.fromEntries([
      ...Array.from({ length: 30 }, (_, i) => [`A${i}`, { flatrate: [netflix] }]),
      ...Array.from({ length: 3 }, (_, i) => [`B${i}`, { flatrate: [disney] }]),
    ]);
    assert.deepStrictEqual(likelyProviders(byRegion, "IL", new Set(["Netflix"])), []);
  });
});
