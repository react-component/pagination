const pkg = require('./package.json');
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/tests/setupAfterEnv.ts'],
  moduleNameMapper: {
    [pkg.name]: '<rootDir>/src/index.ts',
    '\\.less$': 'identity-obj-proxy',
  },
  collectCoverageFrom: ['src/**', '!src/locale/**'],
};
