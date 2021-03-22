"use strict";function _typeof(obj) {"@babel/helpers - typeof";if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}Object.defineProperty(exports, "__esModule", { value: true });exports.MakeLeafRenderer = exports.MakeElementRenderer = void 0;var React = _interopRequireWildcard(require("react"));

var _elements = require("../components/elements");function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}

var DefaultElement = function DefaultElement(props) {return /*#__PURE__*/React.createElement("p", props.attributes, props.children);};

var MakeElementRenderer = function MakeElementRenderer(elements) {
  var ElementRenderer = function ElementRenderer(props, editor) {
    var name = props.element.element;
    var element = elements[name];

    if (element) {
      var Component = element.component;
      return /*#__PURE__*/React.createElement(Component, _extends({ editor: editor }, props));
    } else {
      // default
      return /*#__PURE__*/React.createElement(DefaultElement, props);
    }
  };
  return ElementRenderer;
};exports.MakeElementRenderer = MakeElementRenderer;

var MakeLeafRenderer = function MakeLeafRenderer(elements) {
  var LeafRenderer = function LeafRenderer(props, editor) {
    var name = props.leaf.element;
    var leaf = elements[name];
    if (leaf) {
      var Leaf = leaf.component;
      return /*#__PURE__*/React.createElement(Leaf, _extends({
        editor: editor },
      props, {
        elements: leaf.name === "command" ? elements : undefined }));

    } else
    {
      // default
      return /*#__PURE__*/React.createElement("span", props.attributes, props.children);
    }
  };
  return LeafRenderer;
};exports.MakeLeafRenderer = MakeLeafRenderer;