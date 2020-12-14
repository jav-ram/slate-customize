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

    const renderElement = (props) => {
        return <DefaultElement {...props} />
    }

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
                        if (event.key === 'a' && event.ctrlKey) {
                            event.preventDefault()
                            Transforms.setNodes(
                                editor,
                                { element: 'variable' },
                                { match: n => Text.isText(n), split: true }
                            )
                        }
                    }}
                />
            </Slate>
        </div>
    )
}

export default EditorElement;