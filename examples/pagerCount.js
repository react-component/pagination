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
    <p> pageCount = 10, hide prev and next jumpers </p>
    <Pagination total={500} itemRender={itemRender} pagerCount={10} showPrevNextJumpers={false} />

    <p> Has `showSizeChanger` and `showQuickJumper` </p>
    <Pagination
      selectComponentClass={Select}
      showSizeChanger
      onShowSizeChange={onShowSizeChange}
      defaultCurrent={3}
      total={500}
      pagerCount={7}
      showQuickJumper
    />

    <p> pagerCount less than 3 </p>
    <Pagination total={100} pagerCount={0} />

    <p> Has `showLessItems` and `pagerCount` </p>
    <Pagination total={500} pagerCount={8} showLessItems />

    <p> The pagerCount is odd </p>
    <Pagination total={200} pagerCount={7} />

    <p> The pagerCount is even </p>
    <Pagination total={200} pagerCount={8} />
  </div>
, document.getElementById('__react-content'));
