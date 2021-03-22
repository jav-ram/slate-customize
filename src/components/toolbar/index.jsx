import * as React from 'react';
import { useMemo, useState, useCallback } from 'react';

const ToolbarButton = ({editor, Icon, action}) => (
    <button onClick={(event) => action({ event, editor })}>
        {<Icon />}
    </button>
);

const Toolbar = ({editor, options}) => (
    <div>
        {Object.values(options).map(
            // $FlowIgnore
            (option) => (!option.hideInToolbar ?
                <ToolbarButton key={option.name} editor={editor} Icon={option.icon} action={option.action} /> :
                null
            )
        )}
    </div>
);

export default Toolbar;
