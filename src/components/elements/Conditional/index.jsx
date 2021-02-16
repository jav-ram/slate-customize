// @flow
import * as React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { GiChoice } from 'react-icons/gi';

import { SetGenerator, UnsetGenerator, InsertGenerator } from '../actionGenerator';
import type { ElementDefinition, ElementBlock, ElementLeaf } from '../index';

import styles from './conditional.module.css';

export type ConditionalElementType = ElementBlock & {
    condition: string,
    ifTrue: ElementBlock | ElementLeaf,
    ifFalse?: ElementBlock | ElementLeaf,
};

const name = 'conditional';
const command = 'conditional';
const type = 'block';

const set = SetGenerator({ name, type });
const unset = UnsetGenerator({ name, type });
const insert = InsertGenerator({ name, type });

const Element = (props) => (
    <p className={styles.wrapper} {...props.attributes}>
        {props.children}
    </p>
);

const definition: ElementDefinition = {
    name,
    command,
    type,
    icon: GiChoice,
    component: Element,

    set,
    unset,
    insert,
}

export default definition;
