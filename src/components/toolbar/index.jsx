//@flow
import * as React from 'react';
import { useMemo, useState, useCallback } from 'react';

import type { Node } from 'react';
import type { ElementDefinition } from '../elements';

type ToolbarButtonPropsType = {
    editor: any,
    Icon: Function,
    action: Function
}

const ToolbarButton = ({editor, Icon, action}: ToolbarButtonPropsType) => (
    <button onClick={(event) => action({ event, editor })}>
        {Icon()}
    </button>
);


type ToolbarPropsType = {
    editor: any,
    options: {[string]: ElementDefinition},
}

const Toolbar = ({editor, options}: ToolbarPropsType) => (
    <div>
        {Object.entries(options).map(
            ([_, option: ElementDefinition]) => (!option.hide ?
                                                    <ToolbarButton key={option.name} editor={editor} Icon={option.icon} action={option.action} /> :
                                                    null
                                                )
        )}
    </div>
);

export default Toolbar;
