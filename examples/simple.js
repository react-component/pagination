// use jsx to render html, do not modify simple.html

require('rc-pagination/assets/index.less');
const Pagination = require('rc-pagination');
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <Pagination defaultCurrent={2} total={25} />,
  document.getElementById('__react-content')
);
