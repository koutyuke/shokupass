/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@shokupass/eslint-config/next.cjs"],
  parserOptions: {
    project: true,
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
