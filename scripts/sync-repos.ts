// Clones read-only reference repos into .repos/, pinned to the versions in the pnpm catalog.
// Agents read them (for example .repos/effect/LLMS.md) instead of guessing APIs.
import * as NodeChildProcess from "node:child_process";
import * as NodeFS from "node:fs";
import * as NodePath from "node:path";

const root = NodePath.resolve(import.meta.dirname, "..");
const workspace = NodeFS.readFileSync(NodePath.join(root, "pnpm-workspace.yaml"), "utf8");

const catalogVersion = (name: string): string => {
  const match = new RegExp(`^\\s+"?${name}"?:\\s*(\\S+)`, "m").exec(workspace);
  if (!match?.[1]) throw new Error(`No catalog version for ${name}`);
  return match[1];
};

const repos = [
  {
    dir: ".repos/effect",
    url: "https://github.com/Effect-TS/effect.git",
    ref: `effect@${catalogVersion("effect")}`,
  },
];

for (const repo of repos) {
  const dest = NodePath.join(root, repo.dir);
  NodeFS.rmSync(dest, { recursive: true, force: true });
  console.log(`Cloning ${repo.url} at ${repo.ref} into ${repo.dir}`);
  NodeChildProcess.execFileSync(
    "git",
    [
      "-c",
      "core.longpaths=true",
      "clone",
      "--quiet",
      "--depth",
      "1",
      "--branch",
      repo.ref,
      repo.url,
      dest,
    ],
    { stdio: "inherit" },
  );
}
