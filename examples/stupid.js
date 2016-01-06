// use jsx to render html, do not modify simple.html

const Pagination = require('rc-pagination');
const React = require('react');
const ReactDOM = require('react-dom');
require('rc-pagination/assets/index.less');

ReactDOM.render(
  <Pagination simple defaultCurrent={1} total={50} />,
  document.getElementById('__react-content')
);
