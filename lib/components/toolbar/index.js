"use strict";function _typeof(obj) {"@babel/helpers - typeof";if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var React = _interopRequireWildcard(require("react"));function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}


var ToolbarButton = function ToolbarButton(_ref) {var editor = _ref.editor,Icon = _ref.Icon,action = _ref.action;return /*#__PURE__*/(
    React.createElement("button", { onClick: function onClick(event) {return action({ event: event, editor: editor });} }, /*#__PURE__*/
    React.createElement(Icon, null)));};



var Toolbar = function Toolbar(_ref2) {var editor = _ref2.editor,options = _ref2.options;return /*#__PURE__*/(
    React.createElement("div", null,
    Object.values(options).map(
    // $FlowIgnore
    function (option) {return !option.hideInToolbar ? /*#__PURE__*/
      React.createElement(ToolbarButton, { key: option.name, editor: editor, Icon: option.icon, action: option.action }) :
      null;})));};var _default =





Toolbar;exports.default = _default;