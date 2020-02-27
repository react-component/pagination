// use jsx to render html, do not modify simple.html

import Pagination from 'rc-pagination';
import React from 'react';
import ReactDOM from 'react-dom';
import '../assets/index.less';

export default () => <Pagination simple defaultCurrent={1} total={50} />;
