//@flow

import { Transforms, Text, Element, Node } from 'slate';
import { iterateValue } from '../extras';
import _, { slice } from 'lodash';

import Command from '../../components/elements/Command';

const normalize = (editor, node, path) => {
    // if is text
    if (Text.isText(node) && node.element && node.element === 'command') {
        const selection = editor.selection;
        const xor = _.xor(path, selection.anchor.path);
        if (selection && selection.anchor.path.length === path.length && xor.length > 0) {
            console.log(path, selection.anchor.path)
            console.log('should delete command')
            // Remove the command tag
            Command.unset && Command.unset({ editor, at: path });
        }
    }
}

const iterativeNormalize = iterateValue(normalize);

export const withCommand = (editor: any): any => {
    const { normalizeNode } = editor

    editor.normalizeNode = (entry: [any, [number]]) => {
        const [node, path] = entry

        // If the element is a paragraph, ensure its children are valid.
        iterativeNormalize({ editor, value: node });

        // Fall back to the original `normalizeNode` to enforce other constraints.
        normalizeNode(entry)
    }

    return editor
}