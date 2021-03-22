import * as React from 'react';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { subObjectMatcher } from '../../../customize/typeahead';

import styles from './menu.module.css';

export const Portal = ({ children, ref }) => ReactDOM.createPortal(children, ref || document.body);

const Item = (element) => {
    return (
        <div className={styles.itemContainer} key={element.name}>
            <div className={styles.itemLeftContainer}>
                {element.icon ? <element.icon /> : null}
                <span className={styles.itemName}> { element.name } </span>
            </div>
            <code className={styles.itemCommand}> { element.command } </code>
        </div>
    );
}

const filterCommand = (elements, text) => {
    const command = text.replace('/', '').replace(' ', '');
    // $FlowIgnore
    const byName = Object.values(elements).filter((element) => element.name.includes(command));
    // $FlowIgnore
    const byCommand = Object.values(elements).filter((element) => element.command.includes(command));

    return _.union(byName, byCommand);
}



const Menu = ({ elements, command, text }) => {
    const ref = useRef();
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
        // $FlowFixMe
        const left = command.current.offsetLeft;

        el.style.opacity = '1';
        el.style.top = `${top}px`;
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
