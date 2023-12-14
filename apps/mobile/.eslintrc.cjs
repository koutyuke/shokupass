/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@shokupass/eslint-config/react.cjs"],
  parserOptions: {
    project: "./tsconfig.json",
  },
  overrides: [
    {
      files: ["src/app/**/* "],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
