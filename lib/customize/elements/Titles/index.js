"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _slate = require("slate");
var _bi = require("react-icons/bi");

var _actionGenerator = require("../../../customize/elements/actionGenerator");

var _titlesModule = _interopRequireDefault(require("./titles.module.css"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _extends() {_extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}if (module.hot) {module.hot.accept("./titles.module.css", function () {require("./titles.module.css");});}

var name = 'title';
var command = 'h1';
var type = 'block';

var set = (0, _actionGenerator.UnsetGenerator)({ name: name, type: type });
var unset = (0, _actionGenerator.UnsetGenerator)({ name: name, type: type });
var insert = (0, _actionGenerator.InsertGenerator)({ name: name, type: type });

var create = function create(_ref) {var title = _ref.title;return {
    element: name,
    type: type,
    children: [{
      text: title,
      type: 'inline' }] };};




var H1 = function H1(props) {return /*#__PURE__*/(
    React.createElement("h1", _extends({ className: _titlesModule.default.h1 }, props.attributes),
    props.children));};



var H2 = function H2(props) {return /*#__PURE__*/(
    React.createElement("h2", _extends({ className: _titlesModule.default.h2 }, props.attributes),
    props.children));};



var H3 = function H3(props) {return /*#__PURE__*/(
    React.createElement("h3", _extends({ className: _titlesModule.default.h3 }, props.attributes),
    props.children));};



var H4 = function H4(props) {return /*#__PURE__*/(
    React.createElement("h4", _extends({ className: _titlesModule.default.h4 }, props.attributes),
    props.children));};



var definition = {
  name: name,
  command: command,
  icon: _bi.BiHeading,
  component: H1,
  type: type,

  create: create,

  set: set,
  unset: unset,
  insert: insert };var _default =


definition;exports.default = _default;