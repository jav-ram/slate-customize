// @flow
import React, { useState, useCallback } from 'react';
import type { Node } from 'react';
import isHotkey from 'is-hotkey';
import { Editor, createEditor, Transforms, Text, Range, Element as SlateElement, Node as SlateNode } from 'slate';
import { Slate, Editable } from 'slate-react';

import { withCustomize } from '../../customize';
import { customizeOnKeyDown } from '../../customize/commands';

import Toolbar from '../toolbar';
import HoveringToolbar from '../hovermenu';
import { Elements } from '../elements';
import command from '../elements/Command';

import { getNode } from '../hovermenu';

const DefaultElement = (props) => <p {...props.attributes}>{props.children}</p>;

const EditorElement = (): Node => {

    const { list, variable, conditional } = Elements;

    const [value, setValue] = useState([
        {
            type: 'paragraph',
            children: [{ text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nisl nisi, placerat nec eros ac, finibus lacinia leo. Aenean sagittis ligula molestie felis gravida, tempus placerat libero lobortis. Aenean efficitur scelerisque augue, eu gravida tellus egestas eget. Vestibulum rutrum mauris et massa blandit, sit amet semper ipsum mollis. Duis euismod sapien dolor, non consequat leo eleifend ut. Nam libero lectus, rutrum vel velit eu, semper porta diam. Integer ultricies odio id tincidunt rutrum. Duis tristique diam justo, placerat viverra leo laoreet pharetra. Aenean sed vestibulum odio, vitae sollicitudin magna. Curabitur id augue vel nisi vehicula molestie commodo at tellus. Aliquam ut bibendum mauris. Proin sed urna dolor. Vestibulum nec velit nec arcu vulputate pharetra. Praesent nibh massa, gravida sit amet dui a, ultrices maximus eros. Integer iaculis metus et velit eleifend lobortis eu quis odio. Nullam sed aliquam diam, iaculis iaculis sem.' }],
        },
    ]);
    const editor = withCustomize(createEditor(), Elements, value);
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
            case command.name:
                const Command = command.component;
                return <Command {...props} />;
            default:
                return <span {...props.attributes}>{ props.children }</span>
        }

    }, [])
    return (
        <div spellCheck="false">
            <Toolbar editor={editor} options={Elements} />
            <Slate
                editor={editor}
                value={value}
                onChange={value => {
                    setValue(value)
                    // Save the value to Local Storage.
                    console.log(value);
                }}
            >
                <HoveringToolbar value={value} />
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={event => {
                        customizeOnKeyDown(event, editor);
                    }}
                />
            </Slate>
        </div>
    )
}

export default EditorElement;
