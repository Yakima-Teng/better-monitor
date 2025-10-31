import type { UserConfig } from "@commitlint/types";

const config: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["build", "ci", "chore", "docs", "feat", "fix", "perf", "refactor", "revert", "style", "test"],
    ],
  },
};

export default config;
