import React from 'react';
import Pagination from 'rc-pagination';
import '../../assets/index.less';

export default () => (
  <>
    <Pagination simple defaultCurrent={1} total={50} />
    <br />
    <Pagination
      simple
      defaultCurrent={1}
      total={50}
      showTotal={(total) => `Total ${total} items`}
    />
  </>
);
