const baseConfig = require('../../jest.base.config');

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>/projects/web-app'],
  testMatch: ['<rootDir>/projects/web-app/**/*.spec.[jt]s'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/projects/web-app/tsconfig.spec.json',
    },
    stringifyContentPathRegex: true,
  },
};
