import React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { BiItalic } from 'react-icons/bi';

import { Richtext } from './index';
import { toggleMark } from '../../extras.js';
import { SetGenerator, UnsetGenerator, InsertGenerator } from '../actionGenerator';

import type { ElementDefinitionType, ElementLeafType } from '../../../customize/elements';

import styles from './leaf.module.css';

const name = 'italic';
const command = 'i';
const type = 'inline';

const set = ({ event, editor, at, meta }) => Editor.addMark(editor, name, true);
const unset = ({ event, editor, at, meta }) => Editor.removeMark(editor, name);
const insert = InsertGenerator({ name, type });

type createParamsType = { text: string };
const create = ({ text }: createParamsType): ElementLeafType => ({
    element: name,
    type,
    italic: true,
    text,
});


const Element = (props: any) => (
    <Richtext {...props} />
);

const definition: ElementDefinitionType = {
    name,
    command,
    icon: BiItalic,
    component: Element,
    type,

    create,

    set,
    unset,
    insert,
};

export default definition;