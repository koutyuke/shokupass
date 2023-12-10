/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "prettier",
    "eslint-config-turbo",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["only-warn", "import", "promise", "@typescript-eslint"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["node_modules/", "dist/"],
  rules: {
    "arrow-body-style": ["error", "as-needed"],
    "import/no-default-export": "error",
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", { packageDir: ["./"] }],
    "import/order": [
      "error",
      {
        pathGroups: [
          {
            pattern: "@/**",
            group: "internal",
            position: "before",
          },
          {
            pattern: "#**",
            group: "internal",
            position: "before",
          },
        ],
        alphabetize: {
          order: "asc",
        },
      },
    ],
  },
  overrides: [
    {
      files: ["./*"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
