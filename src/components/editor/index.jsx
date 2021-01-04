//@flow
import React, { useMemo, useState, useCallback } from 'react';
import type { Node } from 'react';
import isHotkey from 'is-hotkey';

import { Editor, createEditor, Transforms, Text, Range, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

import Toolbar from '../toolbar';

import VariableDefinition from '../elements/Variable';
import ListDefinition from '../elements/List';


const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>
}

const EditorElement = ():Node => {
    const editor = useMemo(() => withHistory(withReact(createEditor()), []), []);
    const { isInline, isVoid } = editor;

    editor.isInline = node => {
        if (node.element === 'list' || node.element === 'variable' || node.text !== undefined) {
            return true
        }
        return false
    }

    

    const [value, setValue] = useState([
      {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ])

    const renderElement = (props) => {
        if (props.element.element === 'list') {
            const List = ListDefinition.component;
            return <List {...props} />
        }
        return <DefaultElement {...props} />
    }

    const renderLeaf = useCallback( props => {
        switch (props.leaf.element) {
            case VariableDefinition.name:
                const Variable = VariableDefinition.component;
                return <Variable {...props} />;
            case ListDefinition.name:
                const List = ListDefinition.component;
                return <List {...props} />
            default:
                return <span {...props.attributes}>{ props.children }</span>
        }

    }, [])

    return (
        <div>
            <Toolbar editor={editor} options={[VariableDefinition, ListDefinition]} />
            <Slate
                editor={editor}
                value={value}
                onChange={value => {
                    setValue(value)
                    // Save the value to Local Storage.
                    console.log(value)
            }}>
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={event => {
                        console.log(event)
                        if (event.key === 'a' && event.ctrlKey) {}
                    }}
                />
            </Slate>
        </div>
    )
}

export default EditorElement;