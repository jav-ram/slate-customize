// @flow
import * as React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { VscSymbolArray } from 'react-icons/vsc';

import { SetGenerator, UnsetGenerator, InsertGenerator } from '../actionGenerator';
import type { ElementDefinition } from '../index';

import styles from './list.module.css';

const name = 'list';
const command = 'list';
const type = 'block';

const set = SetGenerator({ name, type });
const unset = UnsetGenerator({ name, type });
const insert = InsertGenerator({ name, type });

const Element = (props: any) => (
    <p className={styles.wrapper} {...props.attributes}>
        {props.children}
    </p>
);

const definition: ElementDefinition = {
    name,
    command,
    type,
    icon: VscSymbolArray,
    component: Element,

    set,
    unset,
    insert,
}

export default definition;
