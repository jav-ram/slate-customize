import React from 'react';
import { createEditor } from 'slate';

import { MakeElementRenderer, MakeLeafRenderer, DefaultElement } from './render';
import { Elements } from './elements';

const ElementRender = MakeElementRenderer(Elements);
const LeafRenderer = MakeLeafRenderer(Elements);



test('Element Render', () => {
    const editor = createEditor();
    let name = "";
    let Component: JSX.Element = <div></div>;
    // Good
    name = "command";
    Component = Elements[name].component;
    expect(ElementRender({ element: { element: name } }, editor)).toMatchObject(<Component editor={editor} element={{element: name}} />);
    name = "title";
    Component = Elements[name].component;
    expect(ElementRender({ element: { element: name } }, editor)).toMatchObject(<Component editor={editor} element={{element: name}} />);
    name = "bold";
    Component = Elements[name].component;
    expect(ElementRender({ element: { element: name } }, editor)).toMatchObject(<Component editor={editor} element={{element: name}} />);
    name = "italic";
    Component = Elements[name].component;
    expect(ElementRender({ element: { element: name } }, editor)).toMatchObject(<Component editor={editor} element={{element: name}} />);
    name = "underline";
    Component = Elements[name].component;
    expect(ElementRender({ element: { element: name } }, editor)).toMatchObject(<Component editor={editor} element={{element: name}} />);

    // bad
    name = "var";
    expect(ElementRender({ element: { element: name } }, editor)).toMatchObject(<DefaultElement element={{element: name}} />);
});

