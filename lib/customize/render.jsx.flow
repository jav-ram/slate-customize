import * as React from 'react';

import { Elements } from '../components/elements';

const DefaultElement = (props) => <p {...props.attributes}>{props.children}</p>;

export const MakeElementRenderer = (elements) => {
    const ElementRenderer = (props, editor) => {
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

export const MakeLeafRenderer = (elements) => {
    const LeafRenderer = (props, editor) => {
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