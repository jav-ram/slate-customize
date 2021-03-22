"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.subObjectMatcher = void 0;function _typeof(obj) {"@babel/helpers - typeof";if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}function _createForOfIteratorHelper(o, allowArrayLike) {var it;if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = o[Symbol.iterator]();}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it.return != null) it.return();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}
var subObjectMatcher = function subObjectMatcher(_ref) {var options = _ref.options,includes = _ref.includes;
  // $FlowIgnore
  var list = Array.isArray(options) ? options : Object.values(options);
  var check = includes ? includes : undefined;

  return function (t) {
    var text = t.replace("/", "");
    var matches = [];
    var substrRegex = new RegExp(text, 'i');var _iterator = _createForOfIteratorHelper(
    list),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var item = _step.value;
        if (item) {
          if (_typeof(item) === 'object') {
            if (check) {var _iterator2 = _createForOfIteratorHelper(
              check),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var key = _step2.value;
                  var value = item[key];
                  if (substrRegex.test(String(value))) {
                    matches.push(item);
                    break;
                  }
                }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
            } else {
              for (var _key in item) {
                var _value = item[_key];
                if (substrRegex.test(String(_value))) {
                  matches.push(item);
                  break;
                }
              }
            }
          } else {
            if (substrRegex.test(String(item))) {
              matches.push(item);
            }
          }
        }
      }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
    return matches;
  };
};exports.subObjectMatcher = subObjectMatcher;