// @flow
import { Text, Transforms, Element } from 'slate';
import Tokenize from './commands/tokenizer';

import type { PathType } from './commands';
import type { ElementDefinition } from '../components/elements';

export type normalizerParamsType = {
    editor: any,
    node: any,
    path: PathType,
    elements: Array<ElementDefinition>,
    father: any,
    fatherPath: PathType,
};

const getLength = token => {
      if (typeof token === 'string') {
          return token.length
      } else if (typeof token.content === 'string') {
          return token.content.length
      } else {
          return token.content.reduce((l, t) => l + getLength(t), 0)
      }
}

const defaultNormalizer = entry => {
    const [node, path] = entry;
    // If the element is a paragraph, ensure its children are valid.
    if (Element.isElement(node) && node.type === 'paragraph') {
        for (const [child, childPath] of Node.children(editor, path)) {
            if (Element.isElement(child) && !editor.isInline(child)) {
                Transforms.unwrapNodes(editor, { at: childPath })
                return;
            }
        }
    }
}

const normalizeCommand = ({
    editor,
    node,
    path,
    elements,
    father,
    fatherPath,
}: normalizerParamsType): void => {
    if (Text.isText(node)) {
        // check for invalid commands
        if (node.element && node.element === 'command') {
            console.log('revisando ', node)
            if (node.text[0] !== '\\') {
                const element = elements['command'];
                console.log({
                    anchor: { offset: 0, path },
                    focus: { offset: 0, path }
                });
                element.unset({
                    editor
                });
                return;
            }
        }
        // check if is command
        const tokens = Tokenize(node.text);

        let start = 0;
        for (const token of tokens) {
            const length = getLength(token);
            const end = start + length;
            if (typeof token !== 'string') {
                if (token.alias === "command" && node.element === 'command') {
                    return;
                }

                const element = elements[token.alias];
                const len = end - start;
                const cursor = end - len;

                element.action({
                    editor,
                    at: {
                        anchor: { offset: start, path },
                        focus: { offset: end, path }
                    }
                });
                return;
            }

            start = end;
        }

    }
    return;
}

export const normalizeCommands = (params: normalizerParamsType): void => {
    normalizeCommand(params);
    return;

};
