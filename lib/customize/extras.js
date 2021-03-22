"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getNode = exports.iterateValue = exports.toggleMark = exports.CleanHistory = void 0;var _slate = require("slate");function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e2) {throw _e2;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e3) {didErr = true;err = _e3;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}

var isMarkActive = function isMarkActive(editor, key) {
  var marks = _slate.Editor.marks(editor);
  return marks ? marks[key] === true : false;
};

var CleanHistory = function CleanHistory(HistoryEditor) {
  var newEditor = HistoryEditor;
  newEditor.history = { undos: [], redos: [] };
  return newEditor;
};exports.CleanHistory = CleanHistory;

var toggleMark = function toggleMark(editor, key) {
  isMarkActive(editor, key) ? _slate.Editor.removeMark(editor, key) : _slate.Editor.addMark(editor, key);
};exports.toggleMark = toggleMark;

var iterateValue = function iterateValue(action) {
  var loop = function loop(_ref) {var editor = _ref.editor,value = _ref.value,_ref$path = _ref.path,path = _ref$path === void 0 ? [] : _ref$path;
    var children = undefined;
    if (value.children) {
      children = value.children;
    } else if (value.length > 0) {
      children = value;
    }
    if (children) {
      for (var _i = 0, _Object$entries = Object.entries(children); _i < _Object$entries.length; _i++) {var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),i = _Object$entries$_i[0],node = _Object$entries$_i[1];
        loop({
          editor: editor,
          value: node,
          path: [].concat(_toConsumableArray(path), [parseInt(i)]) });

      }
    }
    action(editor, value, path);
  };
  return loop;
};exports.iterateValue = iterateValue;

var getNode = function getNode(root, path) {
  var pos = path;
  var current = root;var _iterator = _createForOfIteratorHelper(
  pos),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var i = _step.value;
      var nCurrent = current.children ? current.children[i] : current[i];
      if (!nCurrent || !nCurrent.element && nCurrent.text) {
        return current;
      }
      current = nCurrent;
    }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
  return current;
};exports.getNode = getNode;