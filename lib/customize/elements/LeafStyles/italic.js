"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _slate = require("slate");
var _bi = require("react-icons/bi");

var _index = require("./index");
var _extras = require("../../../customize/extras.js");
var _actionGenerator = require("../../../customize/elements/actionGenerator");

var _leafModule = _interopRequireDefault(require("./leaf.module.css"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}if (module.hot) {module.hot.accept("./leaf.module.css", function () {require("./leaf.module.css");});}

var name = 'italic';
var command = 'i';
var type = 'inline';

var set = function set(_ref) {var event = _ref.event,editor = _ref.editor,at = _ref.at,meta = _ref.meta;return _slate.Editor.addMark(editor, name, true);};
var unset = function unset(_ref2) {var event = _ref2.event,editor = _ref2.editor,at = _ref2.at,meta = _ref2.meta;return _slate.Editor.removeMark(editor, name);};
var insert = (0, _actionGenerator.InsertGenerator)({ name: name, type: type });

var create = function create(_ref3) {var text = _ref3.text;return {
    element: name,
    type: type,
    italic: true,
    text: text };};



var Element = function Element(props) {return /*#__PURE__*/(
    React.createElement(_index.Richtext, props));};


var definition = {
  name: name,
  command: command,
  icon: _bi.BiItalic,
  component: Element,
  type: type,

  create: create,

  set: set,
  unset: unset,
  insert: insert };var _default =


definition;exports.default = _default;