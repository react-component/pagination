import '../assets/index.less';
import Pagination from 'rc-pagination';
import React from 'react';

const App = () => (
  <Pagination className="ant-pagination" defaultCurrent={3} total={450} />
);

export default App;
