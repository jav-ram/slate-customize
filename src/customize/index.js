// @flow
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { useMemo } from 'react';
import { Text, Element, Node } from 'slate';

import type { ElementDefinition } from '../components/elements';

import { withCommands } from './commands';
import Tokenize from './commands/tokenizer';
import { normalizeCommands } from './normalizers';

const withCustomInlines = (elements: Array<string>): ((any) => any) => {
    return (editor) => {
        editor.isInline = (node) => {
            return elements.includes(node.element ? node.element : '');
        }
        return editor;
    }
}

const withCustomNormalizer = (elements: {[string]: ElementDefinition}): (any => any) => {
    const normalize = (editor: any) => {
        const { normalizeNode } = editor;
        editor.normalizeNode = (entry) => {
            const [node, path] = entry;

            if (node.text && node.text == 'paragraph') {
                console.log((Node.isNode(node) && node.type) === true);
            }

            if (Node.isNode(node) && node.children) {
                for (const [child, childPath] of Node.children(editor, path)) {
                    if (Text.isText(child)) {
                        normalizeCommands({
                            editor,
                            node: child,
                            path: childPath,
                            elements,
                            father: node,
                            fatherPath: path
                        });
                    }
                    normalize([child, childPath]);
                }
            }
            normalizeNode(entry);
            return;
        };

        return editor;
    };
    return normalize;
};

export const withCusmize = (editor: any, elements: {[string]: ElementDefinition}): any => {
    const withInlines = withCustomInlines(['list', 'variable', 'conditional']); // FIXME: better way to call the names
    const withNormalize = withCustomNormalizer(elements);

    editor = withReact(editor, []);
    editor = withHistory(editor, []);

    editor = withInlines(editor);
    editor = withNormalize(editor);
    editor = withCommands(editor);

    return useMemo(() => editor, []); // FIXME: take advantage of memoization
}
