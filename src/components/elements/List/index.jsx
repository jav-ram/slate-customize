import * as React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { VscSymbolArray } from 'react-icons/vsc';

import { SetGenerator, UnsetGenerator, InsertGenerator } from '../../../customize/elements/actionGenerator';

import styles from './list.module.css';

const create = ({ children, refs }) => ({
    element: name,
    type,
    children,
    refs
});

const name = 'list';
const command = 'list';
const type = 'inline';

const set = SetGenerator({ name, type });
const unset = UnsetGenerator({ name, type });
const insert = InsertGenerator({ name, type });

const Element = (props) => (
    <p className={styles.wrapper} {...props.attributes}>
        {props.children}
    </p>
);

const definition = {
    name,
    command,
    type,
    icon: VscSymbolArray,
    component: Element,

    create,

    set,
    unset,
    insert,
}

export default definition;
