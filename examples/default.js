webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// use jsx to render html, do not modify simple.html
	'use strict';
	
	__webpack_require__(2);
	var Pagination = __webpack_require__(3);
	var React = __webpack_require__(6);
	React.render(React.createElement(Pagination, { onChange: onChange, current: 3, total: 25 }), document.getElementById('__react-content'));
	
	function onChange(key) {
	  console.log(key);
	}

/***/ }
]);
//# sourceMappingURL=default.js.map