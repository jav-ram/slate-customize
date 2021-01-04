import React from 'react';
import { Editor, Transforms, Text } from 'slate';

import { VscSymbolArray } from 'react-icons/vsc';

import styles from './list.module.css';

const name = 'list';

const action = (event: SyntheticEvent<HTMLButtonElement>, editor) => {
    event.preventDefault();

    const list = { type: 'block', element: 'list', children: [{ text: '' }] }
    Transforms.wrapNodes(editor, list, { split: true })
}


const Element = (props) => (
    <p className={styles.wrapper} {...props.attributes}>
        {props.children}
    </p>
);

const definition = {
    name,
    action,
    icon: VscSymbolArray,
    component: Element,
}

export default definition;
