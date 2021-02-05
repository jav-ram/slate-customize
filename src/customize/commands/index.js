// @flow
import { Transforms, Element, Text, Node } from 'slate';
import { Elements } from '../../components/elements';
import Command from '../../components/elements/Command';
import { withCommand } from './normalizer';

export type PathLocation = {
    offset: number,
    path: Array<number>,
}

export type PathType = {
    anchor: PathLocation,
    focus: PathLocation,
}

const COMMAND_KEY = '/'; 

export const customizeOnKeyDown = (event: KeyboardEvent, editor: any) => {
    if (event.key === COMMAND_KEY) {
        const { path, offset } = editor.selection.anchor;
        event.preventDefault();
        Transforms.insertNodes(editor, { element: "command", text: COMMAND_KEY });
    }
}

export default withCommand;
