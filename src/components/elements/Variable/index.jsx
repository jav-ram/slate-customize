import React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { VscSymbolVariable } from 'react-icons/vsc';

import { SetGenerator, UnsetGenerator, InsertGenerator } from '../../../customize/elements/actionGenerator';

import styles from './variable.module.css';

const name = 'variable';
const command = 'var';
const type = 'inline';

const set = SetGenerator({ name, type });
const unset = UnsetGenerator({ name, type });
const insert = InsertGenerator({ name, type });

const create = ({ ref }) => ({
    element: name,
    type,
    ref,
    text: ref,
});

const Element = (props) => (
    <span className={styles.wrapper} {...props.attributes}>
        {props.children}
    </span>
);


const definition = {
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
