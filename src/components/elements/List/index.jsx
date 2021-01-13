// @flow
import * as React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { VscSymbolArray } from 'react-icons/vsc';

import { ActionGenerator } from '../index';
import type { ElementDefinition } from '../index';

import styles from './list.module.css';

const name = 'list';

const Element = (props: any) => (
    <p className={styles.wrapper} {...props.attributes}>
        {props.children}
    </p>
);

const definition: ElementDefinition = {
    name,
    action: ActionGenerator({ name, type: 'block', isNested: true }),
    hotkey: 'ctrl+l',
    icon: VscSymbolArray,
    component: Element,
}

export default definition;
