// @flow
import * as React from 'react';
import { Editor, Transforms, Text } from 'slate';

import { GiChoice } from 'react-icons/gi';

import styles from './conditional.module.css';

const name = 'conditional';

const action = (event: SyntheticEvent<HTMLButtonElement>, editor: any) => {
    event.preventDefault();

    const list = { type: 'block', element: name, children: [{ text: '' }] }
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
    icon: GiChoice,
    component: Element,
}

export default definition;
