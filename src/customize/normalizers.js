// @flow
import { Text, Transforms } from 'slate';
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

const hasChildren = (node) => {
    if (node.children) return true;
    return false;
}

const normalizeTextCommands = ({
    editor,
    node,
    path,
    elements,
    father,
    fatherPath,
}: normalizerParamsType): void => {
    if (Text.isText(node)) {
        const tokens = Tokenize(node.text);
        let start = 0;

        for (let token of tokens) {
            const length = getLength(token);
            const end = start + length;

            if (typeof token !== 'string') {
                // if command
                if (token.type === 'command') {
                    const range = editor.selection;
                    const element = elements[token.type];
                    console.log(start, range.anchor.offset, end);
                    if (range.anchor.offset > start && range.anchor.offset <= end+1) {
                        element.action({ editor,  at: {
                            anchor: { path, offset: start },
                            focus: { path, offset: end },
                        }});
                        return
                    } else {
                        console.log('por alguna razon estoy aqui')
                        element.unset({ editor,  at: {
                            anchor: { path, offset: start },
                            focus: { path, offset: end },
                        }})
                        return;
                    }
                } else {
                    const element = elements[token.type];
                    element.action({ editor,  at: {
                        anchor: { path, offset: start },
                        focus: { path, offset: end },
                    }});
                }

            }

            start = end;
        }
    }
    return;
}

export const normalizeCommands = (params: normalizerParamsType): void => {
    //normalizeTextCommands(params);
    return;

};
