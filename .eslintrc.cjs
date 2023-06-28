/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      "./examples/*/tsconfig.json",
      "./docs/tsconfig.json",
      "./packages/*/tsconfig.json",
      "./www/tsconfig.json",
      "./packages/config/*/tsconfig.json"
    ],
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  overrides: [
    {
      files: ["**/tsup.config.ts"],
      parserOptions: {
        project: ["./tsconfig.json"],
      },
    },
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
  },
  ignorePatterns: [
    "**/dist/**",
    "**/node_modules/**",
    ".eslintrc.cjs",
    "**/config.*",
    "tailwind.config.js",
    "postcss.config.js",
  ],
};

module.exports = config;
