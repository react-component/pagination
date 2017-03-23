webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(283);


/***/ },

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(159);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcPagination = __webpack_require__(160);
	
	var _rcPagination2 = _interopRequireDefault(_rcPagination);
	
	__webpack_require__(167);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint func-names: 0, no-console: 0 */
	var App = _react2.default.createClass({
	  displayName: 'App',
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
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_rcPagination2.default, {
	        onChange: this.onChange,
	        current: this.state.current,
	        total: 80,
	        showLessItems: true,
	        showTitle: false
	      }),
	      _react2.default.createElement(_rcPagination2.default, { showLessItems: true, defaultCurrent: 1, total: 60, showTitle: false })
	    );
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=showTitle.js.map