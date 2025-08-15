import eslint from "@eslint/js";
import globals from "globals";
import typescriptEslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

const config = defineConfig([
  {
    ignores: [".idea/*", ".git/*", "dist/*", `node_modules/*`]
  },
  {
    extends: [
      eslint.configs.recommended,
      // @ts-expect-error TODO: fix this error
      ...typescriptEslint.configs.recommended,
    ],
    files: [`**/*.{mts}`],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        parser: typescriptEslint.parser,
        ecmaVersion: 2020,
        sourceType: "module",
        project: `./tsconfig.json`,
        tsconfigRootDir: './',
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-console": "warn",
      "no-debugger": "warn",
      "vue/multi-word-component-names": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { vars: "all", args: "after-used", ignoreRestSiblings: false },
      ],
      "vue/no-mutating-props": "off",
    },
  },
  eslintConfigPrettier,
]);

export default config;
