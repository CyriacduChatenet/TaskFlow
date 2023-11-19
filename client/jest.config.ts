export default {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/tests/mocks/fileMock.js',
        '\\.(css|less)$': '<rootDir>/src/tests/mocks/styleMock.js',
    },
};
