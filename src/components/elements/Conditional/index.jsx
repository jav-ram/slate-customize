// @flow
import * as React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { GiChoice } from 'react-icons/gi';

import { ActionGenerator } from '../index';
import type { ElementDefinition } from '../index';

import styles from './conditional.module.css';

const name = 'conditional';

const Element = (props) => (
    <p className={styles.wrapper} {...props.attributes}>
        {props.children}
    </p>
);

const definition: ElementDefinition = {
    name,
    action: ActionGenerator({ name, type: 'block', isNested: true }),
    hotkey: 'ctrl+v',
    icon: GiChoice,
    component: Element,
}

export default definition;
