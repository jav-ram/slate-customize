import * as React from 'react';
import Bold from './bold';
import Italic from './italic';
import Underline from './underline';

import styles from './leaf.module.css';

export const Richtext = (props: any) => (
    <span { ...props.attributes } className={`
        ${props.leaf.element === 'bold' || props.leaf.bold ? styles.bold : ''}
        ${props.leaf.element === 'italic' || props.leaf.italic ? styles.italic : ''}
        ${props.leaf.element === 'underline' || props.leaf.underline ? styles.underline : ''}
    `}>
        { props.children }
    </span>
);

export const BoldDefinition = Bold;
export const ItalicDefinition = Italic;
export const UnderlineDefinition = Underline;