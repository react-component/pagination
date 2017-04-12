// use jsx to render html, do not modify simple.html

import 'rc-pagination/assets/index.less';
import Pagination from 'rc-pagination';
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <Pagination defaultCurrent={2} total={25} />,
  document.getElementById('__react-content')
);
