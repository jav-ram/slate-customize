"use strict";function _typeof(obj) {"@babel/helpers - typeof";if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var React = _interopRequireWildcard(require("react"));
var _slate = require("slate");
var _bi = require("react-icons/bi");

var _index = require("./index");
var _extras = require("../../../customize/extras.js");
var _actionGenerator = require("../../../customize/elements/actionGenerator");

var _leafModule = _interopRequireDefault(require("./leaf.module.css"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}if (module.hot) {module.hot.accept("./leaf.module.css", function () {require("./leaf.module.css");});}

var name = 'bold';
var command = 'b';
var type = 'inline';

var set = function set(_ref) {var event = _ref.event,editor = _ref.editor,at = _ref.at,meta = _ref.meta;return _slate.Editor.addMark(editor, name, true);};
var unset = function unset(_ref2) {var event = _ref2.event,editor = _ref2.editor,at = _ref2.at,meta = _ref2.meta;return _slate.Editor.removeMark(editor, name);};
var insert = (0, _actionGenerator.InsertGenerator)({ name: name, type: type });

var create = function create(_ref3) {var text = _ref3.text;return {
    element: name,
    type: type,
    bold: true,
    text: text };};



var Element = function Element(props) {return /*#__PURE__*/(
    React.createElement(_index.Richtext, props));};


var definition = {
  name: name,
  command: command,
  icon: _bi.BiBold,
  component: Element,
  type: type,

  create: create,

  set: set,
  unset: unset,
  insert: insert };var _default =


definition;exports.default = _default;