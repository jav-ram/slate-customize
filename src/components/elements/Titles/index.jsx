// @flow
import { Editor, Transforms, Text } from 'slate';
import { BiHeading } from 'react-icons/bi';

import { SetGenerator, UnsetGenerator, InsertGenerator } from '../actionGenerator';
import type { ElementDefinition, ElementBlockType } from '../index';

import styles from './titles.module.css';

export type TitleElementType = ElementBlockType;

const name = 'heading 1';
const command = 'h1';
const type = 'block';

const set = UnsetGenerator({ name, type })
const unset = UnsetGenerator({ name, type });
const insert = InsertGenerator({ name, type });

type createParamsType = { title: string };
const create = ({ title }: createParamsType): TitleElementType => ({
    element: name,
    type,
    children: [{
        text: title,
        type: 'inline'
    }]
});


const H1 = (props: Object) => (
    <h1 className={styles.h1} {...props.attributes}>
        { props.children }
    </h1>
);

const H2 = (props: Object) => (
    <h2 className={styles.h2} {...props.attributes}>
        { props.children }
    </h2>
);

const H3 = (props: Object) => (
    <h3 className={styles.h3} {...props.attributes}>
        { props.children }
    </h3>
);

const H4 = (props: Object) => (
    <h4 className={styles.h4} {...props.attributes}>
        { props.children }
    </h4>
);

const definition: ElementDefinition = {
    name,
    command,
    icon: BiHeading,
    component: H1,
    type,

    create,

    set,
    unset,
    insert,
};

export default definition;