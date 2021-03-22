"use strict";function _typeof(obj) {"@babel/helpers - typeof";if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireWildcard(require("react"));
var _isHotkey = _interopRequireDefault(require("is-hotkey"));
var _slate = require("slate");
var _slateReact = require("slate-react");

var _customize = require("../../customize");
var _render = require("../../customize/render");
var _commands = require("../../customize/commands");
var _upload = require("../../customize/serializer/upload");

var _toolbar = _interopRequireDefault(require("../toolbar"));
var _hovermenu = _interopRequireWildcard(require("../hovermenu"));
var _elements = require("../elements");
var _Command = _interopRequireDefault(require("../../customize/elements/Command"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}



var DefaultElement = function DefaultElement(props) {return /*#__PURE__*/_react.default.createElement("p", props.attributes, props.children);};

var EditorElement = function EditorElement() {var _useState =
  (0, _react.useState)({}),_useState2 = _slicedToArray(_useState, 2),file = _useState2[0],setFile = _useState2[1];var

  list = _elements.Elements.list,variable = _elements.Elements.variable,conditional = _elements.Elements.conditional,title = _elements.Elements.title;var _useState3 =

  (0, _react.useState)([
  {
    type: 'paragraph',
    children: [{ text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisl nisi, placerat nec eros ac, finibus lacinia leo. Aenean sagittis ligula molestie felis gravida, tempus placerat libero lobortis. Aenean efficitur scelerisque augue, eu gravida tellus egestas eget. Vestibulum rutrum mauris et massa blandit, sit amet semper ipsum mollis. Duis euismod sapien dolor, non consequat leo eleifend ut. Nam libero lectus, rutrum vel velit eu, semper porta diam. Integer ultricies odio id tincidunt rutrum. Duis tristique diam justo, placerat viverra leo laoreet pharetra. Aenean sed vestibulum odio, vitae sollicitudin magna. Curabitur id augue vel nisi vehicula molestie commodo at tellus. Aliquam ut bibendum mauris. Proin sed urna dolor. Vestibulum nec velit nec arcu vulputate pharetra. Praesent nibh massa, gravida sit amet dui a, ultrices maximus eros. Integer iaculis metus et velit eleifend lobortis eu quis odio. Nullam sed aliquam diam, iaculis iaculis sem.' }] }]),_useState4 = _slicedToArray(_useState3, 2),value = _useState4[0],setValue = _useState4[1];


  var editor = (0, _customize.withCustomize)((0, _slate.createEditor)(), _elements.Elements);

  var _renderElement = (0, _render.MakeElementRenderer)(_elements.Elements);
  var _renderLeaf = (0, _render.MakeLeafRenderer)(_elements.Elements);

  return /*#__PURE__*/(
    _react.default.createElement("div", { spellCheck: "false" }, /*#__PURE__*/
    _react.default.createElement("input", { type: "file", name: "file", onChange: function onChange(event) {return (0, _upload.OnChangeUpload)(editor, event, setValue);} }), /*#__PURE__*/

    _react.default.createElement(_slateReact.Slate, {
      editor: editor,
      value: value,
      onChange: function onChange(value) {
        setValue(value);
        // Save the value to Local Storage.
        console.log("-----------");
        console.log(value);
        console.log(editor.history);
        console.log("-----------");
      } }, /*#__PURE__*/


    _react.default.createElement(_slateReact.Editable, {
      renderElement: function renderElement(props) {return _renderElement(props, editor);},
      renderLeaf: function renderLeaf(props) {return _renderLeaf(props, editor);},
      onKeyDown: function onKeyDown(event) {
        (0, _commands.customizeOnKeyDown)(event, editor, value);
      } }))));




};var _default =

EditorElement;exports.default = _default;