"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Menu = exports.Portal = void 0;var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _css = require("@emotion/css");var _templateObject;function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}function _taggedTemplateLiteral(strings, raw) {if (!raw) {raw = strings.slice(0);}return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}

var Portal = function Portal(_ref) {var children = _ref.children,ref = _ref.ref;return /*#__PURE__*/_reactDom.default.createPortal(children, ref || document.body);};exports.Portal = Portal;

var Menu = /*#__PURE__*/_react.default.forwardRef(
function (_ref2,

ref) {var className = _ref2.className,props = _objectWithoutProperties(_ref2, ["className"]);return /*#__PURE__*/(

    _react.default.createElement("div", _extends({},
    props, {
      ref: ref,
      className: (0, _css.cx)(
      className, (0,
      _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n          & > * {\n            display: inline-block;\n          }\n          & > * + * {\n            margin-left: 15px;\n          }\n        "])))) })));});exports.Menu = Menu;