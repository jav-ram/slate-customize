// @flow
import { Text, Transforms } from 'slate';
import Tokenize from './commands/tokenizer';

import type { PathType } from './commands';
import type { ElementDefinition } from '../components/elements';

const getLength = token => {
      if (typeof token === 'string') {
          return token.length
      } else if (typeof token.content === 'string') {
          return token.content.length
      } else {
          return token.content.reduce((l, t) => l + getLength(t), 0)
      }
}

const decorate = ([node, path]) => {
    const ranges = [];
    if (Text.isText(node)){
        const tokens = Tokenize(node.text);
        let start = 0

        for (const token of tokens) {
            const length = getLength(token);
            const end = start + length;
            if (typeof token !== 'string' && token.type === 'command') {
                ranges.push({
                    element: token.type,
                    anchor: { path, offset: start },
                    focus: { path, offset: end },
                });
            }

            start = end;
        }
    }
    console.log(ranges);
    return ranges;
}

export default decorate;
