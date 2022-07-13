const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = config = {
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json'
    }
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths,
    { prefix: '<rootDir>/' }
  ),
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: [
    '**/tests/**/*.test.(ts?(x)|js?(x))'
  ],
  verbose: true,
};
