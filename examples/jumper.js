'use strict'

require('rc-pagination/assets/index.css')
require('rc-select/assets/index.css')
var Pagination = require('rc-pagination')
var React = require('react')
var Select=require('rc-select');

React.render(
  <Pagination
    selectComponentClass={Select}
    showQuickJumper={true} showSizeChanger={true} onChange={onChange} total={450} />,
  document.getElementById('__react-content')
);

function onChange(key) {
  console.log(key)
}
