"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.InsertGenerator = exports.UnsetGenerator = exports.SetGenerator = void 0;var _slateReact = require("slate-react");
var _slate = require("slate");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}

var generateDefaultMatch = function generateDefaultMatch(
editor,
value,
key)
{
  return function () {var _Editor$nodes =
    _slate.Editor.nodes(editor, {
      match: function match(n) {return n[key] === value;} }),_Editor$nodes2 = _slicedToArray(_Editor$nodes, 1),match = _Editor$nodes2[0];

    return match;
  };
};

var SetGenerator = function SetGenerator(_ref)





{var name = _ref.name,type = _ref.type,_ref$isNested = _ref.isNested,isNested = _ref$isNested === void 0 ? false : _ref$isNested,_ref$preventDefault = _ref.preventDefault,preventDefault = _ref$preventDefault === void 0 ? false : _ref$preventDefault,_ref$actionDef = _ref.actionDef,actionDef = _ref$actionDef === void 0 ? {} : _ref$actionDef;
  var set = function set(_ref2) {var event = _ref2.event,editor = _ref2.editor,at = _ref2.at,meta = _ref2.meta;
    var defaultMatch = generateDefaultMatch(editor, name, 'element');

    preventDefault && event && event.preventDefault();
    actionDef.after && actionDef.after({ event: event, editor: editor, at: at });

    var match = actionDef.match ? actionDef.match : defaultMatch;
    var split = actionDef.split ? actionDef.split : true;

    if (isNested) {
      var options = { split: split };
      if (at) options.at = at;
      var list = { type: type, element: name, children: [{ text: '' }] };
      _slate.Transforms.wrapNodes(editor, list, options);
    } else {
      var _options = { match: function match(n) {return _slate.Text.isText(n) && n.type !== type;}, split: true };
      if (at) _options.at = at;
      _slate.Transforms.setNodes(
      editor,
      { element: name },
      _options);

    }
  };

  return set;
};exports.SetGenerator = SetGenerator;

var UnsetGenerator = function UnsetGenerator(_ref3)





{var name = _ref3.name,type = _ref3.type,_ref3$isNested = _ref3.isNested,isNested = _ref3$isNested === void 0 ? false : _ref3$isNested,_ref3$preventDefault = _ref3.preventDefault,preventDefault = _ref3$preventDefault === void 0 ? false : _ref3$preventDefault,_ref3$actionDef = _ref3.actionDef,actionDef = _ref3$actionDef === void 0 ? {} : _ref3$actionDef;
  var unset = function unset(_ref4) {var event = _ref4.event,editor = _ref4.editor,at = _ref4.at,meta = _ref4.meta;
    var defaultMatch = generateDefaultMatch(editor, name, 'element');

    preventDefault && event && event.preventDefault();
    actionDef.after && actionDef.after({ event: event, editor: editor, at: at });

    var match = actionDef.match ? actionDef.match : defaultMatch;
    var split = actionDef.split ? actionDef.split : true;

    var options = { match: function match(n) {return _slate.Text.isText(n) && n.type !== type;} };
    if (at) options.at = at;
    _slate.Transforms.unsetNodes(
    editor,
    ['element'],
    options);

  };

  return unset;
};exports.UnsetGenerator = UnsetGenerator;

var InsertGenerator = function InsertGenerator(_ref5)





{var name = _ref5.name,type = _ref5.type,_ref5$isNested = _ref5.isNested,isNested = _ref5$isNested === void 0 ? false : _ref5$isNested,_ref5$preventDefault = _ref5.preventDefault,preventDefault = _ref5$preventDefault === void 0 ? false : _ref5$preventDefault,_ref5$actionDef = _ref5.actionDef,actionDef = _ref5$actionDef === void 0 ? {} : _ref5$actionDef;
  var insert = function insert(_ref6) {var event = _ref6.event,editor = _ref6.editor,at = _ref6.at,_ref6$meta = _ref6.meta,meta = _ref6$meta === void 0 ? {} : _ref6$meta;
    var metaOptions = {};
    var node = { element: name };
    if (meta && meta.options) metaOptions = meta.options;
    preventDefault && event && event.preventDefault();

    var options = _objectSpread({ split: true }, metaOptions);
    if (at) options.at = at;

    _slate.Transforms.insertNodes(
    editor, _objectSpread(_objectSpread({},
    node), meta.element),
    options);

  };
  return insert;
};exports.InsertGenerator = InsertGenerator;