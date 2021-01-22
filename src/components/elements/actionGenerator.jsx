//@flow
import { useSlate } from 'slate-react';
import { Editor, Transforms, Text } from 'slate';

// FIXME: MOVE IT OR IMPORT inspect
// ----------------------------------
export type PathLocation = {
    offset: number,
    path: Array<number>,
}

export type PathType = {
    anchor: PathLocation,
    focus: PathLocation,
}
// ----------------------------------

export type ActionDefinitionType = {
    before?: ActionFunctionType,
    after?: ActionFunctionType,

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

export type ActionParamsType = {
    event: ?SyntheticEvent<HTMLButtonElement>,
    editor: any,
    at: ?PathType,
};

type ActionFunctionType = (ActionParamsType) => void;

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
}: handlererDefinitionType): ActionFunctionType => {
    let action = ({event, editor, at}: ActionParamsType): void =>  {
        const defaultMatch = generateDefaultMatch(editor, name, 'element');

        preventDefault && event && event.preventDefault();
        actionDef.after && actionDef.after({ event, editor, at });

        const match = actionDef.match ? actionDef.match : defaultMatch;
        const split = actionDef.split ? actionDef.split : true;

        // do stuff here
        if (isNested) {
            const options = { split };
            if (at) options.at = at;
            const list = { type: type, element: name, children: [{ text: '' }] }
            Transforms.wrapNodes(editor, list, options )
        } else {
            if (!match()) {
                const options = { match: n => Text.isText(n) && n.type !== type, split: true };
                if (at) options.at = at;
                console.log(options);
                Transforms.setNodes(
                    editor,
                    { element: name },
                    options,
                );
            } else {
                const options = { match: n => Text.isText(n) && n.type !== type };
                if (at) options.at = at;
                Transforms.unsetNodes(
                    editor,
                    ['element'],
                    options,
                );
            }
        }

        actionDef.before && actionDef.before({ event, editor, at });
    };

    return action;
};

export default ActionGenerator;
