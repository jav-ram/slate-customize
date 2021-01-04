import React from 'react';
import { Editor, Transforms, Text } from 'slate';

import { VscSymbolArray } from 'react-icons/vsc';

import styles from './list.module.css';

export const ListName = 'list';

export const ListDefinition = {
    name: ListName,
    action: (event, editor) => {
        event.preventDefault();

        const list = { type: 'block', element: 'list', children: [{ text: '' }] }
        Transforms.wrapNodes(editor, list, { split: true })
    },
    icon: VscSymbolArray
};


const ListElement = (props) => (
    <p className={styles.wrapper} {...props.attributes}>
        {props.children}
    </p>
);

export default ListElement;