import React from 'react';
import { Editor, Transforms, Text } from 'slate';
import { BiHeading } from 'react-icons/bi';

import type { ElementBlockType, ElementDefinitionType } from '../../elements';

import { SetGenerator, UnsetGenerator, InsertGenerator } from '../../../customize/elements/actionGenerator';
import styles from './titles.module.css';

export type TitleElementType = ElementBlockType;

const name = 'title';
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


const H1 = (props: any) => (
    <h1 className={styles.h1} {...props.attributes}>
        { props.children }
    </h1>
);

const H2 = (props: any) => (
    <h2 className={styles.h2} {...props.attributes}>
        { props.children }
    </h2>
);

const H3 = (props: any) => (
    <h3 className={styles.h3} {...props.attributes}>
        { props.children }
    </h3>
);

const H4 = (props: any) => (
    <h4 className={styles.h4} {...props.attributes}>
        { props.children }
    </h4>
);

const definition: ElementDefinitionType = {
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