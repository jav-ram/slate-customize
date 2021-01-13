// @flow
import { Transforms, Element, Text } from 'slate';

const word = /\w/g.source;
const we = new RegExp(`${word}|\\s`, 'g').source;
const commandRE = new RegExp(`${word}\/((${we})*)?(,(${we})*)*\/`, 'g');

export const withCommands = (editor: any): any => {
    const { normalizeNode } = editor;

    editor.normalizeNode = (entry) => {
        const [node, path] = entry;

        // identify the commands
        if (Text.isText(node)) {
            const text = node.text;
            const splited = text.matchAll(commandRE);
            for (let s of splited) {
                console.log(s);
            }
            console.log(splited);
        }

        normalizeNode(entry);
    }

    return editor;
}
