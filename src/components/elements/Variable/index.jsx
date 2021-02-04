// @flow
import React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { VscSymbolVariable } from 'react-icons/vsc';

import ActionGenerator from '../actionGenerator';
import type { ElementDefinition } from '../index';

import styles from './variable.module.css';

const name = 'variable';
const command = 'v';
const hotkey = 'ctrl+v';

const Element = (props: any) => {
    if (props.text.text === "") {
        console.log(props.children);
    }
    return(
        <span className={styles.wrapper} {...props.attributes}>
            {props.children}
        </span>
    );
}


const definition: ElementDefinition = {
    name,
    action: ActionGenerator({ name, type: 'inline' }),
    hotkey,
    command,
    icon: VscSymbolVariable,
    component: Element,
};

export default definition;
