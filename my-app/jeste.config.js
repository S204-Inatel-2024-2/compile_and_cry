module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
    moduleNameMapper: {
      "^@dtos/(.*)$": "<rootDir>/src/dtos/$1",
      "^@assets/(.*)$": "<rootDir>/src/assets/$1",
      "^@components/(.*)$": "<rootDir>/src/components/$1",
      "^@screens/(.*)$": "<rootDir>/src/screens/$1",
      "^@storage/(.*)$": "<rootDir>/src/storage/$1",
      "^@utils/(.*)$": "<rootDir>/src/utils/$1",
      "^@services/(.*)$": "<rootDir>/src/services/$1",
      "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
      "^@contexts/(.*)$": "<rootDir>/src/contexts/$1",
      "^@routes/(.*)$": "<rootDir>/src/routes/$1"
    },
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["json", "lcov", "text", "clover"]
  };
  