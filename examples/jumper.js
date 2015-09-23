'use strict'

require('rc-pagination/assets/index.css')
require('rc-select/assets/index.css')
var Pagination = require('rc-pagination')
var React = require('react')
var Select=require('rc-select');

React.render(
  <Pagination
    selectComponentClass={Select}
    showQuickJumper={true} showSizeChanger={true} onChange={onChange} onShowSizeChange={onShowSizeChange} total={450} />,
  document.getElementById('__react-content')
);

function onShowSizeChange(current, pageSize) {
  console.log(current)
  console.log(pageSize)
}

function onChange(key) {
  console.log(key)
}
