/** @type {import('jest').Config} */

const nextJest = require("next/jest");

const createNextJestConfig = nextJest({
  dir: "./",
});

const defaultConfig = {
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["dotenv/config"],
};

/** @type {(overrideConfig: import('jest').Config) => Promise<import('jest').Config>} */
module.exports = (overrideConfig) =>
  createNextJestConfig({
    ...defaultConfig,
    ...overrideConfig,
  });
