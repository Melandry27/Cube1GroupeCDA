module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: ["./tsconfig.json"],
  },
  plugins: ["@typescript-eslint"],
  extends: ["airbnb", "airbnb/hooks", "airbnb-typescript"],
  overrides: [
    {
      files: ["api/**/*.{js,ts}"],
      env: {
        node: true,
        browser: false,
      },
      extends: ["airbnb-base", "airbnb-typescript/base"],
      parserOptions: {
        project: ["./api/tsconfig.json"],
      },
    },
    {
      files: ["backoffice/**/*.{js,ts,tsx}"],
      env: {
        browser: true,
        node: false,
      },
      extends: ["airbnb", "airbnb/hooks", "airbnb-typescript"],
      parserOptions: {
        project: ["./backoffice/tsconfig.json"],
      },
    },
  ],
  rules: {
    "no-console": "off",
    "import/prefer-default-export": "off",
  },
};
