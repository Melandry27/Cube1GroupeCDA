module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  rules: {
    "no-console": "off",
    "no-unused-vars": "off",
  },
  ignorePatterns: [".vite/**", "dist/**", "build/**", "node_modules/**"],
};
