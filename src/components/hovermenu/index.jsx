// @flow
import * as React from 'react';
import { useRef, useEffect } from 'react';
import { Editor, Range, Node } from 'slate';
import { useSlate, ReactEditor } from 'slate-react';
import { css } from '@emotion/css';
import { Portal, Menu } from './extras.jsx';

const HoveringToolbar = ({ value }) => {
    const ref = useRef<HTMLDivElement | void>();
    const editor = useSlate();

    useEffect(() => {
        const el = ref.current;
        const { selection } = editor;

        if (!el) {
            return;
        }

        // get selection
        let selected;
        if (selection) {
            selected = getNode(value, selection.anchor.path);
        }

        if (
            !selection
            || !ReactEditor.isFocused(editor)
            || !selected.element
        ) {

            el.removeAttribute('style');
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
          <Menu
              ref={ref}
              className={css`
                padding: 8px 7px 6px;
                position: absolute;
                z-index: 1;
                top: -10000px;
                left: -10000px;
                margin-top: -6px;
                opacity: 0;
                background-color: yellow;
                border-radius: 4px;
                transition: opacity 0.75s;
                display: flex;
              `}
          >
              <h1> hello </h1>
        </Menu>
        </Portal>
  );
};

// FIXME: arreglar esta funcion y moverla a otro lado
const getNode = (root, path): any => {
  const pos = path;
  console.log(path, pos);
  let current = root;
    for (let i of pos) {
        console.log(i);
        let nCurrent = current.children ? current.children[i] : current[i];
        if (!nCurrent || (!nCurrent.element && nCurrent.text)) {
            return current;
        }
        current = nCurrent;
    }
    return current;
}


export default HoveringToolbar;
