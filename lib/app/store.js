"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _toolkit = require("@reduxjs/toolkit");
var _counterSlice = _interopRequireDefault(require("../features/counter/counterSlice"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

(0, _toolkit.configureStore)({
  reducer: {
    counter: _counterSlice.default } });exports.default = _default;