import React from 'react';
import { Editor, Transforms, Text } from 'slate';

import { VscSymbolVariable } from 'react-icons/vsc';

import styles from './variable.module.css';

export const VariableName = 'variable';

export const VariableDefinition = {
    name: VariableName,
    action: (event, editor) => {
        event.preventDefault();

        const [match] = Editor.nodes(editor, {
            match: n => n.element === VariableName,
        });

        if (!match) {
            Transforms.setNodes(
                editor,
                { element: VariableName },
                { match: n => Text.isText(n), split: true }
            );
        } else {
            Transforms.unsetNodes(editor, ['element'], { match: n => Text.isText(n)});
        }
        
    },
    icon: VscSymbolVariable
};


const VariableElement = (props) => (
    <span className={styles.wrapper} {...props.attributes}>
        {props.children}
    </span>
);

export default VariableElement;