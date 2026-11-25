import "vite-plus/test/config";
import { defineConfig } from "vite-plus";

const IGNORED = [
  ".repos/**",
  "**/node_modules/**",
  "**/dist/**",
  "**/.expo/**",
  "pnpm-lock.yaml",
  "*.tsbuildinfo",
  "apps/mobile/android/**",
  "apps/mobile/ios/**",
  "apps/mobile/src/uniwind-types.d.ts",
];

export default defineConfig({
  test: {
    environment: "node",
    exclude: IGNORED,
  },
  staged: {
    // In order, so lint reads the formatted file.
    "*": ["vp fmt --no-error-on-unmatched-pattern", "vp lint --no-error-on-unmatched-pattern"],
  },
  fmt: {
    ignorePatterns: IGNORED,
    sortPackageJson: {},
  },
  lint: {
    ignorePatterns: IGNORED,
    plugins: ["eslint", "oxc", "react", "unicorn", "typescript"],
    jsPlugins: ["./oxlint-plugin/index.ts"],
    categories: {
      correctness: "warn",
      suspicious: "warn",
      perf: "warn",
    },
    rules: {
      "oxc/no-accumulating-spread": "error",
      "react/purity": "error",
      "react/refs": "error",
      "react/set-state-in-effect": "error",
      "react/immutability": "error",
      "react/no-array-index-key": "error",
      "react/no-unstable-nested-components": "error",
      "react/static-components": "error",
      "eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
      ],
      "eslint/no-unsafe-optional-chaining": "error",
      "eslint/no-unneeded-ternary": "error",
      "unicorn/no-useless-spread": "error",
      "unicorn/no-array-sort": "off",
      "unicorn/consistent-function-scoping": "off",
      "unicorn/no-array-reverse": "off",
      "react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "off",
      "eslint/no-shadow": "off",
      "eslint/no-underscore-dangle": "off",
      "react/style-prop-object": "off",
      "eslint/no-await-in-loop": "off",
      "typescript/no-floating-promises": "off",
      "typescript/no-unsafe-type-assertion": "off",
      "typescript/restrict-template-expressions": "off",
      "typescript/unbound-method": "off",
      "apps/namespace-node-imports": "error",
      "apps/no-hermes-unsupported-apis": "error",
      "apps/no-hookless-use-function": "error",
      "apps/no-low-value-comments": "error",
      "apps/no-manual-memo": "error",
      "apps/no-unreasoned-state-sync": "error",
      "apps/prefer-catch-tags": "error",
      "apps/prefer-effect-fn": "error",
      "apps/require-suppression-reason": "error",
    },
    overrides: [
      {
        files: ["**/*.test.{ts,tsx}", "oxlint-plugin/**", "scripts/**"],
        rules: { "apps/prefer-effect-fn": "off", "apps/no-hermes-unsupported-apis": "off" },
      },
    ],
  },
});
