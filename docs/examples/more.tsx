import '../../assets/index.less';
import React from 'react';
import Pagination from '../../src';

const App = () => (
  <Pagination className="ant-pagination" defaultCurrent={3} total={450} />
);

export default App;
