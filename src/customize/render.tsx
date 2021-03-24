import * as React from 'react';
import type { FunctionComponent } from 'react';
import type { Editor } from 'slate';

import { Elements } from '../components/elements';
import type { ElementsDefinitionTypes } from './elements';

const DefaultElement = (props: any) => <p {...props.attributes}>{props.children}</p>;

type ElementRendererFunctionType = (props: any, editor: Editor) => JSX.Element;

export const MakeElementRenderer = (elements: ElementsDefinitionTypes): ElementRendererFunctionType => {
    const ElementRenderer = (props: any, editor: Editor) => {
        const name = props.element.element;
        const element = elements[name];

        if (element) {
            const Component = element.component;
            return <Component editor={editor} {...props} />;
        } else {
            // default
            return <DefaultElement {...props} />
        }
    }
    return ElementRenderer;
}

export const MakeLeafRenderer = (elements: ElementsDefinitionTypes): ElementRendererFunctionType => {
    const LeafRenderer = (props: any, editor: Editor) => {
        const name = props.leaf.element;
        const leaf = elements[name];
        if (leaf) {
            const Leaf = leaf.component;
            return <Leaf
                editor={editor}
                {...props}
                elements={leaf.name === "command" ? elements : undefined}
            />
        }
        else {
            // default
            return <span {...props.attributes}>{props.children}</span>
        }
    }
    return LeafRenderer;
}