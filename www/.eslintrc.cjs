/** @type {import("eslint").Linter.Config} */

const config = {
  $schema: "https://json.schemastore.org/eslintrc",
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: true,
  },
  extends: ["next/core-web-vitals", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "react/jsx-key": "off",
  },
  settings: {
    next: {
      rootDir: true,
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
    },
  ],
}

module.exports = config
