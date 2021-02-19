// @flow
import { Editor, Transforms, Text } from 'slate';
import { BiItalic } from 'react-icons/bi';

import { toggleMark } from '../../../customize/extras.js';
import { SetGenerator, UnsetGenerator, InsertGenerator } from '../actionGenerator';
import Richtext from './index';
import type { ElementDefinition, ElementLeafType } from '../index';

import styles from './leaf.module.css';

const name = 'underline';
const command = 'u';
const type = 'inline';

const set = ({ event, editor, at, meta }) => Editor.addMark(editor, name, true);
const unset = ({ event, editor, at, meta }) => Editor.removeMark(editor, name);
const insert = ({ event, editor, at, meta }) => toggleMark(editor, name);

type createParamsType = { text: string };
const create = ({ text }: createParamsType): ElementLeafType => ({
    element: name,
    type,
    underline: true,
    text,
});


const Element = (props: Object) => (
    <Richtext {...props} />
);

const definition: ElementDefinition = {
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