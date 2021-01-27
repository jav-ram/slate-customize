// @flow
import React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { MdErrorOutline } from 'react-icons/md';

import ActionGenerator from '../actionGenerator';
import type { ActionParamsType } from '../actionGenerator';
import type { ElementDefinition } from '../index';

import styles from './command.module.css';

const name = 'command';
const command = '';
const hotkey = '';

const set = ({event, editor, at}: ActionParamsType): void => {
    event && event.preventDefault();
    const options = {
        match: n => Text.isText(n) && n.type !== 'inline',
        split: true,
    };
    if (at) options.at = at;
    Transforms.setNodes(
        editor,
        { element: name },
        options,
    );
}

export const unset = ({event, editor, at}: ActionParamsType): void => {
    event && event.preventDefault();
    const options = {
        match: n => Text.isText(n) && n.type !== 'inline',
        split: true,
    };
    if (at) options.at = at;
    Transforms.unsetNodes(
        editor,
        [name],
        options,
    );
}

const Element = (props: any) => (
    <span className={styles.command} {...props.attributes}>
        {props.children}
    </span>
);

const definition: ElementDefinition = {
    name,
    action: set,
    hotkey,
    command,
    icon: MdErrorOutline,
    component: Element,
    hide: true,
    unset: unset,
};

export default definition;
