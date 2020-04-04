module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  setupFiles: ['<rootDir>/global-test.ts'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'jest-setup.ts',
    'projects/web-app/src/environments',
    'projects/web-app/src/polyfills.ts',
    '.mock.ts',
  ],
};
