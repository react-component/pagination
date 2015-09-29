// use jsx to render html, do not modify simple.html
'use strict';

require('rc-pagination/assets/index.less');
var Pagination = require('rc-pagination');
var React = require('react');
React.render(
  <Pagination simple onChange={onChange} total={50} />, 
  document.getElementById('__react-content')
);

function onChange(key) {
  console.log(key)
}
