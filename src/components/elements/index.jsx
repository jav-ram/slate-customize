// @flow
import * as React from 'react';
import type { ComponentType, Node } from 'react';

import ListDefinition from './List';
import VariableDefinition from './Variable';
import ConditionalDefinition from './Conditional';
import CommandDefinition from './Command';
import TitleDefinition from './Titles';
import {
    BoldDefinition,
    ItalicDefinition,
    UnderlineDefinition,
} from './LeafStyles';

import * as styles from './index.module.css';

export type transformParamsType = { event?: Object, editor: Object, at: Object, meta?: Object };

export type ElementType = {
    element?: string,
    type: 'inline' | 'block',
};

export type ElementLeafType = ElementType & {
    text: string,
}

export type ElementBlockType = ElementType & {
    children: ElementType[],
};

export type ElementDefinition = {
    name: string,
    command: string,
    description?: string,

    icon?: ComponentType<*>,

    component: ComponentType<*>,
    type: 'inline' | 'block',
    create: Object => ElementType,

    insert?: ({ event?: Object, editor: Object, at?: Object, meta?: Object }) => void;
    set?: ({ event?: Object, editor: Object, at?: Object, meta?: Object }) => void;
    unset?: ({ event?: Object, editor: Object, at?: Object, meta?: Object }) => void;

    params?: {[string]: {
        name: string,
        type: string,
        transform?: string,
    }}
};

/* export type ElementDefinition = {
    name: string,
    command: string,
    description?: string,
    hotkey?: string,

    action: Function,
    icon: Function,
    component: ComponentType<*>,
    input?: ComponentType<*>,

    hideInToolbar?: boolean,
    unset?: Function,
}; */

export const Elements: { [string]: ElementDefinition } = {
    variable: VariableDefinition,
    conditional: ConditionalDefinition,
    list: ListDefinition,
    command: CommandDefinition,
    title: TitleDefinition,

    bold: BoldDefinition,
    italic: ItalicDefinition,
    underline: UnderlineDefinition,
}
