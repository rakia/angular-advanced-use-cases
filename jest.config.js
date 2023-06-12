module.exports = {
  preset: "jest-preset-angular",
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/file-upload/'],
  setupTestFrameworkScriptFile: "<rootDir>/setup-jest.ts",
}
