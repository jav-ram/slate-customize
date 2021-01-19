//@flow
import { useSlate } from 'slate-react';
import { Editor, Transforms, Text } from 'slate';

export type ActionDefinitionType = {
    before?: (SyntheticEvent<HTMLButtonElement>, any) => void,
    after?: (SyntheticEvent<HTMLButtonElement>, any) => void,

    split?: boolean,
    match?: (any) => boolean,
}

export type handlererDefinitionType = {
    name: string,
    type: 'block' | 'inline',
    isNested?: boolean,
    preventDefault?: boolean,
    actionDef?: ActionDefinitionType
}

const generateDefaultMatch = (
    editor,
    value: any,
    key: (string | number)
): Function => {
    return () => {
        const [match] = Editor.nodes(editor, {
            match: n => n[key] === value,
        });
        return match;
    }
}

const ActionGenerator = ({
    name,
    type,
    isNested=false,
    preventDefault=true,
    actionDef={},
}: handlererDefinitionType): ((SyntheticEvent<HTMLButtonElement>, any) => void) => {
    let action = (event, editor) =>  {
        const defaultMatch = generateDefaultMatch(editor, name, 'element');

        preventDefault && event.preventDefault();
        actionDef.after && actionDef.after(event, editor);

        const match = actionDef.match ? actionDef.match : defaultMatch;
        const split = actionDef.split ? actionDef.split : true;

        // do stuff here
        if (isNested) {
            const list = { type: type, element: name, children: [{ text: '' }] }
            Transforms.wrapNodes(editor, list, { split })
        } else {
            if (!match()) {
                Transforms.setNodes(
                    editor,
                    { element: name },
                    { match: n => Text.isText(n) && n.type !== type, split: true }
                );
            } else {
                Transforms.unsetNodes(
                    editor,
                    ['element'],
                    { match: n => Text.isText(n) && n.type !== type}
                );
            }
        }

        actionDef.before && actionDef.before(event, editor);
    };

    return action;
};

export default ActionGenerator;
