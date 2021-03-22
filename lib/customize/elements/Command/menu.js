"use strict";function _typeof(obj) {"@babel/helpers - typeof";if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {_typeof = function _typeof(obj) {return typeof obj;};} else {_typeof = function _typeof(obj) {return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;};}return _typeof(obj);}Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.Portal = void 0;var React = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));
var _lodash = _interopRequireDefault(require("lodash"));

var _typeahead = require("../../../customize/typeahead");

var _menuModule = _interopRequireDefault(require("./menu.module.css"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache() {if (typeof WeakMap !== "function") return null;var cache = new WeakMap();_getRequireWildcardCache = function _getRequireWildcardCache() {return cache;};return cache;}function _interopRequireWildcard(obj) {if (obj && obj.__esModule) {return obj;}if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache();if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}if (module.hot) {module.hot.accept("./menu.module.css", function () {require("./menu.module.css");});}

var Portal = function Portal(_ref) {var children = _ref.children,ref = _ref.ref;return /*#__PURE__*/_reactDom.default.createPortal(children, ref || document.body);};exports.Portal = Portal;

var Item = function Item(element) {
  return /*#__PURE__*/(
    React.createElement("div", { className: _menuModule.default.itemContainer, key: element.name }, /*#__PURE__*/
    React.createElement("div", { className: _menuModule.default.itemLeftContainer },
    element.icon ? /*#__PURE__*/React.createElement(element.icon, null) : null, /*#__PURE__*/
    React.createElement("span", { className: _menuModule.default.itemName }, " ", element.name, " ")), /*#__PURE__*/

    React.createElement("code", { className: _menuModule.default.itemCommand }, " ", element.command, " ")));


};

var filterCommand = function filterCommand(elements, text) {
  var command = text.replace('/', '').replace(' ', '');
  // $FlowIgnore
  var byName = Object.values(elements).filter(function (element) {return element.name.includes(command);});
  // $FlowIgnore
  var byCommand = Object.values(elements).filter(function (element) {return element.command.includes(command);});

  return _lodash.default.union(byName, byCommand);
};



var Menu = function Menu(_ref2) {var elements = _ref2.elements,command = _ref2.command,text = _ref2.text;
  var ref = (0, React.useRef)();
  var CommandEngine = _typeahead.subObjectMatcher < ElementDefinitionType > { options: elements, includes: ['name', 'command'] };
  (0, React.useEffect)(function () {
    var el = ref.current;

    if (!el) {
      return;
    }

    var domSelection = window.getSelection();
    var domRange = domSelection.getRangeAt(0);
    var rect = domRange.getBoundingClientRect();

    var top = rect.top + 32;
    // $FlowFixMe
    var left = command.current.offsetLeft;

    el.style.opacity = '1';
    el.style.top = "".concat(top, "px");
    el.style.left = "".concat(left, "px");
  });

  var filteredElements = filterCommand(elements, text);
  CommandEngine(text);
  return /*#__PURE__*/(
    React.createElement(Portal, null, /*#__PURE__*/
    React.createElement("div", { ref: ref, className: _menuModule.default.menuContainer, contentEditable: false },
    filteredElements.map(function (element) {return /*#__PURE__*/React.createElement(Item, element);}))));



};var _default =

Menu;exports.default = _default;