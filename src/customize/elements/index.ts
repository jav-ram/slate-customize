import type { ComponentType, ReactElement, ReactNode } from 'react';
import type { Editor, Location } from 'slate';
export * from './actionGenerator';

import CommandDefinition from './Command';
import TitleDefinition from './Titles';
import {
    BoldDefinition,
    ItalicDefinition,
    UnderlineDefinition,
} from './LeafStyles';

export type transformParamsType = {
    event?: any,
    editor: any,
    at: Location,
    meta?: any,
}

export type ElementType = {
    element?: string,
    type: 'inline' | 'block',
    [x: string]: any,
};

export type ElementLeafType = ElementType & {
    text: string,
}

export type ElementBlockType = ElementType & {
    children: ElementType[],
};

export type ElementActionFunctionParamsType = {
    editor: Editor,
    event?: Object,
    at?: Location,
    meta?: Object,
};

export type ElementDefinitionType = {
    name: string,
    command: string,
    description?: string,

    icon?: React.ElementType,

    component: React.ElementType,
    type: 'inline' | 'block',
    create: (params: any) => ElementType,

    insert?: (params: ElementActionFunctionParamsType) => void,
    set?: (params: ElementActionFunctionParamsType) => void,
    unset?: (params: ElementActionFunctionParamsType) => void,

    params?: {[key: string]: {
        name: string,
        type: string,
        transform?: string,
    }}
};

export type ElementsDefinitionTypes = { [key: string]: ElementDefinitionType };

export const Elements: ElementsDefinitionTypes = {
    command: CommandDefinition,
    title: TitleDefinition,

    bold: BoldDefinition,
    italic: ItalicDefinition,
    underline: UnderlineDefinition,
}