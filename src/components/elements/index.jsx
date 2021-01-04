//@flow
import type { Node } from 'react';

export type ElementDefinition = {
    name: string,
    action: Function,
    hotkey: string,
    icon: Function,
    component: Node,
};