// Rules copied from T3 Code's oxlint-plugin-t3code (MIT, https://github.com/pingdotgg/t3code).
import { definePlugin } from "@oxlint/plugins";

import namespaceNodeImports from "./rules/namespace-node-imports.ts";
import noHermesUnsupportedApis from "./rules/no-hermes-unsupported-apis.ts";
import noHooklessUseFunction from "./rules/no-hookless-use-function.ts";
import noLowValueComments from "./rules/no-low-value-comments.ts";
import noManualMemo from "./rules/no-manual-memo.ts";
import noUnreasonedStateSync from "./rules/no-unreasoned-state-sync.ts";
import preferCatchTags from "./rules/prefer-catch-tags.ts";
import preferEffectFn from "./rules/prefer-effect-fn.ts";
import requireSuppressionReason from "./rules/require-suppression-reason.ts";

export default definePlugin({
  meta: {
    name: "apps",
  },
  rules: {
    "namespace-node-imports": namespaceNodeImports,
    "no-hermes-unsupported-apis": noHermesUnsupportedApis,
    "no-hookless-use-function": noHooklessUseFunction,
    "no-low-value-comments": noLowValueComments,
    "no-manual-memo": noManualMemo,
    "no-unreasoned-state-sync": noUnreasonedStateSync,
    "prefer-catch-tags": preferCatchTags,
    "prefer-effect-fn": preferEffectFn,
    "require-suppression-reason": requireSuppressionReason,
  },
});
