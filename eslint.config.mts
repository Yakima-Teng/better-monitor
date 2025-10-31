import eslint from "@eslint/js";
import globals from "globals";
import typescriptEslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

const config = defineConfig([
  {
    ignores: [".idea/*", ".git/*", "dist/*", `node_modules/*`],
  },
  {
    extends: [
      eslint.configs.recommended,
      // @ts-expect-error TODO: fix this error
      ...typescriptEslint.configs.recommended,
    ],
    files: [`**/*.{ts,mts,js,mjs}`],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        parser: typescriptEslint.parser,
        ecmaVersion: 2020,
        sourceType: "module",
        project: `./tsconfig.json`,
        tsconfigRootDir: "./",
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "no-console": "warn",
      "no-debugger": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: false,
          varsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    extends: [eslint.configs.recommended],
    files: [`**/*.{cjs}`],
    languageOptions: {
      // 指定使用 CommonJS（script 模式）
      sourceType: "script",
      ecmaVersion: 2022,
      // 注入 CommonJS 和 Node.js 全局变量
      globals: {
        ...globals.node, // Node.js 全局变量（__dirname, process 等）
        ...globals.commonjs, // CommonJS 全局变量（require, module, exports）
      },
    },
    rules: {
      // 基础规则
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "no-undef": "error",
      eqeqeq: ["error", "always"],
      quotes: ["error", "single"],
      semi: ["error", "always"],
      indent: ["error", 2],
      "no-console": "warn",
    },
  },
  eslintConfigPrettier,
]);

export default config;
