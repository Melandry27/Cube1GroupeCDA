import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist/",
      "build/",
      ".vite/",
      ".next/",
      "out/",
      "node_modules/",
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.spec.ts",
      "**/*.spec.tsx",
      "src/tests/",
      "tests/",
      "__tests__/",
      "coverage/",
      "vite.config.ts",
      "vitest.config.ts",
      "jest.config.js",
      "postcss.config.js",
      "tailwind.config.js",
      "*.d.ts",
      "public/",
      "static/",
      "*.log",
      "npm-debug.log*",
      "yarn-debug.log*",
      ".env*",
      ".vscode/",
      ".idea/",
      ".DS_Store",
      "Thumbs.db",
    ],
  },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  }
);
