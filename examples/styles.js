import '../assets/index.less';
import React from 'react';
import Pagination from '..';

export default () => (
  <Pagination defaultCurrent={2} total={25} style={{ margin: '100px' }} />
);
