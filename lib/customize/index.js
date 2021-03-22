"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.iterateSlateValue = exports.withCustomize = void 0;var _slateReact = require("slate-react");
var _slateHistory = require("slate-history");
var _react = require("react");
var _slate = require("slate");

var _serializer = require("./serializer");
var _extras = require("./extras");

var withCustomInlines = function withCustomInlines(elements) {
  return function (editor) {
    editor.isInline = function (node) {
      return elements.includes(node.element ? node.element : '');
    };
    return editor;
  };
};

var withCopyPasteWithStyles = function withCopyPasteWithStyles(editor) {var
  insertData = editor.insertData;
  editor.insertData = function (data) {
    var html = data.getData('text/html');

    if (html) {
      var parsed = new DOMParser().parseFromString(html, 'text/html');
      var fragment = (0, _serializer.deserializeHTML)(parsed.body);
      _slate.Transforms.insertFragment(editor, fragment);
      (0, _extras.CleanHistory)(editor);
      return;
    }
    insertData(data);
  };
  return editor;
};

var withCustomize = function withCustomize(editor, elements) {
  var inlines = Object.keys(elements).
  map(function (key) {return elements[key];}).
  filter(function (element) {return element.type === "inline";}).
  map(function (element) {return element.name;});

  console.log(inlines);
  var withInlines = withCustomInlines(inlines);

  editor = (0, _slateReact.withReact)(editor, []);
  editor = (0, _slateHistory.withHistory)(editor, []);

  editor = withInlines(editor);
  editor = withCopyPasteWithStyles(editor);
  console.log(editor);

  return (0, _react.useMemo)(function () {return editor;}, []); // TODO: take advantage of memoization
};exports.withCustomize = withCustomize;

var iterateSlateValue = _extras.iterateValue;exports.iterateSlateValue = iterateSlateValue;