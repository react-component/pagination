import 'rc-pagination/assets/index.less';
import Pagination from 'rc-pagination';
import React from 'react';
import ReactDOM from 'react-dom';

const itemRender = (current, type) => {
  if (type === 'page') {
    return <a href={`#${current}`}>{current}</a>;
  }
  return <a href={`#${current}`} />;
};

ReactDOM.render(
  <Pagination total={100} itemRender={itemRender} />,
  document.getElementById('__react-content')
);
