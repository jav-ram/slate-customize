"use strict";function _typeof(obj) {"@babel/helpers - typeof";if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var React = _interopRequireWildcard(require("react"));
var _slate = require("slate");
var _vsc = require("react-icons/vsc");

var _actionGenerator = require("../../../customize/elements/actionGenerator");

var _listModule = _interopRequireDefault(require("./list.module.css"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}if (module.hot) {module.hot.accept("./list.module.css", function () {require("./list.module.css");});}

var create = function create(_ref) {var children = _ref.children,refs = _ref.refs;return {
    element: name,
    type: type,
    children: children,
    refs: refs };};


var name = 'list';
var command = 'list';
var type = 'inline';

var set = (0, _actionGenerator.SetGenerator)({ name: name, type: type });
var unset = (0, _actionGenerator.UnsetGenerator)({ name: name, type: type });
var insert = (0, _actionGenerator.InsertGenerator)({ name: name, type: type });

var Element = function Element(props) {return /*#__PURE__*/(
    React.createElement("p", _extends({ className: _listModule.default.wrapper }, props.attributes),
    props.children));};



var definition = {
  name: name,
  command: command,
  type: type,
  icon: _vsc.VscSymbolArray,
  component: Element,

  create: create,

  set: set,
  unset: unset,
  insert: insert };var _default =


definition;exports.default = _default;