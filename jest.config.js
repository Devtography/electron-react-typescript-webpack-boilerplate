import { createRequire } from 'module';
import { pathsToModuleNameMapper } from 'ts-jest';

const require = createRequire(import.meta.url);
const { compilerOptions } = require('./tsconfig.json');

/**
 * Enhance the Jest path mappings map returned from `pathsModuleNameMapper`
 * to support ES modules import syntax in TypeScript.
 *
 * @returns Jest path mappings map.
 */
function pathsToESMModuleNameMapper() {
  const map = pathsToModuleNameMapper(
    compilerOptions.paths,
    { prefix: '<rootDir>' },
  );
  const esmMap = {};

  Object.entries(map).forEach((entry) => {
    const [key, val] = entry;

    if (/.*\(\.\*\)\$$/.test(key)) {
      const convertedKey = `${key.substring(0, key.length - 1)}\\.js$`;
      esmMap[convertedKey] = val;
    }

    esmMap[key] = val;
  });

  return esmMap;
}

export default {
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: pathsToESMModuleNameMapper(),
  modulePathIgnorePatterns: [
    '<rootDir>/dist',
    '<rootDir>/node_modules',
    '<rootDir>/out',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: [
    '**/tests/**/*.(spec|test).(ts?(x)|js?(x))',
  ],
  collectCoverage: true,
  verbose: true,
};
