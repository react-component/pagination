'use strict'

require('rc-pagination/assets/index.less')
require('rc-select/assets/index.css')
var Pagination = require('rc-pagination')
var React = require('react');
var ReactDOM = require('react-dom');
var Select=require('rc-select');

ReactDOM.render(
  <Pagination
    selectComponentClass={Select}
    showQuickJumper={true} showSizeChanger={true} defaultCurrent={5} onShowSizeChange={onShowSizeChange} total={450} />,
  document.getElementById('__react-content')
);

function onShowSizeChange(current, pageSize) {
  console.log(current)
  console.log(pageSize)
}

function onChange(key) {
  console.log(key)
}
