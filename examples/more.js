require('rc-pagination/assets/index.less');
const Pagination = require('rc-pagination');
const React = require('react');
const ReactDOM = require('react-dom');

ReactDOM.render(
  <Pagination className="ant-pagination" defaultCurrent={3} total={450} />,
  document.getElementById('__react-content')
);
