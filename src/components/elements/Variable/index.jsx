// @flow
import React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { VscSymbolVariable } from 'react-icons/vsc';

import { ActionGenerator } from '../index';

import type { ElementDefinition } from '../index';

import styles from './variable.module.css';

const name = 'variable';

const Element = (props: any) => (
    <span className={styles.wrapper} {...props.attributes}>
        {props.children}
    </span>
);

const definition: ElementDefinition = {
    name,
    action: ActionGenerator({ name, type: 'inline' }),
    hotkey: 'ctrl+v',
    icon: VscSymbolVariable,
    component: Element,
};

export default definition;
