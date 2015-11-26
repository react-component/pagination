webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(200);


/***/ },

/***/ 169:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(8);


/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	// use jsx to render html, do not modify simple.html
	'use strict';
	
	__webpack_require__(2);
	var Pagination = __webpack_require__(3);
	var React = __webpack_require__(6);
	var ReactDOM = __webpack_require__(169);
	
	ReactDOM.render(React.createElement(Pagination, { onChange: onChange, total: 25 }), document.getElementById('__react-content'));
	
	function onChange(key) {
	  console.log(key);
	}

/***/ }

});
//# sourceMappingURL=simple.js.map