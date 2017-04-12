// use jsx to render html, do not modify simple.html

import Pagination from 'rc-pagination';
import React from 'react';
import ReactDOM from 'react-dom';
import 'rc-pagination/assets/index.less';

ReactDOM.render(
  <Pagination simple defaultCurrent={1} total={50} />,
  document.getElementById('__react-content')
);
