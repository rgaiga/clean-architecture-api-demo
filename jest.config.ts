import type { Config } from 'jest';

const config: Config = {
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    moduleNameMapper: {
        '@data/(.+)': '<rootDir>/src/data/$1',
        '@domain/(.+)': '<rootDir>/src/domain/$1',
        '@infra/(.+)': '<rootDir>/src/infra/$1',
        '@main/(.+)': '<rootDir>/src/main/$1',
        '@presentation/(.+)': '<rootDir>/src/presentation/$1',
        '@utils/(.+)': '<rootDir>/src/utils/$1',
    },
    preset: 'ts-jest',
    testMatch: ['<rootDir>/__tests__/**/*.spec.ts'],
};

export default config;
