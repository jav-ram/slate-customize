//@flow

import { Transforms, Text, Element, Node } from 'slate'
import _ from 'lodash';

export const withCommand = (editor: any): any => {
    const { normalizeNode } = editor

    editor.normalizeNode = entry => {
        const [node, path] = entry

        // If the element is a paragraph, ensure its children are valid.
        if (Element.isElement(node) && node.type === 'paragraph') {
            for (const [child, childPath] of Node.children(editor, path)) {
                normalize(child, childPath, editor);
            }
            return;
        }

        // Fall back to the original `normalizeNode` to enforce other constraints.
        normalizeNode(entry)
    }

    return editor
}

const normalize = (node, path, editor) => {
    // if is text
    if (Text.isText(node) && node.element && node.element === 'command') {
        const selection = editor.selection;
        const xor = _.xor(path, selection.anchor.path);
        console.log(selection, path, selection.anchor.path)
        if (selection && xor.length > 0) {
            console.log('it should be eliminated')
            // Remove the command tag
            Transforms.unsetNodes(
                editor,
                'element',
                {
                    at: path
                }
            );
        }
    }
}