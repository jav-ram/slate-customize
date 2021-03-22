"use strict";function _typeof(obj) {"@babel/helpers - typeof";if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var React = _interopRequireWildcard(require("react"));

var _slate = require("slate");
var _slateReact = require("slate-react");
var _css = require("@emotion/css");

var _extras = require("./extras.jsx");
var _extras2 = require("../../customize/extras");var _templateObject;function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _taggedTemplateLiteral(strings, raw) {if (!raw) {raw = strings.slice(0);}return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));}

var HoveringToolbar = function HoveringToolbar(_ref) {var value = _ref.value;
  var ref = (0, React.useRef)();
  var editor = (0, _slateReact.useSlate)();

  (0, React.useEffect)(function () {
    var el = ref.current;var
    selection = editor.selection;

    if (!el) {
      return;
    }

    // get selection
    var selected;
    if (selection) {
      selected = (0, _extras2.getNode)(value, selection.anchor.path);
    }

    if (
    !selection ||
    !_slateReact.ReactEditor.isFocused(editor) ||
    !selected.element)
    {

      el.removeAttribute('style');
      return;
    }

    var domSelection = window.getSelection();
    var domRange = domSelection.getRangeAt(0);
    var rect = domRange.getBoundingClientRect();
    el.style.opacity = '1';
    el.style.top = "".concat(rect.top + window.pageYOffset - el.offsetHeight, "px");
    el.style.left = "".concat(rect.left +
    window.pageXOffset -
    el.offsetWidth / 2 +
    rect.width / 2, "px");
  });

  return /*#__PURE__*/(
    React.createElement(_extras.Portal, null, /*#__PURE__*/
    React.createElement(_extras.Menu, {
      ref: ref,
      className: (0, _css.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n                padding: 8px 7px 6px;\n                position: absolute;\n                z-index: 1;\n                top: -10000px;\n                left: -10000px;\n                margin-top: -6px;\n                opacity: 0;\n                background-color: yellow;\n                border-radius: 4px;\n                transition: opacity 0.75s;\n                display: flex;\n              "]))) }, /*#__PURE__*/













    React.createElement("h1", null, " hello "))));



};var _default =


HoveringToolbar;exports.default = _default;