// @flow
import { Text, Transforms } from 'slate';
import Tokenize from './commands/tokenizer';

import type { PathType } from './commands';


const getLength = token => {
      if (typeof token === 'string') {
          return token.length
      } else if (typeof token.content === 'string') {
          return token.content.length
      } else {
          return token.content.reduce((l, t) => l + getLength(t), 0)
      }
}


export const normalizeCommands = ({ editor, node, path, elements, father }) => {
    console.log(node);
    if (Text.isText(node)) {
        if (father.element) {
            const tokens = Tokenize(node.text);
            let text = node.text.substring(2, node.text.length-1);
            console.log(text);
            console.log(tokens.length > 1 && tokens[0].type);
            if (tokens.length > 0 && tokens[0].type) {
                let text = node.text.substring(2, node.text.length-1);
                console.log(text, path);
                Transforms.insertText(editor, text, { at: path });
            }
            return;
        }

        if (!node.element) {
            const tokens = Tokenize(node.text);
            let start = 0;

            for (let token of tokens) {
                const length = getLength(token);
                const end = start + length;

                if (typeof token !== 'string') {
                    const element = elements[token.type];
                    element.action({ editor,  at: {
                        anchor: { path, offset: start },
                        focus: { path, offset: end },
                    }});
                    return;
                }

                start = end;
            }
        }
    }
    return;

};
