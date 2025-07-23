import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    verbose: true,
    rootDir: 'src',
    testRegex: '(setup|test)\\.[jt]sx?$',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['<rootDir>/../jest.setup.ts'],
    preset: 'ts-jest',
    transform: {
        '^.+\\.(js|ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    collectCoverage: process.env.COVERAGE === 'true',
    collectCoverageFrom: [
        '**/*.{ts,tsx}',
        '!**/*.interface.ts',
        '!**/*.model.ts',
        '!**/*.test.ts',
        '!**/index.ts'
    ],
    coverageDirectory: '<rootDir>/../coverage',
    coverageReporters: ['text', 'lcov'],
};

export default config;
