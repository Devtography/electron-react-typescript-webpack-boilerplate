import baseConfig from './jest.config.mjs';

/** @type {import('jest').Config} */
export default {
  ...baseConfig,
  coverageReporters: ['json'],
  reporters: ['default', 'github-actions'],
};
