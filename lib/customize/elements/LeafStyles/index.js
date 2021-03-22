"use strict";function _typeof(obj) {"@babel/helpers - typeof";if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}Object.defineProperty(exports, "__esModule", { value: true });exports.UnderlineDefinition = exports.ItalicDefinition = exports.BoldDefinition = exports.Richtext = void 0;var React = _interopRequireWildcard(require("react"));
var _bold = _interopRequireDefault(require("./bold"));
var _italic = _interopRequireDefault(require("./italic"));
var _underline = _interopRequireDefault(require("./underline"));

var _leafModule = _interopRequireDefault(require("./leaf.module.css"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}if (module.hot) {module.hot.accept("./leaf.module.css", function () {require("./leaf.module.css");});}

var Richtext = function Richtext(props) {return /*#__PURE__*/(
    React.createElement("span", _extends({}, props.attributes, { className: "\n        ".concat(
      props.leaf.element === 'bold' || props.leaf.bold ? _leafModule.default.bold : '', "\n        ").concat(
      props.leaf.element === 'italic' || props.leaf.italic ? _leafModule.default.italic : '', "\n        ").concat(
      props.leaf.element === 'underline' || props.leaf.underline ? _leafModule.default.underline : '', "\n    ") }),

    props.children));};exports.Richtext = Richtext;



var BoldDefinition = _bold.default;exports.BoldDefinition = BoldDefinition;
var ItalicDefinition = _italic.default;exports.ItalicDefinition = ItalicDefinition;
var UnderlineDefinition = _underline.default;exports.UnderlineDefinition = UnderlineDefinition;