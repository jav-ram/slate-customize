import React from 'react';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { subObjectMatcher } from '../../../customize/typeahead';
import type { ElementDefinitionType } from '../../../customize/elements';

import styles from './menu.module.css';

type MenuPropsType = {
    command?: React.MutableRefObject<HTMLSpanElement>,
    elements: {[key: string]: ElementDefinitionType},
    text: string
}

type filterCommandParamsType = (elements: {[key: string]: ElementDefinitionType}, text: string) => Array<ElementDefinitionType>;
type PortalPropsType = { children: JSX.Element, ref?: HTMLSpanElement };
export const Portal = ({ children, ref }: PortalPropsType) => ReactDOM.createPortal(children, ref || document.body);

const Item = (element: ElementDefinitionType) => {
    const Icon = element.icon;
    return (
        <div className={styles.itemContainer} key={element.name}>
            <div className={styles.itemLeftContainer}>
                
                {Icon ? <Icon /> : null}
                <span className={styles.itemName}> { element.name } </span>
            </div>
            <code className={styles.itemCommand}> { element.command } </code>
        </div>
    );
}

const filterCommand: filterCommandParamsType = (elements, text) => {
    const command = text.replace('/', '').replace(' ', '');

    const byName = Object.values(elements).filter((element: ElementDefinitionType) => element.name.includes(command));
    const byCommand = Object.values(elements).filter((element: ElementDefinitionType) => element.command.includes(command));

    return _.union(byName, byCommand);
}

const Menu = ({ elements, command, text }: MenuPropsType) => {
    const ref = useRef<HTMLDivElement>();
    const CommandEngine = subObjectMatcher<ElementDefinitionType>({ options: elements, includes: ['name', 'command'] });
    useEffect(() => {
        const el = ref.current;

        if (!el) {
            return;
        }

        const domSelection = window.getSelection();
        const domRange = domSelection.getRangeAt(0);
        const rect = domRange.getBoundingClientRect();

        const top = rect.top + 32;
        // @ts-ignore
        const left = command.current.offsetLeft;
        // @ts-ignore
        el.style.opacity = '1';
        // @ts-ignore
        el.style.top = `${top}px`;
        // @ts-ignore
        el.style.left = `${left}px`;
    });

    const filteredElements = filterCommand(elements, text);
    CommandEngine(text);
    return (
        <Portal>
            <div ref={ref} className={styles.menuContainer} contentEditable={false}>
                { filteredElements.map(element => <Item {...element} /> ) }
            </div>
        </Portal>
    );
}

export default Menu;
