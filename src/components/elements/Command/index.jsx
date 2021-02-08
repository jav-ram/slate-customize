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

const set = ({event, editor, at, token}: ActionParamsType): void => {
    const options = {
        match: n => Text.isText(n) && n.type !== 'inline',
        split: true,
    };
    if (at) options.at = at;
    Transforms.setNodes(
        editor,
        { element: name, token },
        options,
    );
}

export const unset = ({event, editor, at}: ActionParamsType): void => {
    const options = {
        match: n => Text.isText(n) && n.type !== 'inline',
        split: true,
    };
    if (at) options.at = at;
    Transforms.unsetNodes(
        editor,
        ['element', 'token'],
        options,
    );
}

const Element = (props: any) => {
    const text = props.children.props.text.text;
    console.log(text === '/' || text === '/ ')
    return (
        <span className={styles.command}>
            <span {...props.attributes}>
                {props.children}
            </span>
            { text === '/' || text === '/ ' ? 
                <span
                style={{
                    pointerEvents: "none",
                    display: "inline",
                    width: "0",
                    maxWidth: "100%",
                    whiteSpace: "nowrap",
                    opacity: 0.333,
                    verticalAlign: "text-top",
        
                    // placeholders shouldn't interfere with height
                    // of the object
                    height: 0
                  }} contentEditable={false}> Insert command... </span>
                : null
            }
        </span>
    );
}

const definition: ElementDefinition = {
    name,
    action: set,
    hotkey,
    command,
    icon: MdErrorOutline,
    component: Element,
    hideInToolbar: true,
    unset: unset,
};

export default definition;
