// @flow
import React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { MdErrorOutline } from 'react-icons/md';

import ActionGenerator from '../actionGenerator';
import type { ElementDefinition } from '../index';

import styles from './error.module.css';

const name = 'error';
const command = '';
const hotkey = '';

const Element = (props: any) => (
    <span className={styles.error} {...props.attributes}>
        {props.children}
    </span>
);

const definition: ElementDefinition = {
    name,
    action: ()=>{},
    hotkey,
    command,
    icon: MdErrorOutline,
    component: Element,
};

export default definition;
