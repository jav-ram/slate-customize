"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Elements = void 0;var _Command = _interopRequireDefault(require("./Command"));
var _Titles = _interopRequireDefault(require("./Titles"));
var _LeafStyles = require("./LeafStyles");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}





var Elements = {
  command: _Command.default,
  title: _Titles.default,

  bold: _LeafStyles.BoldDefinition,
  italic: _LeafStyles.ItalicDefinition,
  underline: _LeafStyles.UnderlineDefinition };exports.Elements = Elements;