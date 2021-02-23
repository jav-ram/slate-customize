// @flow
import * as React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { VscSymbolArray } from 'react-icons/vsc';

import { SetGenerator, UnsetGenerator, InsertGenerator } from '../actionGenerator';
import type { ElementDefinition, ElementBlockType, ElementLeafType, ElementType } from '../index';

import styles from './list.module.css';

export type ListElementType = ElementBlockType & {
    refs: string | string[],
};

type createParamsType = { children: ElementType[], refs: string | string[] };
const create = ({ children, refs }: createParamsType): ListElementType => ({
    element: name,
    type,
    children,
    refs
});

const name = 'list';
const command = 'list';
const type = 'block';

const set = SetGenerator({ name, type });
const unset = UnsetGenerator({ name, type });
const insert = InsertGenerator({ name, type });

const Element = (props: any) => (
    <p className={styles.wrapper} {...props.attributes}>
        {props.children}
    </p>
);

const definition: ElementDefinition = {
    name,
    command,
    type,
    icon: VscSymbolArray,
    component: Element,

    create,

    set,
    unset,
    insert,
}

export default definition;
