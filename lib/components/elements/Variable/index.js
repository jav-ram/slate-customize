"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireDefault(require("react"));
var _slate = require("slate");
var _vsc = require("react-icons/vsc");

var _actionGenerator = require("../../../customize/elements/actionGenerator");

var _variableModule = _interopRequireDefault(require("./variable.module.css"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}if (module.hot) {module.hot.accept("./variable.module.css", function () {require("./variable.module.css");});}

var name = 'variable';
var command = 'var';
var type = 'inline';

var set = (0, _actionGenerator.SetGenerator)({ name: name, type: type });
var unset = (0, _actionGenerator.UnsetGenerator)({ name: name, type: type });
var insert = (0, _actionGenerator.InsertGenerator)({ name: name, type: type });

var create = function create(_ref) {var ref = _ref.ref;return {
    element: name,
    type: type,
    ref: ref,
    text: ref };};


var Element = function Element(props) {return /*#__PURE__*/(
    _react.default.createElement("span", _extends({ className: _variableModule.default.wrapper }, props.attributes),
    props.children));};




var definition = {
  name: name,
  command: command,
  icon: _vsc.VscSymbolVariable,
  component: Element,
  type: type,

  create: create,

  set: set,
  unset: unset,
  insert: insert };var _default =


definition;exports.default = _default;