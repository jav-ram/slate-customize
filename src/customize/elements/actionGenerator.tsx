import React, { MouseEvent, SyntheticEvent } from 'react';
import { Editor, Transforms, Text, NodeEntry } from 'slate';
import { useSlate } from 'slate-react';

import type { transformParamsType } from './index';

export type ActionDefinitionType = {
    before?: ActionFunctionType,
    after?: ActionFunctionType,

    split?: boolean,
    match?: (n: any) => boolean,
}

export type handlererDefinitionType = {
    name: string,
    type: 'block' | 'inline',
    isNested?: boolean,
    preventDefault?: boolean,
    actionDef?: ActionDefinitionType
}

export type ActionParamsType = {
    event?: SyntheticEvent<HTMLButtonElement>,
    editor: any,
    at?: Location,
    meta?: any,
};

type ActionFunctionType = (ActionParamsType) => void;

const generateDefaultMatch = (
    editor: any, // FIXME: Editor
    value: any,
    key: (string | number)
): () => NodeEntry => {
    return () => {
        const [match] = Editor.nodes(editor, {
            match: n => n[key] === value,
        });
        return match;
    }
}

export const SetGenerator = ({
    name,
    type,
    isNested=false,
    preventDefault=false,
    actionDef={}
}: handlererDefinitionType): ActionFunctionType => {
    let set = ({ event, editor, at, meta }: transformParamsType): void => {
        const defaultMatch = generateDefaultMatch(editor, name, 'element');

        preventDefault && event && event.preventDefault();
        actionDef.after && actionDef.after({ event, editor, at });

        const match = actionDef.match ? actionDef.match : defaultMatch;
        const split = actionDef.split ? actionDef.split : true;

        if (isNested) {
            const options: any = { split };
            if (at) options.at = at;
            const list = { type: type, element: name, children: [{ text: '' }] }
            Transforms.wrapNodes(editor, list, options )
        } else {
            const options: any = { match: n => Text.isText(n) && n.type !== type, split: true };
            if (at) options.at = at;
            Transforms.setNodes(
                editor,
                { element: name },
                options,
            );
        }
    }

    return set;
}

export const UnsetGenerator = ({
    name,
    type,
    isNested=false,
    preventDefault=false,
    actionDef={}
}: handlererDefinitionType): ActionFunctionType => {
    let unset = ({ event, editor, at, meta }: transformParamsType): void => {
        const defaultMatch = generateDefaultMatch(editor, name, 'element');

        preventDefault && event && event.preventDefault();
        actionDef.after && actionDef.after({ event, editor, at });

        const match = actionDef.match ? actionDef.match : defaultMatch;
        const split = actionDef.split ? actionDef.split : true;

        const options: any = { match: n => Text.isText(n) && n.type !== type };
        if (at) options.at = at;
        Transforms.unsetNodes(
            editor,
            ['element'],
            options,
        );
    }

    return unset;
}

export const InsertGenerator = ({
    name,
    type,
    isNested=false,
    preventDefault=false,
    actionDef={}
}: handlererDefinitionType): ActionFunctionType => {
    let insert = ({ event, editor, at, meta={} }: transformParamsType): void => {
        let metaOptions = {};
        const node = { element: name }
        if (meta && meta.options) metaOptions = meta.options;
        preventDefault && event && event.preventDefault();

        const options: any = { split: true, ...metaOptions };
        if (at) options.at = at;

        Transforms.insertNodes(
            editor,
            { ...node, ...meta.element },
            options,
        );
    }
    return insert;
}
