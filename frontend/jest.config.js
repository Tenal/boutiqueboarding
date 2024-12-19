module.exports = {
    roots: ['<rootDir>/src'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/__mocks__/fileMock.js',
        '^@resources/(.*)$': '<rootDir>/src/resources/$1',
        '^/resources/(.*)$': '<rootDir>/public/resources/$1',
    },
    transform: {
        '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    collectCoverage: true,
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['text', 'json-summary', 'lcov'],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/*.d.ts',
        '!src/**/*.test.{js,ts,jsx,tsx}',
        '!src/**/index.js',
        '!src/**/setupTests.js',
    ],
    coverageThreshold: {
        global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80,
        },
    },
}
