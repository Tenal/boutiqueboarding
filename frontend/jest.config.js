module.exports = {
    // setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    // testEnvironment: 'jsdom',
    // moduleNameMapper: {
    //     '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    // },
    // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testEnvironment: 'jsdom',
}
