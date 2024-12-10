import '../../assets/index.less';
import React from 'react';
import Pagination from '../../src';

const App = () => (
  <>
    <Pagination total={25} />
    <Pagination total={50} />
    <Pagination total={60} />
    <Pagination total={70} />
    <Pagination total={80} />
    <Pagination total={90} />
    <Pagination total={100} />
    <Pagination total={120} />
    <Pagination total={500} />
  </>
);

export default App;
