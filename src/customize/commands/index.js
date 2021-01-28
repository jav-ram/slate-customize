// @flow
import { Transforms, Element, Text, Node } from 'slate';
import { Elements } from '../../components/elements';

export type PathLocation = {
    offset: number,
    path: Array<number>,
}

export type PathType = {
    anchor: PathLocation,
    focus: PathLocation,
}

export const withCommands = (editor: any): any => {
    const { normalizeNode, isVoid } = editor;

    editor.normalizeNode = (entry) => {
        const [node, path] = entry;

        normalizeNode(entry);
    }

    return editor;
}
