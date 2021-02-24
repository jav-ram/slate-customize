// @flow
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { useMemo } from 'react';
import { Text, Element, Node } from 'slate';

import type { ElementDefinition } from '../components/elements';

import withCommands from './commands';
import { iterateValue } from './extras'
import Tokenize from './commands/tokenizer';

const withCustomInlines = (elements: Array<string>): ((Object) => Object) => {
    return (editor) => {
        editor.isInline = (node) => {
            return elements.includes(node.element ? node.element : '');
        }
        return editor;
    }
}

export const withCustomize = (editor: Object, elements: {[string]: ElementDefinition}): Object => {
    const withInlines = withCustomInlines(['list', 'variable', 'conditional']); // FIXME: better way to call the names

    editor = withReact(editor, []);
    editor = withHistory(editor, []);

    editor = withInlines(editor);
    editor = withCommands(editor);

    return useMemo(() => editor, []); // FIXME: take advantage of memoization
}

export const iterateSlateValue = iterateValue;