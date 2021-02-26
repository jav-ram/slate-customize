// @flow
import { jsx } from 'slate-hyperscript';


const deserializeHTML = (el: Node): Object => {
    if (el.nodeType === 3) {
        //TODO: check if those what it should
        return el.textContent;
    } else if (el.nodeType !== 1) {
        return null;
    }

    const children = Array.from(el.childNodes).map(e => deserializeHTML(e));

    // translate
    switch (el.nodeName) {
        case 'BODY':
            return jsx('fragment', {}, children);
        case 'BR':
            return '\n';
        case 'P':
            return jsx('element', { type: 'paragraph' }, children);
        case 'H1':
        case 'H2':
        case 'H3':
        case 'H4':
            return jsx('element', { element: 'h1' }, children);
        case 'I':
            // TODO: Test if this works as intended
            return jsx('element', { element: 'italic' },  children);
        case 'U':
            // TODO: Test if this works as intended
            return jsx('element', { element: 'underline' },  children);
        case 'B':
            // TODO: Test if this works as intended
            return jsx('element', { element: 'bold' },  children);
        // TODO: all others types
        // * H1 ... H4
        // * span or p with styles (css)
        // * <i /> italic
        // * <u /> underline
        // * <b /> bold
        default:
            return el.textContent;
    }

}