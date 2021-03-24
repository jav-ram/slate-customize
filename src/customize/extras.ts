import { Editor, Node, Path } from 'slate';

type IterateSlateValueType = {
    editor: Editor,
    value: any,
    path?: Path,
}

const isMarkActive = (editor: any, key: string): boolean => {
    const marks = Editor.marks(editor)
    return marks ? marks[key] === true : false
}

export const CleanHistory = (HistoryEditor: any): any => {
    const newEditor = HistoryEditor;
    newEditor.history = { undos: [], redos: [] };
    return newEditor;
}

export const toggleMark = (editor: any, key: string): void => {
    isMarkActive(editor, key) ? Editor.removeMark(editor, key) : Editor.addMark(editor, key, true);
};

export const iterateValue = (action: (editor: Editor, value: any, path: Path) => void): (arg0: IterateSlateValueType) => void => {
    let loop = ({editor, value, path = []}: IterateSlateValueType): void => {
        let children = undefined;
        if (value.children) {
            children = value.children;
        } else if (value.length > 0) {
            children = [value];
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

export const getNode = (root, path) => {
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