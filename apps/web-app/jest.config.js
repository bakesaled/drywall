module.exports = {
  name: 'web-app',
  preset: '../../jest.base.config.js',
  coverageDirectory: '../../coverage/apps/web-app',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
