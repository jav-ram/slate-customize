// @flow
import * as React from 'react';
import type { ComponentType, Node } from 'react';
import type { ElementDefinitionType, ElementsDefinitionTypes } from '../../customize/elements';

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

export const Elements: ElementsDefinitionTypes = {
    variable: VariableDefinition,
    conditional: ConditionalDefinition,
    list: ListDefinition,
    command: CommandDefinition,
    title: TitleDefinition,

    bold: BoldDefinition,
    italic: ItalicDefinition,
    underline: UnderlineDefinition,
}
