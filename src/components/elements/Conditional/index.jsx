// @flow
import * as React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { GiChoice } from 'react-icons/gi';

import { SetGenerator, UnsetGenerator, InsertGenerator } from '../actionGenerator';
import type { ElementDefinition, ElementBlockType, ElementLeafType, ElementType } from '../index';

import styles from './conditional.module.css';

export type ConditionalElementType = ElementBlockType & {
    condition: string,
    ifTrue: ElementType,
    ifFalse?: ElementType,
};

type createParamsType = { condition: string, ifTrue: ElementType, ifFalse?: ElementType };
const create = ({ condition, ifTrue, ifFalse }: createParamsType): ConditionalElementType => ({
    element: name,
    type,
    ifTrue,
    ifFalse,
    condition,
    children: [ ifTrue, (ifFalse ? ifFalse : null) ],
});

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

    create,

    set,
    unset,
    insert,
}

export default definition;
