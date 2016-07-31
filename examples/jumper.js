/* eslint func-names: 0, no-console: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import Select from 'rc-select';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.less';
import 'rc-select/assets/index.css';

function onShowSizeChange(current, pageSize) {
  console.log(current);
  console.log(pageSize);
}

function showTotal(total) {
  return `一共 ${total} 条数据`;
}

ReactDOM.render(
  <Pagination
    selectComponentClass={Select}
    showTotal={showTotal}
    showQuickJumper showSizeChanger defaultPageSize={20} defaultCurrent={5} onShowSizeChange={onShowSizeChange} total={450} />,
  document.getElementById('__react-content')
);
