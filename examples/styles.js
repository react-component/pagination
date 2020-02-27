import '../assets/index.less';
import Pagination from 'rc-pagination';
import React from 'react';

export default () => (
  <Pagination defaultCurrent={2} total={25} style={{ margin: '100px' }} />
);
