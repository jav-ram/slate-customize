// @flow
import * as React from 'react';
import type { ComponentType, Node } from 'react';

import ListDefinition from './List';
import VariableDefinition from './Variable';
import ConditionalDefinition from './Conditional';

import * as styles from './index.module.css';

export type ElementDefinition = {
    name: string,
    action: Function,
    hotkey: string,
    command: string,
    icon: Function,
    component: ComponentType<*>,
};

export const Elements: { [string]: ElementDefinition } = {
    variable: VariableDefinition,
    conditional: ConditionalDefinition,
    list: ListDefinition,
}

type CommandWrapperType = {
    command: string,
    children: ComponentType<*>
};
