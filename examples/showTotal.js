webpackJsonp([5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(312);


/***/ },

/***/ 312:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(33);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcPagination = __webpack_require__(179);
	
	var _rcPagination2 = _interopRequireDefault(_rcPagination);
	
	__webpack_require__(194);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint func-names: 0, no-console: 0 */
	_reactDom2.default.render(_react2.default.createElement(
	  'div',
	  null,
	  _react2.default.createElement(_rcPagination2.default, {
	    showTotal: function showTotal(total) {
	      return 'Total ' + total + ' items';
	    },
	    total: 455
	  }),
	  _react2.default.createElement('br', null),
	  _react2.default.createElement(_rcPagination2.default, {
	    showTotal: function showTotal(total, range) {
	      return range[0] + ' - ' + range[1] + ' of ' + total + ' items';
	    },
	    total: 455
	  })
	), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=showTotal.js.map