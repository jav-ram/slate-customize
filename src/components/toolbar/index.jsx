//@flow
import * as React from 'react';
import { useMemo, useState, useCallback } from 'react';

import type { Node } from 'react';
import type { ElementDefinition } from '../elements';

type ToolbarButtonPropsType = {
    editor: Object,
    Icon: Function,
    action: Function
}

type ToolbarPropsType = {
    editor: Object,
    options: {[string]: ElementDefinition},
}

const ToolbarButton = ({editor, Icon, action}: ToolbarButtonPropsType) => (
    <button onClick={(event) => action({ event, editor })}>
        {<Icon />}
    </button>
);

const Toolbar = ({editor, options}: ToolbarPropsType): React$Element<'div'> => (
    <div>
        {Object.values(options).map(
            // $FlowIgnore
            (option: ElementDefinition) => (!option.hideInToolbar ?
                                                <ToolbarButton key={option.name} editor={editor} Icon={option.icon} action={option.action} /> :
                                                null
                                           )
        )}
    </div>
);

export default Toolbar;
