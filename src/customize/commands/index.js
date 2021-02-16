// @flow
import { Transforms, Element, Text, Node, findNode } from 'slate';
import { Elements } from '../../components/elements';
import Command from '../../components/elements/Command';
import { withCommand } from './normalizer';

import { getNode } from '../../components/hovermenu';
import type { ElementDefinition } from '../../components/elements';

export type PathLocation = {
    offset: number,
    path: Array<number>,
}

export type PathType = {
    anchor: PathLocation,
    focus: PathLocation,
}

const COMMAND_KEY = '/'; 

const getElementCommand = (command: string): (?ElementDefinition) => {
    const text = command.replace(' ', '').replace('/', '');
    for (let key in Elements) {
        const element = Elements[key];
        if (element.command === text || element.name === text)
            return element;
    }
    return;
}

export const customizeOnKeyDown = (event: KeyboardEvent, editor: any, value: any) => {
    const { selection } = editor;
    const { path, offset } = editor.selection.anchor;
    const node = getNode(value, selection.anchor.path);

    if (event.key === COMMAND_KEY) {
        event.preventDefault();
        Transforms.insertNodes(editor, { element: "command", text: COMMAND_KEY });
        return;
    }

    if (node.element === 'command') {
        // only if it is inside the command element
        if (event.key === ' ' || event.keyCode === 13 || event.key === COMMAND_KEY) {
            // check if command is valid if not delete command
            event.preventDefault();
            const commandElement = getElementCommand(node.text);
            if (commandElement) {
                Transforms.removeNodes(editor, { at: path });
                //Transforms.insertNodes(editor, {text: 'var', element: 'variable', ref: 'var'})
                commandElement.insert && commandElement.insert({ editor, event, meta: {element: { text: 'var', ref: 'var' }}});
            } else {
                // show alert of command not completed or bad command
            }
            
        }
    }
}

export default withCommand;
