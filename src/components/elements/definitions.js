//@flow

type element = {
    id: number | string,
    type: string,
};

type variable = element & {
    reference: number | string,
};

type loop = element & {
    range: ?number[],
    start: ?number,
    end: ?number,
    iterable: ?any[],
};

type conditional = element & {
    condition: Function,
    ifTrue: string,
    ifFalse: ?string,
};