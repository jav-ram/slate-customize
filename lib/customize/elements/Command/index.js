"use strict";function _typeof(obj) {"@babel/helpers - typeof";if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.unset = void 0;var React = _interopRequireWildcard(require("react"));

var _slate = require("slate");
var _md = require("react-icons/md");

var _menu = _interopRequireDefault(require("./menu"));
var _index = require("../index");
var _actionGenerator = require("../../../customize/elements/actionGenerator");
var _commandModule = _interopRequireDefault(require("./command.module.css"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}if (module.hot) {module.hot.accept("./command.module.css", function () {require("./command.module.css");});}

var name = 'command';
var command = '';
var type = 'inline';

var set = function set(_ref) {var event = _ref.event,editor = _ref.editor,at = _ref.at;
  var options = {
    match: function match(n) {return _slate.Text.isText(n) && n.type !== type;},
    split: true };

  if (at) options.at = at;
  _slate.Transforms.setNodes(
  editor,
  { element: name },
  options);

};

var unset = function unset(_ref2) {var event = _ref2.event,editor = _ref2.editor,at = _ref2.at;
  var options = {
    match: function match(n) {return _slate.Text.isText(n) && n.type !== type;},
    split: true };

  if (at) options.at = at;
  _slate.Transforms.unsetNodes(
  editor,
  ['element'],
  options);

};exports.unset = unset;

var insert = (0, _actionGenerator.InsertGenerator)({ name: name, type: type });

var Placeholder = function Placeholder(_ref3) {var editor = _ref3.editor,props = _objectWithoutProperties(_ref3, ["editor"]);
  if (props.condition) {
    var path = editor.selection.anchor.path;
    return /*#__PURE__*/(
      React.createElement("a", {
        contentEditable: false,
        className: _commandModule.default.placeholder,
        onClick: function onClick() {return _slate.Transforms.select(editor, { offset: 1, path: path });} }, /*#__PURE__*/

      React.createElement("span", {
        style: {
          pointerEvents: "none",
          display: "inline",
          width: "0",
          maxWidth: "100%",
          whiteSpace: "nowrap",
          opacity: 0.333,
          verticalAlign: "text-top",

          // placeholders shouldn't interfere with height
          // of the object
          height: 0 },

        contentEditable: false },

      props.children)));



  }
  return null;
};

var Element = function Element(props) {
  var ref = (0, React.useRef)();
  var text = props.children.props.text.text;
  var editor = props.editor;
  var elements = props.elements ? props.elements : _index.Elements; // get default or receive from editor
  return /*#__PURE__*/(
    React.createElement("span", {
      ref: ref,
      className: _commandModule.default.command }, /*#__PURE__*/

    React.createElement("span", props.attributes,
    props.children), /*#__PURE__*/

    React.createElement(Placeholder, { editor: editor, condition: text === '/' || text === '/ ' }, " Insert command..."), /*#__PURE__*/

    React.createElement(_menu.default, { text: text, command: ref, elements: elements })));


};

var definition = {
  name: name,
  command: command,
  component: Element,

  create: function create() {return { element: 'command', type: 'inline' };},

  type: type,
  set: set,
  unset: unset,
  insert: insert };var _default =


definition;exports.default = _default;