import { Editor } from 'slate';

const isMarkActive = (editor, key) => {
    const marks = Editor.marks(editor)
    return marks ? marks[key] === true : false
}

export const CleanHistory = (HistoryEditor) => {
    const newEditor = HistoryEditor;
    newEditor.history = { undos: [], redos: [] };
    return newEditor;
}

export const toggleMark = (editor, key) => {
    isMarkActive(editor, key) ? Editor.removeMark(editor, key) : Editor.addMark(editor, key);
};

export const iterateValue = (action) => {
    let loop = ({editor, value, path = []}) => {
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