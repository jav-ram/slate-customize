import React from 'react';
import { createEditor } from 'slate';
import { withCustomize } from './index';
import { Elements } from './elements';

import { getNode } from './extras';

const roots = [
    [{
        type: 'paragraph',
        children: [
            {
                test: true, text: 'I should take this'
            }
        ],
    }],
    [
        {
            type: 'paragraph',
            children: [
                {
                    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                }
            ],
        },
        {
            type: 'paragraph',
            children: [
                {
                    test: true, text: 'I should take this'
                },
                {
                    test: true, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
                }
            ],
        }
    ],
];

const paths = [
    [0],
    [1, 0]
];

test('getNode', () => {
    // normal input
    for (let i = 1; i < roots.length; i++) {
        let root = roots[i];
        let path = paths[i];
        expect(getNode(root, path)).toEqual({ test: true, text: 'I should take this' });
    }
});
