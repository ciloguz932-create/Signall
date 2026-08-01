const { jestConfig } = require("next/jest");

const createJestConfig = jestConfig({
  dir: "./",
});

module.exports = createJestConfig({
  testEnvironment: "jsdom",
  testMatch: ["**/*.test.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/index.ts",
  ],
  coveragePathIgnorePatterns: ["/node_modules/", "/tests/"],
  testTimeout: 30000,
  setupFilesAfterEnv: ["tests/setup.ts"],
});