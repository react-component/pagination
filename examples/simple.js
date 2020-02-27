// use jsx to render html, do not modify simple.html

import '../assets/index.less';
import Pagination from 'rc-pagination';
import React from 'react';

const App = () => <Pagination defaultCurrent={2} total={25} />;

export default App;
