webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(372);


/***/ },

/***/ 372:
/***/ function(module, exports, __webpack_require__) {

	// use jsx to render html, do not modify simple.html
	'use strict';
	
	__webpack_require__(2);
	var Pagination = __webpack_require__(4);
	var React = __webpack_require__(7);
	React.render(React.createElement(Pagination, { onChange: onChange, total: 25 }), document.getElementById('__react-content'));
	
	function onChange(key) {
	  console.log(key);
	}

/***/ }

});
//# sourceMappingURL=simple.js.map