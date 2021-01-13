// @flow
import React, { useState, useCallback } from 'react';
import type { Node } from 'react';
import isHotkey from 'is-hotkey';
import { Editor, createEditor, Transforms, Text, Range, Element as SlateElement } from 'slate';
import { Slate, Editable } from 'slate-react';

import { withCusmize } from '../../customize';

import Toolbar from '../toolbar';
import HoveringToolbar from '../hovermenu';
import VariableDefinition from '../elements/Variable';
import ListDefinition from '../elements/List';
import ConditionalDefinition from '../elements/Conditional';

const DefaultElement = (props) => <p {...props.attributes}>{props.children}</p>;

const EditorElement = (): Node => {
    const editor = withCusmize(createEditor());

    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }],
        },
    ]);

    const renderElement = (props) => {
        if (props.element.element === ListDefinition.name) {
            const List = ListDefinition.component;
            return <List {...props} />
        }
        if (props.element.element === ConditionalDefinition.name) {
          const Conditional = ConditionalDefinition.component;
          return <Conditional {...props} />
        }
        return <DefaultElement {...props} />
    }

    const renderLeaf = useCallback( props => {
        switch (props.leaf.element) {
        case VariableDefinition.name:
            const Variable = VariableDefinition.component;
            return <Variable {...props} />;
        default:
            return <span {...props.attributes}>{ props.children }</span>
        }

    }, [])
    return (
        <div>
            <Toolbar editor={editor} options={[VariableDefinition, ListDefinition, ConditionalDefinition]} />
            <Slate
                editor={editor}
                value={value}
                onChange={value => {
                setValue(value)
                // Save the value to Local Storage.
                console.log(value)
            }}>
                <HoveringToolbar value={value} />
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={event => {
                        if (event.key === 'a' && event.ctrlKey) {}
                    }}
                />
            </Slate>
        </div>
    )
}

export default EditorElement;
