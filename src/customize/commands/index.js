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

const word = /\w/g.source;
const we = new RegExp(`${word}|\\s`, 'g').source;
const commandRE = new RegExp(`${word}<((${we})*)?(,(${we})*)*>`, 'g');

export const withCommands = (editor: any): any => {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry) => {
        const [node, path] = entry;

        // identify the commands
        if (Text.isText(node)) {
            const at = getPathOfCommand(path, node.text);
            if (at) { // check if its already normalize or if parente is normalize
                return
            };
        }

        normalizeNode(entry);
    }

    return editor;
}


const getPathOfCommand = (path: Array<number>, text: string): ?PathType => {
    const match = text.matchAll(commandRE).next().value; // only first the other ones will be check in next iteration
    if (match === undefined) return;

    const offset = match.index;
    const length = match[0].length;

    return {
        anchor: { path, offset },
        focus: { path, offset: offset+length }
    }
};

const isCommandAlone = (path: Array<number>, text: string): boolean => {
    const at = getPathOfCommand(path, text);
    return (path.achor.offset === 0 && text.length === path.focus.offset);
};
