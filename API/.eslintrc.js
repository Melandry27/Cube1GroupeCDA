module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
  },
  env: {
    node: true,
    es2021: true,
  },
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended"],
  rules: {
    // Règles de base
    "no-console": "off",
    "no-unused-vars": "off",
    "prefer-const": "warn",
    "no-var": "error",
    eqeqeq: "warn",
    curly: "warn",
    semi: ["warn", "always"],
    quotes: ["warn", "double"],

    // TypeScript rules (manuelles)
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
  },
};
