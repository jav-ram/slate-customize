// @flow
import { Text } from 'slate';
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

const decorator = ([node: any, path: Array<PathType>]) => {
    const ranges = []

    if (!Text.isText(node)) {
      return ranges;
    }

    const tokens = Tokenize(node.text);
    let start = 0;

    for (let token of tokens) {
        const length = getLength(token)
        const end = start + length

        if (typeof token !== 'string') {
            ranges.push({
                element: token.type,
                anchor: { path, offset: start },
                focus: { path, offset: end },
            });
        }

        start = end
    }

    console.log(ranges);

    return ranges;
};

export default decorator;
