import 'rc-pagination/assets/index.less';
import Pagination from 'rc-pagination';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Pagination defaultCurrent={2} total={25} style={{ margin: '100px' }} />,
  document.getElementById('__react-content')
);
