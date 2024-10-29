import { pathsToModuleNameMapper } from 'ts-jest';
import tsConfig from './tsconfig.app.json' with { type: "json" };

/**@type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  roots: ['<rootDir>'],
  modulePaths: [tsConfig.compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(
    tsConfig.compilerOptions.paths),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
