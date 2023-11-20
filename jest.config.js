const pkg = require('./package.json');
module.exports = {
  snapshotSerializers: [require.resolve('enzyme-to-json/serializer')],
  moduleNameMapper: {
    [pkg.name]: '<rootDir>/src/index.ts',
    '\\.less$': 'identity-obj-proxy',
  },
  collectCoverageFrom: ['src/**', '!src/Pagination_deprecated.tsx'],
};
