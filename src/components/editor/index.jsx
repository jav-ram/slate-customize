// @flow
import React, { useState, useCallback } from 'react';
import type { Node } from 'react';
import isHotkey from 'is-hotkey';
import { Editor, createEditor, Transforms, Text, Range, Element as SlateElement } from 'slate';
import { Slate, Editable } from 'slate-react';

import { withCusmize } from '../../customize';
import Decorator from '../../customize/decorator';

import Toolbar from '../toolbar';
import HoveringToolbar from '../hovermenu';
import { Elements } from '../elements';
import error from '../elements/Error';

const DefaultElement = (props) => <p {...props.attributes}>{props.children}</p>;

const EditorElement = (): Node => {
    const editor = withCusmize(createEditor());
    const { list, variable, conditional } = Elements;
    const decorator = Decorator;

    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: 'A line of text in a paragraph.' }],
        },
    ]);

    const renderElement = (props) => {
        if (props.element.element === list.name) {
            const List = list.component;
            return <List {...props} />
        }
        if (props.element.element === conditional.name) {
          const Conditional = conditional.component;
          return <Conditional {...props} />
        }
        return <DefaultElement {...props} />
    }

    const renderLeaf = useCallback( props => {
        switch (props.leaf.element) {
            case variable.name:
                const Variable = variable.component;
                return <Variable {...props} />;
            case error.name:
                const Error = error.component;
                console.log(props.leaf.element, error.name);
                return <Error {...props} />;
            default:
                return <span {...props.attributes}>{ props.children }</span>
        }

    }, [])
    return (
        <div spellcheck="false">
            <Toolbar editor={editor} options={Elements} />
            <Slate
                editor={editor}
                value={value}
                onChange={value => {
                setValue(value)
                // Save the value to Local Storage.
                console.log(value);
            }}>
                <HoveringToolbar value={value} />
                <Editable
                    decorate={decorator}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={event => {
                        console.log(editor.selection.anchor)
                        if (event.key === 'a' && event.ctrlKey) {}
                    }}
                />
            </Slate>
        </div>
    )
}

export default EditorElement;
