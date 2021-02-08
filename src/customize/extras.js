// @flow

type IterateSlateValueType = {
    editor: any,
    value: any,
    path?: [number],
}

export const iterateValue = (action: (any, any, [number]) => null): (IterateSlateValueType => null) => {
    let loop = ({editor, value, path = []}: IterateSlateValueType) => {
        let children = undefined;
        if (value.children) {
            children = value.children;
        } else if (value.length > 0) {
            children = value
        }
        if (children) {
            for (const [i, node] of children.entries()) {
                loop({
                    editor,
                    value: node,
                    path: [...path, i],
                });
            }   
        }
        action(editor, value, path);
    }
    return loop;
}