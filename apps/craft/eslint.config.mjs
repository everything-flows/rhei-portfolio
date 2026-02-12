import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { createRequire } from "module";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);
const { rules: sharedImportRules } = require("../../eslint/shared-imports.cjs");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      import: require("eslint-plugin-import"),
      "unused-imports": require("eslint-plugin-unused-imports"),
    },
    rules: {
      ...sharedImportRules,
      // Prevent duplicate reports; `unused-imports/*` handles this (with autofix).
      "@typescript-eslint/no-unused-vars": "off",
      // Next+ESLint9 flat config 조합에서 getSource 버그로 크래시 방지
      "react-hooks/exhaustive-deps": "off",
    },
  },
];

export default eslintConfig;
