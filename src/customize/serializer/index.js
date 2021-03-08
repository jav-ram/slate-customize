// @flow
import { jsx } from 'slate-hyperscript';

export const deserializeHTML = (el: ?HTMLBodyElement): Object => {

    if (!el) {
        return {};
    }
    
    if (el.nodeType === 3) {
        //TODO: check if those what it should
        return jsx('text', {}, el.textContent);
    } else if (el.nodeType !== 1) {
        return null;
    }

    const children = Array.from(el.childNodes).map(e => {
        let t = deserializeHTML(e)
        
        return t;
    });
    // translate
    const styles = el.style;
    let isBlock = children[0] && children[0].element;
    isBlock = children.length > 1 || isBlock;

    if (isBlock && (el.nodeName === 'SPAN' || el.nodeName === 'B' || el.nodeName === 'P'))
        return jsx('fragment', {}, children);

    console.log(el.nodeName)

    switch (el.nodeName) {
        case 'BODY':
            return jsx('fragment', {}, children);
        case 'BR':
            return '\n';
        case 'P':
            if (styles.fontWeight === 'bold' || parseInt(styles.fontWeight) > 400) {
                return jsx('text', { element: 'bold' }, children);
            } else if (styles.fontStyle === 'italic') {
                return jsx('text', { element: 'italic' }, children);
            } else if (styles.textDecoration === 'underline') {
                return jsx('text', { element: 'underline' }, children);
            }
            return jsx('element', { type: 'paragraph' }, children);
        case 'SPAN':
            if (styles.fontWeight === 'bold' || parseInt(styles.fontWeight) > 400) {
                return jsx('text', { element: 'bold' }, children);
            } else if (styles.fontStyle === 'italic') {
                return jsx('text', { element: 'italic' }, children);
            } else if (styles.textDecoration === 'underline') {
                return jsx('text', { element: 'underline' }, children);
            }
            console.log("problem", el, children)
            return jsx('text', {}, el.textContent);
        case 'H1':
        case 'H2':
        case 'H3':
        case 'H4':
            return jsx('element', { element: 'title'}, children);
        case 'STRONG':
        case 'B':
            return jsx('text', { element: 'bold' }, children);
        case 'EM':
        case 'I':
            // TODO: Test if this works as intended
            return jsx('text', { element: 'italic' }, children);
        case 'U':
            // TODO: Test if this works as intended
            return jsx('text', { element: 'underline' }, children);
        case 'META':
            return null;
        // TODO: all others types
        // * H1 ... H4
        // * span or p with styles (css)
        // * <i /> italic
        // * <u /> underline
        // * <b /> bold
        default:
            return jsx('text', {}, el.textContent);
    }

}