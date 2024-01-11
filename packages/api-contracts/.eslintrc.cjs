/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@shokupass/eslint-config/library.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
