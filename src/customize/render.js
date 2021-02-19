// @flow
import * as React from 'react';
import type { ComponentType, Element as ReactElement } from 'react';

import { Elements } from '../components/elements';

import type { ElementDefinition } from '../components/elements';

type ElementRendererFunctionType = (Object) => ReactElement<*>;

const DefaultElement = (props) => <p {...props.attributes}>{props.children}</p>;

export const MakeElementRenderer = (elements: { [string]: ElementDefinition }): ElementRendererFunctionType => {
    const ElementRenderer = (props) => {
        const name = props.element.element;
        const element = Elements[name];

        if (element) {
            const Component = element.component;
            return <Component {...props} />;
        } else {
            // default
            return <DefaultElement {...props} />
        }
    }
    return ElementRenderer;
}

export const MakeLeafRenderer = (elements: { [string]: ElementDefinition }): ElementRendererFunctionType => {
    const LeafRenderer = (props) => {
        const name = props.leaf.element;
        const leaf = Elements[name];
        if (leaf) {
            const Leaf = leaf.component;
            return <Leaf {...props} />
        }
        else {
            // default
            return <span {...props.attributes}>{props.children}</span>
        }
    }
    return LeafRenderer;
}