// @flow
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { useMemo } from 'react';

import { withCommands } from './commands';
import decorator from './decorator';

const withCustomInlines = (elements: Array<string>): ((any) => any) => {
    return (editor) => {
        editor.isInline = (node) => {
            return elements.includes(node.element ? node.element : '');
        }
        return editor;
    }
}



export const withCusmize = (editor: any): any => {
    const withInlines = withCustomInlines(['list', 'variable', 'conditional']); // FIXME: better way to call the names

    editor = withReact(editor, []);
    editor = withHistory(editor, []);

    editor = withInlines(editor);
    editor = withCommands(editor);

    return useMemo(() => editor, []); // FIXME: take advantage of memoization
}

export const Decorator = decorator;
