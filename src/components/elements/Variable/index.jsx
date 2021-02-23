// @flow
import React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { VscSymbolVariable } from 'react-icons/vsc';

import { SetGenerator, UnsetGenerator, InsertGenerator } from '../actionGenerator';
import type { ElementDefinition, ElementLeafType } from '../index';

import styles from './variable.module.css';

export type VariableElementType = ElementLeafType & {
    ref: string,
};

const name = 'variable';
const command = 'var';
const type = 'inline';

const set = SetGenerator({ name, type });
const unset = UnsetGenerator({ name, type });
const insert = InsertGenerator({ name, type });

type createParamsType = { ref: string };
const create = ({ ref }: createParamsType): VariableElementType => ({
    element: name,
    type,
    ref,
    text: ref,
});

const Element = (props: Object) => (
    <span className={styles.wrapper} {...props.attributes}>
        {props.children}
    </span>
);


const definition: ElementDefinition = {
    name,
    command,
    icon: VscSymbolVariable,
    component: Element,
    type,

    create,

    set,
    unset,
    insert,
};

export default definition;
