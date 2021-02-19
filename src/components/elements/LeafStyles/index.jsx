// @flow 
import * as React from 'react';

import styles from './leaf.module.css';

const Richtext = (props: Object): React.Element<*> => (
    <span { ...props.attributes } className={`
        ${props.bold ? styles.bold : ''}
        ${props.italic ? styles.italic : ''}
        ${props.underline ? styles.underline : ''}
    `}>
        { props.children }
    </span>
);

export default Richtext;