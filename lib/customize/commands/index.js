"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.customizeOnKeyDown = void 0;var _slate = require("slate");
var _elements = require("../../components/elements");
var _Command = _interopRequireDefault(require("../elements/Command"));
var _normalizer = require("./normalizer");

var _extras = require("../extras");
var _extras2 = require("../../customize/extras");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var COMMAND_KEY = '/';

var cleanCommand = function cleanCommand(editor, node, path) {
  if (node.element === 'command') {
    // Transforms.removeNodes(editor, { at: path });
    _Command.default.unset && _Command.default.unset({ editor: editor, at: path });
  }
};

var cleanCommands = (0, _extras.iterateValue)(cleanCommand);

var getElementCommand = function getElementCommand(command) {
  var text = command.replace(' ', '').replace('/', '');
  for (var key in _elements.Elements) {
    var element = _elements.Elements[key];
    if (element.command === text || element.name === text)
    return element;
  }
  return;
};

var customizeOnKeyDown = function customizeOnKeyDown(event, editor, value) {var
  selection = editor.selection;var _editor$selection$anc =
  editor.selection.anchor,path = _editor$selection$anc.path,offset = _editor$selection$anc.offset;
  var node = (0, _extras2.getNode)(value, selection.anchor.path);

  if (event.key === COMMAND_KEY) {
    event.preventDefault();
    // check if there is any other command on the editor if so delete it first
    cleanCommands({ editor: editor, value: value });

    _slate.Transforms.insertNodes(editor, { element: "command", text: COMMAND_KEY });
    return;
  }

  if (node.element === 'command') {
    // only if it is inside the command element
    if (event.key === ' ' || event.keyCode === 13 || event.key === COMMAND_KEY) {
      // check if command is valid if not delete command
      event.preventDefault();
      var commandElement = getElementCommand(node.text);
      if (commandElement) {
        var element = {};
        switch (commandElement.name) {
          case _elements.Elements.variable.name:
            element = commandElement.create({ ref: 'var' });
            break;
          case _elements.Elements.list.name:
            element = commandElement.create({
              ref: 'list',
              children: [{
                text: 'list' }] });


            break;
          case _elements.Elements.conditional.name:
            element = commandElement.create({
              conditional: 'true',
              ifTrue: { element: 'conditional-true', text: 'place this if true' },
              ifFalse: { element: 'conditional-false', text: 'place this if false' } });

            break;
          case _elements.Elements.title.name:
            element = commandElement.create({
              title: 'Mock' });

            break;

          case _elements.Elements.bold.name:
            element = commandElement.create({
              text: 'bold' });

            break;
          case _elements.Elements.italic.name:
            element = commandElement.create({
              text: 'italic' });

            break;
          case _elements.Elements.underline.name:
            element = commandElement.create({
              text: 'underline' });

            break;
          default:
            commandElement.unset && commandElement.unset({ editor: editor });
            return;}

        _slate.Transforms.removeNodes(editor, { at: path });
        commandElement.insert && commandElement.insert({ editor: editor, event: event, meta: { element: element, at: path } });
        //Transforms.insertNodes(editor, {text: 'var', element: 'variable', ref: 'var'})
        //commandElement.insert && commandElement.insert({ editor, event, meta: {element: { text: 'var', ref: 'var' }}});
      } else {
        console.log("should delete it", commandElement);
        _Command.default.unset && _Command.default.unset({ editor: editor });
        // show alert of command not completed or bad command 
      }

    }
  }
};exports.customizeOnKeyDown = customizeOnKeyDown;var _default =

_normalizer.withCommand;exports.default = _default;