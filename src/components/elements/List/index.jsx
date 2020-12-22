import React from 'react';
import { Editor, Transforms, Text } from 'slate';

import { VscSymbolArray } from 'react-icons/vsc';

import styles from './list.module.css';

export const ListName = 'list';

export const ListDefinition = {
    name: ListName,
    action: (event, editor) => {
        event.preventDefault();

        const list = { element: 'list', children: [{ text: '' }] }
        Transforms.wrapNodes(editor, list, { split: true })
    },
    icon: VscSymbolArray
};


const ListElement = (props) => (
    <span className={styles.wrapper} {...props.attributes}>
        {props.children}
    </span>
);

export default ListElement;