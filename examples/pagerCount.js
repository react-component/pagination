import 'rc-pagination/assets/index.less';
import Pagination from 'rc-pagination';
import React from 'react';
import ReactDOM from 'react-dom';

const total = 500;

const itemRender = (current, type, element) => {
  const hideItems = ['jump-last', 'jump-first'];
  
  if (hideItems.includes(type)) {
    return null;
  }
 
  return element;
};

ReactDOM.render(
  <div>
    <Pagination total={total} itemRender={itemRender} pagerCount={10} showPrevNextJumpers={false} />
  </div>
, document.getElementById('__react-content'));
