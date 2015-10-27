// use jsx to render html, do not modify simple.html
'use strict';

require('rc-pagination/assets/index.less');
require('rc-select/assets/index.css');
var Pagination = require('rc-pagination');
var React = require('react');
var Select=require('rc-select');

React.render(
  <Pagination 
  selectComponentClass={Select}
  pageSizeOptions={['1','2','3']} showSizeChanger={true} onChange={onChange} total={25} />, 
  document.getElementById('__react-content')
);

function onChange(key) {
  console.log(key)
}
