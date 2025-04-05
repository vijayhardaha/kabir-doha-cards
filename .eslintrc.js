module.exports = {
  root: true, // Indicates that this is the root ESLint configuration file and ESLint should not look for configurations in parent directories.
  extends: [
    "next", // Extends Next.js-specific ESLint rules.
    "next/core-web-vitals", // Includes rules for optimizing Next.js Core Web Vitals.
    "eslint:recommended", // Enables a set of core rules recommended by ESLint.
    "plugin:react/recommended", // Enables recommended rules for React.
    "plugin:jsx-a11y/recommended", // Enables accessibility rules for JSX.
    "plugin:prettier/recommended", // Integrates Prettier with ESLint to enforce consistent code formatting.
  ],
  plugins: [
    "react", // Adds React-specific linting rules.
    "jsx-a11y", // Adds accessibility linting rules for JSX.
    "import", // Adds rules for managing import/export syntax.
    "prettier", // Adds Prettier integration to enforce code formatting.
  ],
  env: {
    browser: true, // Defines global variables available in browser environments.
    node: true, // Defines global variables available in Node.js environments.
    es6: true, // Enables ES6 syntax and features.
  },
  parser: "@babel/eslint-parser", // Uses Babel's ESLint parser to support modern JavaScript syntax.
  parserOptions: {
    ecmaVersion: "latest", // Specifies the ECMAScript version to use (latest version).
    sourceType: "module", // Allows the use of ECMAScript modules (import/export).
    ecmaFeatures: {
      jsx: true, // Enables linting for JSX syntax.
    },
  },
  rules: {
    // Customize ESLint rules here
    "react/react-in-jsx-scope": "off", // Disables the rule requiring React to be in scope when using JSX (not needed in Next.js).
    "prettier/prettier": "error", // Treats Prettier formatting issues as errors.
    "react/no-unknown-property": [
      "error",
      {
        ignore: [
          "jsx", // Allows the use of the 'jsx' property in JSX (e.g., for Emotion or other libraries).
          "global", // Allows the use of the 'global' property in JSX.
        ],
      },
    ],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal"], // Enforces order of imports: built-in, external, and internal.
        pathGroups: [
          {
            pattern: "react", // Ensures React imports are grouped separately.
            group: "external",
            position: "before", // Places React imports before other external imports.
          },
        ],
        pathGroupsExcludedImportTypes: ["react"], // Excludes React from being alphabetized with other imports.
        alphabetize: {
          order: "asc", // Alphabetizes imports in ascending order.
          caseInsensitive: true, // Ignores case when alphabetizing.
        },
        "newlines-between": "always", // Enforces newlines between import groups.
        warnOnUnassignedImports: true, // Warns if there are unassigned imports (e.g., importing a module without using it).
      },
    ],
  },
  settings: {
    react: {
      version: "detect", // Automatically detects the React version to use for linting.
    },
  },
};
