import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "typescript-eslint";

export default [
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unsafe-function-type": "off",
    },
  },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  {
    ignores: [
      "**/dist/**",
      "**/node_modules/**",
      "**/coverage/**",
      "**/.vitepress/cache/**",
      "**/docs/**",
    ],
  },
];
