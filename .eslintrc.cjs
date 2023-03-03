module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true, // add node environment
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    overrides: [],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
      "@typescript-eslint/no-non-null-assertion": "off",
    },
  };
  