module.exports = {
  setupFilesAfterEnv: ['<rootDir>/tests/setupAfterEnv.ts'],
  moduleNameMapper: {
    '\\.less$': 'identity-obj-proxy',
  },
  collectCoverageFrom: ['src/**', '!src/locale/**'],
};
