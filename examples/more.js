webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(199);


/***/ },

/***/ 169:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(8);


/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	var Pagination = __webpack_require__(3);
	var React = __webpack_require__(6);
	var ReactDOM = __webpack_require__(169);
	
	ReactDOM.render(React.createElement(Pagination, { className: 'ant-pagination', onChange: onChange, total: 450 }), document.getElementById('__react-content'));
	
	function onChange(key) {
	  console.log(key);
	}

/***/ }

});
//# sourceMappingURL=more.js.map