module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: ["airbnb", "airbnb/hooks", "airbnb-typescript"],
  rules: {
    "react/react-in-jsx-scope": "off", // si tu utilises React 17+
    "import/prefer-default-export": "off",
  },
};
