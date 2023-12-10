/** @type {import('jest').Config} */
module.exports = {
  collectCoverageFrom: ["./src/**/*.*ts"],
  coverageDirectory: "./coverage",
  moduleFileExtensions: ["json", "js", "ts"],
  moduleNameMapper: {
    "^#core/(.*)$": "<rootDir>/../core/$1",
  },
  rootDir: ".",
  setupFiles: ["dotenv/config"],
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  testEnvironment: "node",
};
