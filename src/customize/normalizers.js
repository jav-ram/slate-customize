// @flow
import { Text, Transforms } from 'slate';
import Tokenize from './commands/tokenizer';

import type { PathType } from './commands';
import type { ElementDefinition } from '../components/elements';

export type normalizerParamsType = {
    editor: any,
    node: any,
    path: PathType,
    elements: Array<ElementDefinition>,
    father: any,
    fatherPath: PathType,
};

const getLength = token => {
      if (typeof token === 'string') {
          return token.length
      } else if (typeof token.content === 'string') {
          return token.content.length
      } else {
          return token.content.reduce((l, t) => l + getLength(t), 0)
      }
}

const hasChildren = (node) => {
    if (node.children) return true;
    return false;
}

const getNodeText = (node): string => {
    let text = '';
    if (hasChildren(node)) {
        for (const child of node.children) {
            if (hasChildren(child)){
                text += getNodeText(child);
            } else if (Text.isText(child)) {
                text += child.text;
            } else { alert('isnt a node with child neither text.') }
        }
    } else if (Text.isText(node)) {
        text = node.text;
    }
    return text;
}

const getPath = (node, pos) => {
    const path = [];
    let curr = 0;
    if (hasChildren(node)) {
        const currPath = [];
        let insideCurr = 0;
        for (const [index, child] of node.children.entries()) {
            if (hasChildren(child)) {
                const [nPath, nPos] = getPath(child, pos - curr);

                curr += nPos;
                if (nPath) {
                    path.push(...nPath);
                    return [path, nPos]
                }
            } else if (Text.isText(child)) {
                for (let t of child.text) {
                    if (curr === pos) {
                        path.push(index);
                        return [path, curr];
                    }
                    curr += 1;
                }
            }
            pos -= curr;
            curr = 0;
        }
    } else if (Text.isText(child)) {
        for (let t of child.text) {
            if (curr === pos) {
                return [path, curr];
            }
            curr += 1;
        }
    }
    return [undefined, curr];
}

const getCommandPosition = (node, path): ?PathType => {
    const anchor = path;
    const focus = path;
    const text = getNodeText(node);

    const tokens = Tokenize(text);
    let start = 0;

    for (let token of tokens) {
        const length = getLength(token);
        const end = start + length;

        if (typeof token !== 'string') {

            // find anchor
            let [anchorPath, anchorOffset] = getPath(node, start);
            anchorPath = [...path, ...anchorPath];
            // find focus
            let [focusPath, focusOffset] = getPath(node, end);
            console.log(focusPath);
            focusPath = [...path, ...focusPath];

            return {
                token: token.type,
                at: {
                    anchor: { path: anchorPath, offset: anchorOffset },
                    focus: { path: focusPath, offset: focusOffset },
                }
            };
        }

        start = end;
    }

    return;
}

const normalizeCommandsCleanup = ({
    editor,
    node,
    path,
    elements,
    father,
    fatherPath
}: normalizerParamsType): boolean => {
    if (Text.isText(node)) {
        if (father.element) {
            const tokens = Tokenize(node.text);
            let text = node.text.substring(2, node.text.length-1);
            if (tokens.length > 0 && tokens[0].type) {
                let text = node.text.substring(2, node.text.length-1);
                Transforms.insertText(editor, text, { at: path });
                return true;
            }
        }
    }
    return false;
}

const normalizeTextCommands = ({
    editor,
    node,
    path,
    elements,
    father,
    fatherPath,
}: normalizerParamsType): boolean => {
    if (Text.isText(node) && !node.element) {
        const tokens = Tokenize(node.text);
        let start = 0;

        for (let token of tokens) {
            const length = getLength(token);
            const end = start + length;

            if (typeof token !== 'string') {
                const element = elements[token.type];
                element.action({ editor,  at: {
                    anchor: { path, offset: start },
                    focus: { path, offset: end },
                }});
                return true;
            }

            start = end;
        }

        // try find the command one level up
       const comPos = getCommandPosition(father, fatherPath);
       if (!comPos) return false;
       const element = elements[comPos.token];
       element.action({ editor,  at: comPos.at});
       return true;
    }
    return false;
}

export const normalizeCommands = (params: normalizerParamsType): void => {
    if (normalizeCommandsCleanup(params)) return;
    if (normalizeTextCommands(params)) return;
    return;

};
