import React, { useMemo, useState, useCallback } from 'react';
import { Editor, createEditor, Transforms, Text } from 'slate';
import { Slate, Editable, withReact } from 'slate-react';
import VariableElement from '../components/elements/Variable';

import Variable from '../components/elements/Variable';


const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>
}


const EditorElement = (...props) => {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState([
      {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
      },
    ])

    const id = Math.random();

    const renderLeaf = useCallback( props => {
        switch (props.leaf.element) {
            case 'variable':
                return <VariableElement {...props} />;
            default:
                return <span {...props.attributes}>{ props.children }</span>
        }

    }, [])

  
    return (
        <div>
            <Slate
                editor={editor}
                value={value}
                onChange={value => {
                    setValue(value)
                    // Save the value to Local Storage.
                    const content = JSON.stringify(value);
                    console.log(content)
                }}>
                <Editable
                    renderLeaf={renderLeaf}
                    onKeyDown={event => {
                        const s = editor.selection;
                        console.log(s.anchor.offset, s.focus.offset);
                        if (event.key === 'a' && event.ctrlKey) {
                            event.preventDefault();
                            // Determine whether any of the currently selected blocks are code blocks.
                            const [match] = Editor.nodes(editor, {
                                match: n => n.element === 'variable',
                            });
                            if (match === undefined) {
                                Transforms.setNodes(
                                    editor,
                                    { element: 'variable', id },
                                    {
                                        at: s,
                                        match: n => Text.isText(n),
                                        split: true, 
                                        mode: 'lowest',
                                    }
                                );
                            } else {
                                Transforms.unsetNodes(
                                    editor,
                                    ['element', 'id'],
                                    {
                                        at: s,
                                        match: n => Text.isText(n),
                                        split: true
                                    }
                                );
                            }
                        }
                    }}
                />
            </Slate>
        </div>
    )
}

export default EditorElement;