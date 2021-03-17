// @flow
import { Editor } from 'slate';

type IterateSlateValueType = {
    editor: Object,
    value: Object,
    path?: number[],
}

export type PathLocation = {
    offset: number,
    path: Array<number>,
}

export type PathType = {
    anchor: PathLocation,
    focus: PathLocation,
}

const isMarkActive = (editor: Object, key: string): boolean => {
    const marks = Editor.marks(editor)
    return marks ? marks[key] === true : false
}

export const CleanHistory = (HistoryEditor: Object): Object => {
    const newEditor = HistoryEditor;
    newEditor.history = { undos: [], redos: [] };
    return newEditor;
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

export const getNode = (root: Object, path: [number]): Object => {
  const pos = path;
  let current = root;
    for (let i of pos) {
        let nCurrent = current.children ? current.children[i] : current[i];
        if (!nCurrent || (!nCurrent.element && nCurrent.text)) {
            return current;
        }
        current = nCurrent;
    }
    return current;
}