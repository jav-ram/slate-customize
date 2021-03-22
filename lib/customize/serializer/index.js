"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.deserializeHTML = void 0;var _slateHyperscript = require("slate-hyperscript");

var deserializeHTML = function deserializeHTML(el) {

  if (!el) {
    return {};
  }

  if (el.nodeType === 3) {
    return (0, _slateHyperscript.jsx)('text', {}, el.textContent);
  } else if (el.nodeType !== 1) {
    return null;
  }

  var children = Array.from(el.childNodes).map(function (e) {
    var t = deserializeHTML(e);

    return t;
  });
  // translate
  var styles = el.style ? el.style : {};
  var isBlock = children[0] && children[0].element;
  isBlock = children.length > 1 || isBlock;

  if (isBlock && (el.nodeName === 'SPAN' || el.nodeName === 'B' || el.nodeName === 'P'))
  return (0, _slateHyperscript.jsx)('fragment', {}, children);

  console.log(el.nodeName);

  switch (el.nodeName) {
    case 'BODY':
      return (0, _slateHyperscript.jsx)('fragment', {}, children);
    case 'BR':
      return '\n';
    case 'P':
      if (styles.fontWeight === 'bold' || parseInt(styles.fontWeight) > 400) {
        return (0, _slateHyperscript.jsx)('text', { element: 'bold' }, children);
      } else if (styles.fontStyle === 'italic') {
        return (0, _slateHyperscript.jsx)('text', { element: 'italic' }, children);
      } else if (styles.textDecoration === 'underline') {
        return (0, _slateHyperscript.jsx)('text', { element: 'underline' }, children);
      }
      return (0, _slateHyperscript.jsx)('element', { type: 'paragraph' }, children);
    case 'SPAN':
      if (styles.fontWeight === 'bold' || parseInt(styles.fontWeight) > 400) {
        return (0, _slateHyperscript.jsx)('text', { element: 'bold' }, children);
      } else if (styles.fontStyle === 'italic') {
        return (0, _slateHyperscript.jsx)('text', { element: 'italic' }, children);
      } else if (styles.textDecoration === 'underline') {
        return (0, _slateHyperscript.jsx)('text', { element: 'underline' }, children);
      }
      console.log("problem", el, children);
      return (0, _slateHyperscript.jsx)('text', {}, el.textContent);
    case 'H1':
    case 'H2':
    case 'H3':
    case 'H4':
      return (0, _slateHyperscript.jsx)('element', { element: 'title' }, children);
    case 'STRONG':
    case 'B':
      return (0, _slateHyperscript.jsx)('text', { element: 'bold' }, children);
    case 'EM':
    case 'I':
      return (0, _slateHyperscript.jsx)('text', { element: 'italic' }, children);
    case 'U':
      return (0, _slateHyperscript.jsx)('text', { element: 'underline' }, children);
    case 'META':
      return null;
    default:
      return (0, _slateHyperscript.jsx)('text', {}, el.textContent);}


};exports.deserializeHTML = deserializeHTML;