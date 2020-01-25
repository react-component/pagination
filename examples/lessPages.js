webpackJsonp([10],{

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_pagination__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rc_pagination_assets_index_less__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rc_pagination_assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rc_pagination_assets_index_less__);





/* eslint func-names: 0, no-console: 0 */





var arrowPath = 'M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h' + '-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v' + '60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91' + '.5c1.9 0 3.8-0.7 5.2-2L869 536.2c14.7-12.8 14.7-35.6 0-48.4z';

var doublePath = ['M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6' + '.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1c-4.1 5.2-0' + '.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.' + '1c9.1-11.7 9.1-27.9 0-39.5z', 'M837.2 492.3L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6' + '.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1c-4.1 5.2-0' + '.4 12.9 6.3 12.9h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.' + '1c9.1-11.7 9.1-27.9 0-39.5z'];

var getSvgIcon = function getSvgIcon(path, reverse, type) {
  var paths = Array.isArray(path) ? path : [path];
  var renderPaths = paths.map(function (p, i) {
    return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement('path', { key: i, d: p });
  });
  return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
    'i',
    { className: 'custom-icon-' + type, style: {
        fontSize: '16px'
      }
    },
    __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
      'svg',
      {
        viewBox: '0 0 1024 1024',
        width: '1em',
        height: '1em',
        fill: 'currentColor',
        style: {
          verticalAlign: '-.125em',
          transform: 'rotate(' + (reverse && 180 || 0) + 'deg)'
        }
      },
      renderPaths
    )
  );
};

var nextIcon = getSvgIcon(arrowPath, false, 'next');
var prevIcon = getSvgIcon(arrowPath, true, 'prev');
var jumpNextIcon = function jumpNextIcon() {
  return getSvgIcon(doublePath, false, 'jump-next');
};
var jumpPrevIcon = function jumpPrevIcon() {
  return getSvgIcon(doublePath, true, 'jump-prev');
};

var App = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(App, _React$Component);

  function App() {
    var _ref;

    var _temp, _this, _ret;

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, App);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = App.__proto__ || Object.getPrototypeOf(App)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      current: 3,
      useIcon: true
    }, _this.onChange = function (page) {
      console.log(page);
      _this.setState({
        current: page
      });
    }, _this.toggleCustomIcon = function () {
      _this.setState({
        useIcon: !_this.state.useIcon
      });
    }, _temp), __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(App, [{
    key: 'render',
    value: function render() {
      var iconsProps = this.state.useIcon && {
        prevIcon: prevIcon,
        nextIcon: nextIcon,
        jumpPrevIcon: jumpPrevIcon,
        jumpNextIcon: jumpNextIcon
      } || {};
      return __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_pagination__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
          onChange: this.onChange,
          current: this.state.current,
          total: 80,
          showLessItems: true,
          style: { marginBottom: '2rem' }
        }, iconsProps)),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_rc_pagination__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({
          showLessItems: true,
          defaultCurrent: 1,
          total: 60
        }, iconsProps)),
        __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
          'div',
          null,
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'button',
            { onClick: this.toggleCustomIcon },
            'Toggle Custom Icon'
          ),
          __WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(
            'span',
            { style: { marginLeft: '1rem' } },
            'Is using icon: ',
            this.state.useIcon && 'true' || 'false'
          )
        )
      );
    }
  }]);

  return App;
}(__WEBPACK_IMPORTED_MODULE_5_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_5_react___default.a.createElement(App, null), document.getElementById('__react-content'));

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(137);


/***/ })

},[208]);
//# sourceMappingURL=lessPages.js.map