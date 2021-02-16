// @flow
import { Transforms, Element, Text, Node, findNode } from 'slate';
import { Elements } from '../../components/elements';
import Command from '../../components/elements/Command';
import { withCommand } from './normalizer';

import { getNode } from '../../components/hovermenu';

export type PathLocation = {
    offset: number,
    path: Array<number>,
}

export type PathType = {
    anchor: PathLocation,
    focus: PathLocation,
}

const COMMAND_KEY = '/'; 

const getElementCommand = (command: string): (any | void) => {
    const text = command.replace(' ', '').replace('/', '');
    for (let key in Elements) {
        const element = Elements[key];
        if (element.command === text)
            return element;
    }
    return;
}

export const customizeOnKeyDown = (event: KeyboardEvent, editor: any, value: any) => {
    const { selection } = editor;
    const node = getNode(value, selection.anchor.path);

    if (event.key === COMMAND_KEY) {
        const { path, offset } = editor.selection.anchor;
        event.preventDefault();
        Transforms.insertNodes(editor, { element: "command", text: COMMAND_KEY });
        return;
    }

    if (node.element === 'command') {
        // only if it is inside the command element
        if (event.key === ' ' || event.key === '\n' || event.key === COMMAND_KEY) {
            // check if command is valid if not delete command
            event.preventDefault();
            
        }
    }
}

export default withCommand;
