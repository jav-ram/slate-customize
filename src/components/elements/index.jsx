// @flow
import * as React from 'react';
import type { ComponentType, Node } from 'react';

import ListDefinition from './List';
import VariableDefinition from './Variable';
import ConditionalDefinition from './Conditional';
import CommandDefinition from './Command';

import * as styles from './index.module.css';

export type transformParamsType = {
    event?: any,
    editor: any,
    at: any,
    meta?: any,
};

export type ElementDefinition = {
    name: string,
    command: string,
    description?: string,

    component: ComponentType<*>,
    type: 'inline' | 'block',

    insert?: (transformParamsType) => void;
    set?: (transformParamsType) => void;
    unset?: (transformParamsType) => void;

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
}
