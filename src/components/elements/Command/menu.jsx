// @flow
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import type { ElementDefinition } from '../index';

import styles from './menu.module.css';

type MenuPropsType = {
    elements: {[string]: ElementDefinition}
}

export const Portal = ({ children, ref }) => ReactDOM.createPortal(children, ref || document.body);

const Item = (element: ElementDefinition) => {
    return (
        <div className={styles.itemContainer} key={element.name}>
            {element.icon()}
            <span> { element.name } </span>
            <code> { element.command } </code>
        </div>
    );
}

const Menu = ({ elements }: MenuPropsType) => {
    const ref = useRef<HTMLDivElement | void>();
    useEffect(() => {
        const el = ref.current;

        if (!el) {
            return;
        }

        const domSelection = window.getSelection();
        const domRange = domSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();
        el.style.opacity = '1';
        el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
        el.style.left = `${rect.left
            + window.pageXOffset
            - el.offsetWidth / 2
            + rect.width / 2}px`;
    });
    return (
        <Portal>
            <div ref={ref} className={styles.menuContainer} contentEditable={false}>
                { Object.values(elements).map((element: ElementDefinition) => <Item {...element} /> ) }
            </div>
        </Portal>
    );
}

export default Menu;
