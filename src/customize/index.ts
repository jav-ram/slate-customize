import React from 'react';
import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { useMemo } from 'react';
import { Editor, Transforms } from 'slate';

import { deserializeHTML } from './serializer';
import { CleanHistory, iterateValue } from './extras';

import type { ElementsDefinitionTypes, ElementType } from './elements';

const withCustomInlines = (elements: string[]): ((editor: any) => any) => {
    return (editor) => {
        editor.isInline = (node: ElementType) => {
            return elements.includes(node.element ? node.element : '');
        }
        return editor;
    }
};

const withCopyPasteWithStyles = (editor: any): any => {
    const { insertData } = editor;
    editor.insertData = data => {
        const html = data.getData('text/html');

        if (html) {
            const parsed = new DOMParser().parseFromString(html, 'text/html');
            const fragment = deserializeHTML(parsed.body);
            Transforms.insertFragment(editor, fragment);
            CleanHistory(editor);
            return;
        }
        insertData(data);
    }
    return editor;
}

export const withCustomize = (editor: Editor, elements: ElementsDefinitionTypes): Editor => {
    const inlines = Object.keys(elements)
        .map(key => elements[key])
        .filter((element) => element.type === "inline")
        .map(element => element.name)

    const withInlines = withCustomInlines(inlines);

    editor = withReact(editor);
    editor = withHistory(editor);

    editor = withInlines(editor);
    editor = withCopyPasteWithStyles(editor);

    return useMemo(() => editor, []); // TODO: take advantage of memoization
}

export const iterateSlateValue = iterateValue;