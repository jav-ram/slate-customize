// @flow
import * as React from 'react';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import type { ElementDefinition } from '../index';

import styles from './menu.module.css';

type MenuPropsType = {
    command?: React.ElementRef<'span'>,
    elements: {[string]: ElementDefinition},
    text: string
}

type filterCommandParamsType = ({[string]: ElementDefinition}, string) => Array<ElementDefinition>;
type PortalPropsType = { children: React.Node, ref?: React.ElementRef<'span'> };
export const Portal = ({ children, ref }: PortalPropsType): React.Node => ReactDOM.createPortal(children, ref || document.body);

const Item = (element: ElementDefinition) => {
    return (
        <div className={styles.itemContainer} key={element.name}>
            <div className={styles.itemLeftContainer}>
                {element.icon ? element.icon() : null}
                <span className={styles.itemName}> { element.name } </span>
            </div>
            <code className={styles.itemCommand}> { element.command } </code>
        </div>
    );
}

const filterCommand = (elements, text): [ElementDefinition] => {
    const command = text.replace('/', '').replace(' ', '');
    const byName = Object.values(elements).filter((element: ElementDefinition) => element.name.includes(command));
    const byCommand = Object.values(elements).filter((element: ElementDefinition) => element.command.includes(command));

    return _.union(byName, byCommand);
}

const Menu = ({ elements, command, text }: MenuPropsType): React.Node => {
    const ref = useRef<?React.ElementRef<'div'>>();
    useEffect(() => {
        const el = ref.current;

        if (!el) {
            return;
        }

        const domSelection = window.getSelection();
        const domRange = domSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();

        const top = rect.top + 32;
        const left = command.current.offsetLeft;

        el.style.opacity = '1';
        el.style.top = `${top}px`;
        el.style.left = `${left}px`;
    });

    const filteredElements = filterCommand(elements, text);
    return (
        <Portal>
            <div ref={ref} className={styles.menuContainer} contentEditable={false}>
                { filteredElements.map(element => <Item {...element} /> ) }
            </div>
        </Portal>
    );
}

export default Menu;
