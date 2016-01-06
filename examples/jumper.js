require('rc-pagination/assets/index.less');
require('rc-select/assets/index.css');
const Pagination = require('rc-pagination');
const React = require('react');
const ReactDOM = require('react-dom');
const Select = require('rc-select');


function onShowSizeChange(current, pageSize) {
  console.log(current);
  console.log(pageSize);
}

ReactDOM.render(
  <Pagination
    selectComponentClass={Select}
    showQuickJumper showSizeChanger pageSize={20} defaultCurrent={5} onShowSizeChange={onShowSizeChange} total={450} />,
  document.getElementById('__react-content')
);
