// @flow
import React, { useState, useCallback } from 'react';
import type { Node } from 'react';
import isHotkey from 'is-hotkey';
import { Editor, createEditor, Transforms, Text, Range, Element as SlateElement, Node as SlateNode } from 'slate';
import { Slate, Editable } from 'slate-react';

import { withCustomize, iterateSlateValue } from '../../customize';
import { MakeElementRenderer, MakeLeafRenderer } from '../../customize/render';
import { customizeOnKeyDown } from '../../customize/commands';
import { OnChangeUpload } from '../../customize/serializer/upload';

import Toolbar from '../toolbar';
import HoveringToolbar from '../hovermenu';
import { Elements } from '../elements';
import command from '../elements/Command';

import { getNode } from '../hovermenu';

const DefaultElement = (props) => <p {...props.attributes}>{props.children}</p>;

const EditorElement = (): Node => {
    const [ file, setFile ] = useState({})

    const { list, variable, conditional, title } = Elements;

    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisl nisi, placerat nec eros ac, finibus lacinia leo. Aenean sagittis ligula molestie felis gravida, tempus placerat libero lobortis. Aenean efficitur scelerisque augue, eu gravida tellus egestas eget. Vestibulum rutrum mauris et massa blandit, sit amet semper ipsum mollis. Duis euismod sapien dolor, non consequat leo eleifend ut. Nam libero lectus, rutrum vel velit eu, semper porta diam. Integer ultricies odio id tincidunt rutrum. Duis tristique diam justo, placerat viverra leo laoreet pharetra. Aenean sed vestibulum odio, vitae sollicitudin magna. Curabitur id augue vel nisi vehicula molestie commodo at tellus. Aliquam ut bibendum mauris. Proin sed urna dolor. Vestibulum nec velit nec arcu vulputate pharetra. Praesent nibh massa, gravida sit amet dui a, ultrices maximus eros. Integer iaculis metus et velit eleifend lobortis eu quis odio. Nullam sed aliquam diam, iaculis iaculis sem.' }],
        },
    ]);
    const editor = withCustomize(createEditor(), Elements);
    
    const renderElement = MakeElementRenderer(Elements);
    const renderLeaf = MakeLeafRenderer(Elements);

    return (
        <div spellCheck="false">
            <input type="file" name="file" onChange={ (event) => OnChangeUpload(event, setValue) }/>
            {/* <Toolbar editor={editor} options={Elements} /> */}
            <Slate
                editor={editor}
                value={value}
                onChange={value => {
                    setValue(value);
                    // Save the value to Local Storage.
                    console.log(value);
                }}
            >
                {/* <HoveringToolbar value={value} /> */}
                <Editable
                    renderElement={(props) => renderElement(props, editor)}
                    renderLeaf={(props) => renderLeaf(props, editor)}
                    onKeyDown={event => {
                        customizeOnKeyDown(event, editor, value);
                    }}
                />
            </Slate>
        </div>
    )
}

export default EditorElement;
