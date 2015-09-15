// use jsx to render html, do not modify simple.html
'use strict';

require('rc-pagination/assets/index.css');
var Pagination = require('rc-pagination');
var React = require('react');
React.render(
  <Pagination onChange={onChange} total={25} />, 
  document.getElementById('__react-content')
);

function onChange(key) {
  console.log(key)
}
