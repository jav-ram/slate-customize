import { Editor, Transforms, Text } from 'slate';
import { BiItalic } from 'react-icons/bi';

import { Richtext } from './index';
import { toggleMark } from '../../../customize/extras.js';
import { SetGenerator, UnsetGenerator, InsertGenerator } from '../../../customize/elements/actionGenerator';

import styles from './leaf.module.css';

const name = 'underline';
const command = 'u';
const type = 'inline';

const set = ({ event, editor, at, meta }) => Editor.addMark(editor, name, true);
const unset = ({ event, editor, at, meta }) => Editor.removeMark(editor, name);
const insert = InsertGenerator({ name, type });

const create = ({ text }) => ({
    element: name,
    type,
    underline: true,
    text,
});


const Element = (props) => (
    <Richtext {...props} />
);

const definition = {
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