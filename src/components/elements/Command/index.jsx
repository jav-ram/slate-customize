// @flow
import React, { useRef } from 'react';
import { Editor, Transforms, Text } from 'slate';
import { MdErrorOutline } from 'react-icons/md';

import Menu from './menu';
import { Elements } from '../index';
import type { ActionParamsType } from '../actionGenerator';
import type { ElementDefinition } from '../index';

import styles from './command.module.css';

const name = 'command';
const command = '';
const type = 'inline';

const set = ({ event, editor, at }: ActionParamsType): void => {
    const options = {
        match: n => Text.isText(n) && n.type !== type,
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
    const options = {
        match: n => Text.isText(n) && n.type !== type,
        split: true,
    };
    if (at) options.at = at;
    Transforms.unsetNodes(
        editor,
        ['element'],
        options,
    );
}

const Placeholder = (props) => {
    if (props.condition) {
        return (
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
                }}
                contentEditable={false}
            >
                {props.children}
            </span>
        );
    }
    return null;
}

const Element = (props: any) => {
    const ref = useRef<HTMLSpanElement | any>();
    const text = props.children.props.text.text;
    return (
        <span
            ref={ref}
            className={styles.command}
        >
            <span {...props.attributes}>
                {props.children}
            </span>
            <Placeholder condition={text === '/' || text === '/ '}> Insert command...</Placeholder>
            <Menu text={text} command={ref} elements={Elements} />
        </span>
    );
}

const definition: ElementDefinition = {
    name,
    command,
    component: Element,
    type,
    set,
    unset,
};

export default definition;
