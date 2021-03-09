// @flow
import * as React from 'react';
import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { subObjectMatcher } from '../../../customize/typeahead';
import { Elements } from '../index';

import type { ElementDefinitionType } from '../../../customize/elements';

import styles from './menu.module.css';

type MenuPropsType = {
    command: ?React.ElementRef<'span'>,
    elements: {[string]: ElementDefinitionType},
    text: string
}

type filterCommandParamsType = ({[string]: ElementDefinitionType}, string) => Array<ElementDefinitionType>;
type PortalPropsType = { children: React.Node, ref?: React.ElementRef<'span'> };
export const Portal = ({ children, ref }: PortalPropsType): React.Node => ReactDOM.createPortal(children, ref || document.body);

const Item = (element: ElementDefinitionType) => {
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

const filterCommand = (elements, text): [ElementDefinitionType] => {
    const command = text.replace('/', '').replace(' ', '');
    // $FlowIgnore
    const byName = Object.values(elements).filter((element: ElementDefinitionType) => element.name.includes(command));
    // $FlowIgnore
    const byCommand = Object.values(elements).filter((element: ElementDefinitionType) => element.command.includes(command));

    return _.union(byName, byCommand);
}



const Menu = ({ elements, command, text }: MenuPropsType): React.Node => {
    const ref = useRef<?React.ElementRef<'div'>>();
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
    console.log(CommandEngine(text));
    return (
        <Portal>
            <div ref={ref} className={styles.menuContainer} contentEditable={false}>
                { filteredElements.map(element => <Item {...element} /> ) }
            </div>
        </Portal>
    );
}

export default Menu;
