module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.svg$": "<rootDir>/__mocks__/svgrMock.js",
        d3: "<rootDir>/node_modules/d3/dist/d3.min.js",
        "^d3-(.*)$": "<rootDir>/node_modules/d3-$1/dist/d3-$1.min.js",
    },
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)",
    ],
    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    },
    transformIgnorePatterns: ["/node_modules/(?!(d3|fsm-generator)/)"],
    testPathIgnorePatterns: [
        "/node_modules/",
        "/playwright/",
        ".*\\.spec\\.ts$", // This will exclude files ending with .spec.ts
    ],
};
