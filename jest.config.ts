import type { Config } from 'jest';
import { configDotenv } from 'dotenv';

configDotenv({ path: `.env.${process.env.NODE_ENV}` });

const config: Config = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePaths: ['../.env.test', './env.test'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};

export default config;
