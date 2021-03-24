import { Transforms, Text, Element, Node, Editor, Path, NodeEntry } from 'slate';
import { iterateValue } from '../extras';
import _, { slice } from 'lodash';

import Command from '../elements/Command';

const normalize = (editor: Editor, node: Node, path: Path) => {
    // if is text
    if (Text.isText(node) && node.element && node.element === 'command') {
        const selection = editor.selection;
        const xor = _.xor(path, selection.anchor.path);
        if (selection && selection.anchor.path.length === path.length && xor.length > 0) {
            // Remove the command tag
            Command.unset && Command.unset({ editor, at: path });
        }
    }
}

const iterativeNormalize = iterateValue(normalize);

export const withCommand = (editor: Editor): Editor => {
    const { normalizeNode } = editor

    editor.normalizeNode = (entry: NodeEntry) => {
        const [node, path] = entry

        // If the element is a paragraph, ensure its children are valid.
        iterativeNormalize({ editor, value: node });

        // Fall back to the original `normalizeNode` to enforce other constraints.
        normalizeNode(entry)
    }

    return editor;
}