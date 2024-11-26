import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    rules: {
      eqeqeq: "1",
      "no-unused-vars": "error",
      "prefer-const": ["error", { ignoreReadBeforeAssign: true }],
    },
  },
  {
    ignores: [".node_modules/*", ".dist/*"]
},
];
