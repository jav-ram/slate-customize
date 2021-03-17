// @flow
import * as React from 'react';
import { Elements as DefaultElements } from '../../customize/elements';

import type { ComponentType, Node } from 'react';
import type { ElementDefinitionType, ElementsDefinitionTypes } from '../../customize/elements';

import ListDefinition from './List';
import VariableDefinition from './Variable';
import ConditionalDefinition from './Conditional';

import * as styles from './index.module.css';

export const Elements: ElementsDefinitionTypes = {
    ...DefaultElements, // Default elements to use
    variable: VariableDefinition,
    conditional: ConditionalDefinition,
    list: ListDefinition,
}
