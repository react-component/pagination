import 'rc-pagination/assets/index.less';
import Pagination from 'rc-pagination';
import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'rc-select';
import 'rc-select/assets/index.css';

const itemRender = (current, type, element) => {
  const hideItems = ['jump-last', 'jump-first'];

  if (hideItems.includes(type)) {
    return null;
  }

  return element;
};

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}

ReactDOM.render(
  <div>
    <Pagination total={500} itemRender={itemRender} pagerCount={10} showPrevNextJumpers={false} />

    <Pagination
      selectComponentClass={Select}
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
      pagerCount={7}
    />

    <Pagination total={500} pagerCount={8} />
  </div>
, document.getElementById('__react-content'));
