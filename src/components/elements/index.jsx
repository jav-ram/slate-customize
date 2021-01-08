//@flow
import type { Node } from 'react';

export type ElementDefinition = {
    name: string,
    action: Function,
    hotkey?: string,
    icon: Function,
    component: Node,
};


export type ActionDefinitionType = {
    before: ?(SyntheticEvent<HTMLButtonElement>, any) => void,
    after: ?(SyntheticEvent<HTMLButtonElement>, any) => void,

    split: ?boolean,
    match: ?(any) => boolean,
}

type handlererDefinitionType = {
    name: string,
    type: 'block' | 'inline',
    isNested: ?boolean,
    preventDefault: ?boolean,
    actionDef?: ActionDefinitionType
}

export const handlerMaker = ({
    name,
    type,
    isNested=false,
    preventDefault=true,
    actionDef={},
}: handlererDefinitionType): ((SyntheticEvent<HTMLButtonElement>, any) => void) => {

    let action = (event, editor) =>  {
        preventDefault && event.preventDefault();
        actionDef.after && actionDef.after(event, editor);

        const match = actionDef.match ? actionDef.match : defaultMatch;
        const split = actionDef.split ? actionDef.split : false; 

        // do stuff here
        if (isNested) {

        } else {
            
        }

        actionDef.before && actionDef.before(event, editor);
    };

    return action;
};

const ActionGenerator = ({}: ActionDefinitionType): Function => {

} 
