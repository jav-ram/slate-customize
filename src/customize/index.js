// @flow
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { useMemo } from 'react';
import { Transforms } from 'slate';

import type { ElementDefinition } from '../components/elements';

import { deserializeHTML } from './serializer';
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
};

const withCopyPasteWithStyles = (editor: Object): Object => {
    const { insertData } = editor;
    editor.insertData = data => {
        const html = data.getData('text/html');

        if (html) {
            const parsed = new DOMParser().parseFromString(html, 'text/html');
            const fragment = deserializeHTML(parsed.body);
            Transforms.insertFragment(editor, fragment)
            return;
        }
        insertData(data);
    }
}

export const withCustomize = (editor: Object, elements: {[string]: ElementDefinition}): Object => {
    const withInlines = withCustomInlines(['list', 'variable', 'conditional']); // FIXME: better way to call the names

    editor = withReact(editor, []);
    editor = withHistory(editor, []);

    editor = withInlines(editor);
    editor = withCommands(editor);
    editor = withCopyPasteWithStyles(editor);

    return useMemo(() => editor, []); // TODO: take advantage of memoization
}

export const iterateSlateValue = iterateValue;