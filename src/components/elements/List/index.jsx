import React from 'react';
import { Editor, Transforms, Text } from 'slate';

import { VscSymbolArray } from 'react-icons/vsc';

import styles from './list.module.css';

export const ListName = 'list';

export const ListDefinition = {
    name: ListName,
    action: (event, editor) => {
        event.preventDefault();

        const [match] = Editor.nodes(editor, {
            match: n => n.element === ListName,
        });

        Transforms.wrapNodes(
            editor,
            { type: 'paragraph', element: ListName},
            { match: n => Text.isText(n), mode: 'highest' }
        );
        
    },
    icon: VscSymbolArray
};


const ListElement = (props) => (
    <span className={styles.wrapper} {...props.attributes}>
        {props.children}
    </span>
);

export default ListElement;