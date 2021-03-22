"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.OnChangeUpload = void 0;var _mammoth = _interopRequireDefault(require("mammoth"));

var _extras = require("../extras");
var _index = require("./index");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var OnChangeUpload = function OnChangeUpload(editor, event, setValue) {
  var f = event.target.files[0];
  var reader = new FileReader();

  var ext = f.name.split('.').slice(-1)[0];

  reader.onload = function (theFile) {
    return function (e) {
      // $FlowIgnore
      var rawText = e.target.result;

      if (ext === "docx") {
        _mammoth.default.convertToHtml({ arrayBuffer: rawText }).
        then(function (result) {
          var txtHTML = result.value;
          var document = new DOMParser().parseFromString(txtHTML, "text/html");
          setValue((0, _index.deserializeHTML)(document.body));
          editor = (0, _extras.CleanHistory)(editor);
        }).
        catch(function (e) {return console.log(e);}).
        done();
      } else if (ext === "html") {
        var document = new DOMParser().parseFromString(rawText, "text/html");
        setValue((0, _index.deserializeHTML)(document.body));
        editor = (0, _extras.CleanHistory)(editor);
      }


    };
  }(f);

  if (ext === "docx") {
    reader.readAsArrayBuffer(f);
  } else if (ext === "html") {
    reader.readAsText(f);
  }
};exports.OnChangeUpload = OnChangeUpload;