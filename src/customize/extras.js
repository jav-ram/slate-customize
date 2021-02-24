// @flow
import { Editor } from 'slate';

type IterateSlateValueType = {
    editor: Object,
    value: Object,
    path?: number[],
}

const isMarkActive = (editor: Object, key: string): boolean => {
    const marks = Editor.marks(editor)
    return marks ? marks[key] === true : false
}

export const toggleMark = (editor: Object, key: string): void => {
    isMarkActive(editor, key) ? Editor.removeMark(editor, key) : Editor.addMark(editor, key);
};

export const iterateValue = (action: (Object, Object, number[]) => void): (IterateSlateValueType => void) => {
    let loop = ({editor, value, path = []}: IterateSlateValueType): void => {
        let children = undefined;
        if (value.children) {
            children = value.children;
        } else if (value.length > 0) {
            children = value
        }
        if (children) {
            for (const [i, node] of Object.entries(children)) {
                loop({
                    editor,
                    value: node,
                    path: [...path, parseInt(i)],
                });
            }   
        }
        action(editor, value, path);
    }
    return loop;
}