// @flow
import React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { VscSymbolVariable } from 'react-icons/vsc';

import ActionGenerator from '../actionGenerator';
import type { ElementDefinition } from '../index';

import styles from './variable.module.css';

const name = 'variable';
const command = 'var';
const type = 'inline';


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
    command,
    icon: VscSymbolVariable,
    component: Element,
    type,
};

export default definition;
