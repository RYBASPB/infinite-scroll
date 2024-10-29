import { pathsToModuleNameMapper } from 'ts-jest';
import fs from 'fs';

const tsConfigFile = fs.readFileSync('./tsconfig.app.json', 'utf-8');
const tsConfig = JSON.parse(tsConfigFile);

/**@type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.app.json',
      },
    ],
  },
  roots: ['<rootDir>'],
  modulePaths: [tsConfig.compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
