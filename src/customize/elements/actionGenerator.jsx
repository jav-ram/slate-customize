import { useSlate } from 'slate-react';
import { Editor, Transforms, Text } from 'slate';

const generateDefaultMatch = (
    editor,
    value,
    key
) => {
    return () => {
        const [match] = Editor.nodes(editor, {
            match: n => n[key] === value,
        });
        return match;
    }
}

export const SetGenerator = ({
    name,
    type,
    isNested=false,
    preventDefault=false,
    actionDef={}
}) => {
    let set = ({ event, editor, at, meta }) => {
        const defaultMatch = generateDefaultMatch(editor, name, 'element');

        preventDefault && event && event.preventDefault();
        actionDef.after && actionDef.after({ event, editor, at });

        const match = actionDef.match ? actionDef.match : defaultMatch;
        const split = actionDef.split ? actionDef.split : true;

        if (isNested) {
            const options = { split };
            if (at) options.at = at;
            const list = { type: type, element: name, children: [{ text: '' }] }
            Transforms.wrapNodes(editor, list, options )
        } else {
            const options = { match: n => Text.isText(n) && n.type !== type, split: true };
            if (at) options.at = at;
            Transforms.setNodes(
                editor,
                { element: name },
                options,
            );
        }
    }

    return set;
}

export const UnsetGenerator = ({
    name,
    type,
    isNested=false,
    preventDefault=false,
    actionDef={}
}) => {
    let unset = ({ event, editor, at, meta }) => {
        const defaultMatch = generateDefaultMatch(editor, name, 'element');

        preventDefault && event && event.preventDefault();
        actionDef.after && actionDef.after({ event, editor, at });

        const match = actionDef.match ? actionDef.match : defaultMatch;
        const split = actionDef.split ? actionDef.split : true;

        const options = { match: n => Text.isText(n) && n.type !== type };
        if (at) options.at = at;
        Transforms.unsetNodes(
            editor,
            ['element'],
            options,
        );
    }

    return unset;
}

export const InsertGenerator = ({
    name,
    type,
    isNested=false,
    preventDefault=false,
    actionDef={}
}) => {
    let insert = ({ event, editor, at, meta={} }) => {
        let metaOptions = {};
        const node = { element: name }
        if (meta && meta.options) metaOptions = meta.options;
        preventDefault && event && event.preventDefault();

        const options = { split: true, ...metaOptions };
        if (at) options.at = at;

        Transforms.insertNodes(
            editor,
            { ...node, ...meta.element },
            options,
        );
    }
    return insert;
}
