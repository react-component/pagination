webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* eslint func-names: 0, no-console: 0 */
	'use strict';
	
	__webpack_require__(2);
	var Pagination = __webpack_require__(3);
	var React = __webpack_require__(6);
	
	var Container = React.createClass({
	  displayName: 'Container',
	
	  getInitialState: function getInitialState() {
	    return {
	      current: 3
	    };
	  },
	  onChange: function onChange(page) {
	    console.log(page);
	    this.setState({
	      current: page
	    });
	  },
	  render: function render() {
	    return React.createElement(Pagination, { onChange: this.onChange, current: this.state.current, total: 25 });
	  }
	});
	
	React.render(React.createElement(Container, null), document.getElementById('__react-content'));

/***/ }
]);
//# sourceMappingURL=default.js.map