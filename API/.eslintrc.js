module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  env: {
    node: true,
    es2021: true,
  },
  plugins: ["@typescript-eslint"],
  extends: ["airbnb-base", "airbnb-typescript/base"],
  rules: {
    "no-console": "off",
    "import/prefer-default-export": "off",
  },
};
