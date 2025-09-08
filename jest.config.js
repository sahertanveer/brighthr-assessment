// jest.config.js
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
    "^.+\\.js$": "babel-jest", // transform JS (node_modules ESM)
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios/.*)" // allow axios to be transformed
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"]
};
