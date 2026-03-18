/** @type {import('jest').Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",

  roots: ["<rootDir>/src"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],

  moduleFileExtensions: ["ts", "js"],

  transform: {
    "^.+\\.ts$": "ts-jest",
  },

  testMatch: ["**/tests/**/*.test.ts"],

  moduleNameMapper: {
    "^@modules/(.*)$": "<rootDir>/src/modules/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
  },
};