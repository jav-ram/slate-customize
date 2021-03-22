// @flow
import type { ComponentType } from 'react';

import CommandDefinition from './Command';
import TitleDefinition from './Titles';
import {
    BoldDefinition,
    ItalicDefinition,
    UnderlineDefinition,
} from './LeafStyles';

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

export type ElementDefinitionType = {
    name: string,
    command: string,
    description?: string,

    icon?: ComponentType<*>,

    component: ComponentType<*>,
    type: 'inline' | 'block',
    create: Object => ElementType,

    insert?: ({ event?: Object, editor: Object, at?: Object, meta?: Object }) => void,
    set?: ({ event?: Object, editor: Object, at?: Object, meta?: Object }) => void,
    unset?: ({ event?: Object, editor: Object, at?: Object, meta?: Object }) => void,

    params?: {[string]: {
        name: string,
        type: string,
        transform?: string,
    }}
};

export type ElementsDefinitionTypes = { [string]: ElementDefinitionType };

export const Elements: ElementsDefinitionTypes = {
    command: CommandDefinition,
    title: TitleDefinition,

    bold: BoldDefinition,
    italic: ItalicDefinition,
    underline: UnderlineDefinition,
}