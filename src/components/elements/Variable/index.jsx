import React from 'react';
import styles from './variable.module.css';

const VariableElement = (props) => (
    <span className={styles.wrapper} {...props.attributes}>
        {props.children}
    </span>
);

export default VariableElement;