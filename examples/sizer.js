// use jsx to render html, do not modify simple.html

require('rc-pagination/assets/index.less');
require('rc-select/assets/index.css');
const Pagination = require('rc-pagination');
const React = require('react');
const Select = require('rc-select');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <Pagination
  selectComponentClass={Select}
  pageSizeOptions={['1', '2', '3']} showSizeChanger defaultCurrent={3} total={25} />,
  document.getElementById('__react-content')
);
