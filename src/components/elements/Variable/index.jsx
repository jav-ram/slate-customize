// @flow
import React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { VscSymbolVariable } from 'react-icons/vsc';

import { SetGenerator, UnsetGenerator, InsertGenerator } from '../actionGenerator';
import type { ElementDefinition, ElementLeaf } from '../index';

import styles from './variable.module.css';

export type VariableElementType = ElementLeaf & {
    ref: string,
    name: string,
};

const name = 'variable';
const command = 'var';
const type = 'inline';

const set = SetGenerator({ name, type });
const unset = UnsetGenerator({ name, type });
const insert = InsertGenerator({ name, type });

const Element = (props: any) => {
    if (props.text.text === "") {
        console.log(props.children);
    }
    return(
        <span className={styles.wrapper} {...props.attributes}>
            {props.children}
        </span>
    );
}


const definition: ElementDefinition = {
    name,
    command,
    icon: VscSymbolVariable,
    component: Element,
    type,

    set,
    unset,
    insert,
};

export default definition;
