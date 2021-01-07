//@flow
import type { Node } from 'react';

export type ElementDefinition = {
    name: string,
    action: Function,
    hotkey?: string,
    icon: Function,
    component: Node,
};

type ActionOptionsType = {
    match: ?(any) => boolean,
    split: ?boolean,
}

export type ActionFunctionType = (
    event: SyntheticEvent<HTMLButtonElement>,
    editor: any,
    name: string,
    type: string,

    toggle: ?boolean,
    options: ?ActionOptionsType,
) => void;

export type ActionDefinition = {

    before: ?(SyntheticEvent<HTMLButtonElement>, any) => void,
    after: ?(SyntheticEvent<HTMLButtonElement>, any) => void,

    split: ?boolean,
    match: ?(any) => boolean,

}

type actionDefinition = {
    name: string,
    editor: any,
    event: SyntheticEvent<HTMLButtonElement>,
    type: 'block' | 'inline',
    isNested: ?boolean,
    preventDefault: ?boolean,

    set: ?ActionFunctionType,
    unset: ?ActionFunctionType,
}

export const handlerMaker = ({
    name,
    editor,
    event,
    type,
    isNested=false,
    preventDefault=true,
    set,
    unset
}: actionDefinition): ((SyntheticEvent<HTMLButtonElement>, any) => void) => {
    preventDefault && event.preventDefault();

    let action;
    if (isNested) {
        action = (event, editor) => {
            if (set)
                set(event, editor, name, type, true);
        }
    } else {
        action = (event, editor) => {
            if (set)
                set(event, editor, name, type, true);
            if (unset)
                unset(event, editor, name, type, true);
        }
    }

    return action;
};
