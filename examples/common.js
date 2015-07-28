/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		4:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"jumper","1":"more","2":"simple","3":"stupid"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/yiminghe/code/react-components/pagination/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/yiminghe/code/react-components/pagination/assets/index.css", function() {
			var newContent = require("!!/Users/yiminghe/code/react-components/pagination/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/yiminghe/code/react-components/pagination/assets/index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	exports.push([module.id, ".rc-pagination {\n  font-size: 12px;\n  font-family: 'Arial';\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n}\n.rc-pagination:after {\n  content: \" \";\n  display: block;\n  height: 0;\n  clear: both;\n  overflow: hidden;\n  visibility: hidden;\n}\n.rc-pagination-item {\n  cursor: pointer;\n  border-radius: 6px;\n  min-width: 28px;\n  height: 28px;\n  line-height: 28px;\n  text-align: center;\n  list-style: none;\n  float: left;\n  border: 1px solid #d9d9d9;\n  background-color: #fff;\n  margin-right: 8px;\n}\n.rc-pagination-item a {\n  text-decoration: none;\n  color: #666;\n}\n.rc-pagination-item:hover {\n  border-color: #2db7f5;\n}\n.rc-pagination-item:hover a {\n  color: #2db7f5;\n}\n.rc-pagination-item-active {\n  background-color: #2db7f5;\n  border-color: #2db7f5;\n}\n.rc-pagination-item-active a {\n  color: #fff;\n}\n.rc-pagination-item-active:hover a {\n  color: #fff;\n}\n.rc-pagination-jump-prev:after,\n.rc-pagination-jump-next:after {\n  content: \"•••\";\n  display: block;\n  letter-spacing: 2px;\n  color: #ccc;\n  font-size: 12px;\n  margin-top: 1px;\n}\n.rc-pagination-jump-prev:hover:after,\n.rc-pagination-jump-next:hover:after {\n  color: #2db7f5;\n}\n.rc-pagination-jump-prev:hover:after {\n  content: \"«\";\n}\n.rc-pagination-jump-next:hover:after {\n  content: \"»\";\n}\n.rc-pagination-prev,\n.rc-pagination-jump-prev,\n.rc-pagination-jump-next {\n  margin-right: 8px;\n}\n.rc-pagination-prev,\n.rc-pagination-next,\n.rc-pagination-jump-prev,\n.rc-pagination-jump-next {\n  cursor: pointer;\n  color: #666;\n  font-size: 10px;\n  border-radius: 6px;\n  list-style: none;\n  min-width: 28px;\n  height: 28px;\n  line-height: 28px;\n  float: left;\n  text-align: center;\n}\n.rc-pagination-prev a:after {\n  content: \"‹\";\n  display: block;\n}\n.rc-pagination-next a:after {\n  content: \"›\";\n  display: block;\n}\n.rc-pagination-prev,\n.rc-pagination-next {\n  border: 1px solid #d9d9d9;\n  font-size: 18px;\n}\n.rc-pagination-prev a,\n.rc-pagination-next a {\n  color: #666;\n}\n.rc-pagination-prev a:after,\n.rc-pagination-next a:after {\n  margin-top: -1px;\n}\n.rc-pagination-disabled {\n  cursor: not-allowed;\n}\n.rc-pagination-disabled a {\n  color: #ccc;\n}\n.rc-pagination-options {\n  float: left;\n  margin-left: 15px;\n}\n.rc-pagination-options-size-changer {\n  float: left;\n  width: 80px;\n}\n.rc-pagination-options-quick-jumper {\n  float: left;\n  margin-left: 16px;\n  height: 28px;\n  line-height: 28px;\n}\n.rc-pagination-options-quick-jumper input {\n  margin: 0 8px;\n  box-sizing: border-box;\n  background-color: #fff;\n  border-radius: 6px;\n  border: 1px solid #d9d9d9;\n  outline: none;\n  padding: 3px 12px;\n  width: 50px;\n  height: 28px;\n}\n.rc-pagination-options-quick-jumper input:hover {\n  border-color: #2db7f5;\n}\n.rc-pagination-simple .rc-pagination-prev,\n.rc-pagination-simple .rc-pagination-next {\n  border: none;\n  height: 24px;\n  line-height: 24px;\n  margin: 0;\n  font-size: 18px;\n}\n.rc-pagination-simple .rc-pagination-simple-pager {\n  float: left;\n  margin-right: 8px;\n}\n.rc-pagination-simple .rc-pagination-simple-pager .rc-pagination-slash {\n  margin: 0 10px;\n}\n.rc-pagination-simple .rc-pagination-simple-pager input {\n  margin: 0 8px;\n  box-sizing: border-box;\n  background-color: #fff;\n  border-radius: 6px;\n  border: 1px solid #d9d9d9;\n  outline: none;\n  padding: 5px 8px;\n  width: 30px;\n  min-height: 20px;\n}\n.rc-pagination-simple .rc-pagination-simple-pager input:hover {\n  border-color: #2db7f5;\n}\n", ""]);

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isIE9 = memoize(function() {
			return /msie 9\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isIE9();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function () {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	function replaceText(source, id, replacement) {
		var boundaries = ["/** >>" + id + " **/", "/** " + id + "<< **/"];
		var start = source.lastIndexOf(boundaries[0]);
		var wrappedReplacement = replacement
			? (boundaries[0] + replacement + boundaries[1])
			: "";
		if (source.lastIndexOf(boundaries[0]) >= 0) {
			var end = source.lastIndexOf(boundaries[1]) + boundaries[1].length;
			return source.slice(0, start) + wrappedReplacement + source.slice(end);
		} else {
			return source + wrappedReplacement;
		}
	}
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(styleElement.styleSheet.cssText, index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap && typeof btoa === "function") {
			try {
				css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
				css = "@import url(\"data:text/css;base64," + btoa(css) + "\")";
			} catch(e) {}
		}
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 6 */,
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// do not modify this file
	'use strict';
	
	module.exports = __webpack_require__(9);

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// export this package's api
	'use strict';
	
	module.exports = __webpack_require__(10);

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(11);
	var Pager = __webpack_require__(12);
	var Options = __webpack_require__(13);
	var KEYCODE = __webpack_require__(14);
	
	function noop() {}
	
	var Pagination = (function (_React$Component) {
	  _inherits(Pagination, _React$Component);
	
	  function Pagination(props) {
	    var _this = this;
	
	    _classCallCheck(this, Pagination);
	
	    _get(Object.getPrototypeOf(Pagination.prototype), 'constructor', this).call(this, props);
	
	    this.state = {
	      current: props.current,
	      _current: props.current,
	      pageSize: props.pageSize
	    };
	
	    ['render', '_handleChange', '_handleKeyUp', '_handleKeyDown', '_changePageSize', '_isValid', '_prev', '_next', '_hasPrev', '_hasNext', '_jumpPrev', '_jumpNext', '_canJumpPrev', '_canJumpNext'].forEach(function (method) {
	      return _this[method] = _this[method].bind(_this);
	    });
	  }
	
	  _createClass(Pagination, [{
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      if ('current' in nextProps) {
	        this.setState({
	          current: nextProps.current
	        });
	      }
	
	      if ('pageSize' in nextProps) {
	        this.setState({
	          pageSize: nextProps.pageSize
	        });
	      }
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	
	      var prefixCls = props.prefixCls;
	      var allPages = this._calcPage();
	      var pagerList = [];
	      var jumpPrev = null;
	      var jumpNext = null;
	
	      if (props.simple) {
	        return React.createElement(
	          'ul',
	          { className: prefixCls + ' ' + prefixCls + '-simple ' + props.className },
	          React.createElement(
	            'li',
	            { onClick: this._prev, className: (this._hasPrev() ? '' : prefixCls + '-disabled ') + (prefixCls + '-prev') },
	            React.createElement('a', null)
	          ),
	          React.createElement(
	            'div',
	            { className: prefixCls + '-simple-pager' },
	            React.createElement('input', { type: "text", value: this.state._current, onKeyDown: this._handleKeyDown, onKeyUp: this._handleKeyUp, onChange: this._handleKeyUp }),
	            React.createElement(
	              'span',
	              { className: prefixCls + '-slash' },
	              '／'
	            ),
	            allPages
	          ),
	          React.createElement(
	            'li',
	            { onClick: this._next, className: (this._hasNext() ? '' : prefixCls + '-disabled ') + (prefixCls + '-next') },
	            React.createElement('a', null)
	          )
	        );
	      }
	
	      if (allPages <= 9) {
	        for (var i = 1; i <= allPages; i++) {
	          var active = this.state.current === i;
	          pagerList.push(React.createElement(Pager, { rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, i), key: i, page: i, active: active }));
	        }
	      } else {
	        jumpPrev = React.createElement(
	          'li',
	          { key: "prev", onClick: this._jumpPrev, className: prefixCls + '-jump-prev' },
	          React.createElement('a', null)
	        );
	        jumpNext = React.createElement(
	          'li',
	          { key: "next", onClick: this._jumpNext, className: prefixCls + '-jump-next' },
	          React.createElement('a', null)
	        );
	
	        var current = this.state.current;
	
	        // TODO: need optimization
	        if (current <= 5) {
	          // do not show first •••
	          for (var i = 1; i <= 5; i++) {
	            var active = current === i;
	            pagerList.push(React.createElement(Pager, { rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, i), key: i, page: i, active: active }));
	          }
	          pagerList.push(jumpNext);
	          pagerList.push(React.createElement(Pager, { rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, allPages), key: allPages, page: allPages, active: false }));
	        } else if (allPages - current < 5) {
	          // do not show last •••
	          pagerList.push(React.createElement(Pager, { rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, 1), key: 1, page: 1, active: false }));
	          pagerList.push(jumpPrev);
	          for (var i = allPages - 4; i <= allPages; i++) {
	            var active = current === i;
	            pagerList.push(React.createElement(Pager, { rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, i), key: i, page: i, active: active }));
	          }
	        } else {
	          // show both •••
	          pagerList.push(React.createElement(Pager, { rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, 1), key: 1, page: 1, active: false }));
	          pagerList.push(jumpPrev);
	          for (var i = current - 2; i <= current + 2; i++) {
	            var active = current === i;
	            pagerList.push(React.createElement(Pager, { rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, i), key: i, page: i, active: active }));
	          }
	          pagerList.push(jumpNext);
	          pagerList.push(React.createElement(Pager, { rootPrefixCls: prefixCls, onClick: this._handleChange.bind(this, allPages), key: allPages, page: allPages, active: false }));
	        }
	      }
	
	      return React.createElement(
	        'ul',
	        { className: prefixCls + ' ' + props.className,
	          unselectable: "unselectable" },
	        React.createElement(
	          'li',
	          { onClick: this._prev, className: (this._hasPrev() ? '' : prefixCls + '-disabled ') + (prefixCls + '-prev') },
	          React.createElement('a', null)
	        ),
	        pagerList,
	        React.createElement(
	          'li',
	          { onClick: this._next, className: (this._hasNext() ? '' : prefixCls + '-disabled ') + (prefixCls + '-next') },
	          React.createElement('a', null)
	        ),
	        React.createElement(Options, { rootPrefixCls: prefixCls,
	          selectComponentClass: props.selectComponentClass,
	          selectPrefixCls: props.selectPrefixCls,
	          changeSize: this.props.showSizeChanger ? this._changePageSize.bind(this) : null,
	          current: this.state.current,
	          quickGo: this.props.showQuickJumper ? this._handleChange.bind(this) : null })
	      );
	    }
	
	    // private methods
	
	  }, {
	    key: '_calcPage',
	    value: function _calcPage() {
	      return Math.floor((this.props.total - 1) / this.state.pageSize) + 1;
	    }
	  }, {
	    key: '_isValid',
	    value: function _isValid(page) {
	      return typeof page === 'number' && page >= 1 && page <= this._calcPage() && page !== this.state.current;
	    }
	  }, {
	    key: '_handleKeyDown',
	    value: function _handleKeyDown(evt) {
	      if (evt.keyCode === KEYCODE.ARROW_UP || evt.keyCode === KEYCODE.ARROW_DOWN) {
	        evt.preventDefault();
	      }
	    }
	  }, {
	    key: '_handleKeyUp',
	    value: function _handleKeyUp(evt) {
	      var _val = evt.target.value;
	      var val = undefined;
	
	      if (_val === '') {
	        val = _val;
	      } else if (isNaN(Number(_val))) {
	        val = this.state._current;
	      } else {
	        val = Number(_val);
	      }
	
	      this.setState({
	        _current: val
	      });
	
	      if (evt.keyCode === KEYCODE.ENTER) {
	        this._handleChange(val);
	      } else if (evt.keyCode === KEYCODE.ARROW_UP) {
	        this._handleChange(val - 1);
	      } else if (evt.keyCode === KEYCODE.ARROW_DOWN) {
	        this._handleChange(val + 1);
	      }
	    }
	  }, {
	    key: '_changePageSize',
	    value: function _changePageSize(size) {
	      if (typeof size === 'number') {
	        this.setState({
	          pageSize: size
	        });
	      }
	    }
	  }, {
	    key: '_handleChange',
	    value: function _handleChange(page) {
	      if (this._isValid(page)) {
	        this.setState({
	          current: page,
	          _current: page
	        });
	        this.props.onChange(page);
	      }
	    }
	  }, {
	    key: '_prev',
	    value: function _prev() {
	      if (this._hasPrev()) {
	        this._handleChange(this.state.current - 1);
	      }
	    }
	  }, {
	    key: '_next',
	    value: function _next() {
	      if (this._hasNext()) {
	        this._handleChange(this.state.current + 1);
	      }
	    }
	  }, {
	    key: '_jumpPrev',
	    value: function _jumpPrev() {
	      if (this._canJumpPrev()) {
	        this._handleChange(this.state.current - 5);
	      }
	    }
	  }, {
	    key: '_jumpNext',
	    value: function _jumpNext() {
	      if (this._canJumpNext()) {
	        this._handleChange(this.state.current + 5);
	      }
	    }
	  }, {
	    key: '_hasPrev',
	    value: function _hasPrev() {
	      return this.state.current > 1;
	    }
	  }, {
	    key: '_hasNext',
	    value: function _hasNext() {
	      return this.state.current < this._calcPage();
	    }
	  }, {
	    key: '_canJumpPrev',
	    value: function _canJumpPrev() {
	      return this.state.current > 5;
	    }
	  }, {
	    key: '_canJumpNext',
	    value: function _canJumpNext() {
	      return this._calcPage() - this.state.current > 5;
	    }
	  }]);
	
	  return Pagination;
	})(React.Component);
	
	Pagination.propTypes = {
	  current: React.PropTypes.number,
	  total: React.PropTypes.number,
	  pageSize: React.PropTypes.number,
	  onChange: React.PropTypes.func,
	  showSizeChanger: React.PropTypes.bool,
	  selectComponentClass: React.PropTypes.func,
	  showQuickJumper: React.PropTypes.bool
	};
	
	Pagination.defaultProps = {
	  current: 1,
	  total: 0,
	  pageSize: 10,
	  onChange: noop,
	  className: '',
	  selectPrefixCls: 'rc-select',
	  prefixCls: 'rc-pagination',
	  selectComponentClass: null,
	  showQuickJumper: false,
	  showSizeChanger: false
	};
	
	module.exports = Pagination;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(11);
	
	var Pager = (function (_React$Component) {
	  _inherits(Pager, _React$Component);
	
	  function Pager() {
	    _classCallCheck(this, Pager);
	
	    _get(Object.getPrototypeOf(Pager.prototype), 'constructor', this).apply(this, arguments);
	  }
	
	  _createClass(Pager, [{
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      var prefixCls = props.rootPrefixCls + '-item';
	      var cls = prefixCls + ' ' + prefixCls + '-' + props.page;
	
	      if (props.active) {
	        cls = cls + ' ' + prefixCls + '-active';
	      }
	      return React.createElement(
	        'li',
	        { className: cls, onClick: props.onClick },
	        React.createElement(
	          'a',
	          null,
	          props.page
	        )
	      );
	    }
	  }]);
	
	  return Pager;
	})(React.Component);
	
	Pager.propTypes = {
	  page: React.PropTypes.number,
	  active: React.PropTypes.bool
	};
	
	module.exports = Pager;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var React = __webpack_require__(11);
	var KEYCODE = __webpack_require__(14);
	
	var Options = (function (_React$Component) {
	  _inherits(Options, _React$Component);
	
	  function Options(props) {
	    var _this = this;
	
	    _classCallCheck(this, Options);
	
	    _get(Object.getPrototypeOf(Options.prototype), 'constructor', this).call(this, props);
	    ['_quickGo', '_changeSize'].map(function (method) {
	      return _this[method] = _this[method].bind(_this);
	    });
	  }
	
	  _createClass(Options, [{
	    key: 'render',
	    value: function render() {
	      var props = this.props;
	      var prefixCls = props.rootPrefixCls + '-options';
	      var changeSize = props.changeSize;
	      var quickGo = props.quickGo;
	      var Select = props.selectComponentClass;
	      var changeSelect = null;
	      var goInput = null;
	
	      if (!(changeSize || quickGo)) {
	        return null;
	      }
	
	      if (changeSize && Select) {
	        var _Option = Select.Option;
	        changeSelect = React.createElement(
	          Select,
	          {
	            prefixCls: props.selectPrefixCls, showSearch: false,
	            className: prefixCls + '-size-changer',
	            optionLabelProp: "children",
	            defaultValue: "10", onChange: this._changeSize },
	          React.createElement(
	            _Option,
	            { value: "10" },
	            '10 条/页'
	          ),
	          React.createElement(
	            _Option,
	            { value: "20" },
	            '20 条/页'
	          ),
	          React.createElement(
	            _Option,
	            { value: "30" },
	            '30 条/页'
	          ),
	          React.createElement(
	            _Option,
	            { value: "40" },
	            '40 条/页'
	          )
	        );
	      }
	
	      if (quickGo) {
	        goInput = React.createElement(
	          'div',
	          { className: prefixCls + '-quick-jumper' },
	          '跳至',
	          React.createElement('input', { type: "text", defaultValue: props.current, onKeyDown: this._checkValid, onChange: this._quickGo, onKeyUp: this._quickGo }),
	          '页'
	        );
	      }
	
	      return React.createElement(
	        'div',
	        { className: '' + prefixCls },
	        changeSelect,
	        goInput
	      );
	    }
	  }, {
	    key: '_changeSize',
	    value: function _changeSize(value) {
	      this.props.changeSize(Number(value));
	    }
	  }, {
	    key: '_checkValid',
	    value: function _checkValid(evt) {
	      var keyCode = evt.keyCode;
	      var valid = keyCode >= KEYCODE.ZERO && keyCode <= KEYCODE.NINE || keyCode >= KEYCODE.NUMPAD_ZERO && keyCode <= KEYCODE.NUMPAD_NINE || keyCode === KEYCODE.DELETE || keyCode === KEYCODE.BACKSPACE || keyCode === KEYCODE.ENTER;
	
	      if (!valid) {
	        evt.preventDefault();
	      }
	    }
	  }, {
	    key: '_quickGo',
	    value: function _quickGo(evt) {
	      var ENTER_KEY = 13;
	      var val = Number(evt.target.value);
	
	      if (evt.keyCode === ENTER_KEY) {
	        this.props.quickGo(val);
	      }
	    }
	  }]);
	
	  return Options;
	})(React.Component);
	
	Options.propTypes = {
	  changeSize: React.PropTypes.func,
	  quickGo: React.PropTypes.func,
	
	  selectComponentClass: React.PropTypes.func,
	  current: React.PropTypes.number
	};
	
	module.exports = Options;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  ZERO: 48,
	  NINE: 57,
	
	  NUMPAD_ZERO: 96,
	  NUMPAD_NINE: 105,
	
	  BACKSPACE: 8,
	  DELETE: 46,
	  ENTER: 13,
	
	  ARROW_UP: 38,
	  ARROW_DOWN: 40
	};

/***/ }
/******/ ]);
//# sourceMappingURL=common.js.map