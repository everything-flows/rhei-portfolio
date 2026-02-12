/**
 * Shared ESLint rules for import ordering + unused import removal.
 *
 * - Works with legacy `.eslintrc.cjs` (CJS require)
 * - Can also be consumed from flat config via `createRequire`
 */

/** @type {import('eslint').Linter.RulesRecord} */
const rules = {
  // Import ordering (eslint-plugin-import)
  "import/order": [
    "warn",
    {
      groups: [
        "builtin",
        "external",
        "internal",
        ["parent", "sibling", "index"],
        "type",
      ],
      // Treat common monorepo aliases as "internal"
      pathGroups: [
        { pattern: "~/**", group: "internal" },
        { pattern: "@/**", group: "internal" },
      ],
      pathGroupsExcludedImportTypes: ["builtin"],
      "newlines-between": "always",
      alphabetize: {
        order: "asc",
        caseInsensitive: true,
      },
    },
  ],

  // Auto-remove unused imports (eslint-plugin-unused-imports)
  "unused-imports/no-unused-imports": "warn",
  "unused-imports/no-unused-vars": [
    "warn",
    {
      vars: "all",
      varsIgnorePattern: "^_",
      args: "after-used",
      argsIgnorePattern: "^_",
    },
  ],
};

module.exports = { rules };

