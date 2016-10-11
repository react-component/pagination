require('rc-pagination/assets/index.less');
const Pagination = require('rc-pagination');
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <Pagination defaultCurrent={2} total={25} style={{ margin: '100px' }} />,
  document.getElementById('__react-content')
);
