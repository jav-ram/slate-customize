// @flow
import { Editor, Transforms, Text } from 'slate';
import { BiBold } from 'react-icons/bi';

import { toggleMark } from '../../../customize/extras.js';
import { SetGenerator, UnsetGenerator, InsertGenerator } from '../actionGenerator';
import type { ElementDefinition, ElementLeafType } from '../index';

import styles from './leaf.module.css';

const name = 'bold';
const command = 'b';
const type = 'inline';

const set = ({ event, editor, at, meta }) => Editor.addMark(editor, name, true);
const unset = ({ event, editor, at, meta }) => Editor.removeMark(editor, name);
const insert = ({ event, editor, at, meta }) => toggleMark(editor, name);

type createParamsType = { text: string };
const create = ({ text }: createParamsType): ElementLeafType => ({
    element: name,
    type,
    bold: true,
    text,
});


const Element = (props: Object) => (
    <b className={styles.bold} {...props.attributes}>
        { props.children }
    </b>
);

const definition: ElementDefinition = {
    name,
    command,
    icon: BiBold,
    component: Element,
    type,

    create,

    set,
    unset,
    insert,
};

export default definition;