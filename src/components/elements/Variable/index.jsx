import React, { Component } from 'react';
import styles from './variable.module.css';

class VariableElement extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { ...props } = this.props;
        return (
            <span className={styles.wrapper} {...props.attributes}>
                {props.children}
            </span>    
        );
    }
}

export default VariableElement;