//@flow
import { useSlate } from 'slate-react';
import { Editor, Transforms, Text } from 'slate';

import type { transformParamsType } from './index';

// FIXME: MOVE IT OR IMPORT inspect
// ----------------------------------
export type PathLocation = {
    offset: number,
    path: Array<number>,
}

export type PathType = {
    anchor: PathLocation,
    focus: PathLocation,
}
// ----------------------------------

export type ActionDefinitionType = {
    before?: ActionFunctionType,
    after?: ActionFunctionType,

    split?: boolean,
    match?: (any) => boolean,
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
    at?: PathType,
    meta?: any,
};

type ActionFunctionType = (ActionParamsType) => void;

const generateDefaultMatch = (
    editor,
    value: any,
    key: (string | number)
): Function => {
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
}: handlererDefinitionType) => {
    let set = ({ event, editor, at, meta }: transformParamsType): void => {
        const defaultMatch = generateDefaultMatch(editor, name, 'element');

        preventDefault && event && event.preventDefault();
        actionDef.after && actionDef.after({ event, editor, at });

        const match = actionDef.match ? actionDef.match : defaultMatch;
        const split = actionDef.split ? actionDef.split : true;

        if (isNested) {
            const options = { split };
            if (at) options.at = at;
            const list = { type: type, element: name, children: [{ text: '' }] }
            Transforms.wrapNodes(editor, list, options )
        } else {
            const options = { match: n => Text.isText(n) && n.type !== type, split: true };
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

        const options = { match: n => Text.isText(n) && n.type !== type };
        if (at) options.at = at;
        Transforms.unsetNodes(
            editor,
            ['element'],
            options,
        );
    }

    return unset;
}
