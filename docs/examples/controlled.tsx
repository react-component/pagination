import React, { useState } from 'react';
import Pagination from '../../src';
import '../../assets/index.less';
import 'rc-select/assets/index.less';

const App = () => {
  const [current, setCurrent] = useState(1);
  const onChange = (page) => {
    setCurrent(page);
  };
  return <Pagination onChange={onChange} current={current} total={25} />;
};

export default App;
