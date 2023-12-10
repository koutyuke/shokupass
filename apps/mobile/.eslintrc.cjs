/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@shokupass/eslint-config/react.cjs"],
  parserOptions: {
    project: "./tsconfig.json",
  },
};
