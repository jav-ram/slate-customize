//@flow
import React, { useMemo, useState, useCallback } from 'react';

import type { Node } from 'react';
import type { ElementDefinition } from '../elements';

type ToolbarButtonPropsType = {
    editor: any,
    Icon: Node,
    action: Function
}

const ToolbarButton = ({editor, Icon, action}:ToolbarButtonPropsType) => (
    <button onClick={(event) => action(event, editor)}>
        {Icon()}
    </button>
);


type ToolbarPropsType = {
    editor: any,
    options: Array<ElementDefinition>,
}

const Toolbar = ({editor, options}: ToolbarPropsType) => (
    <div>
        {options.map(
            option => <ToolbarButton editor={editor} Icon={option.icon} action={option.action} />
        )}
    </div>
);

export default Toolbar;