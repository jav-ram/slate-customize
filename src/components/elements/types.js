//@flow

type ID_TYPE = number | string;

type ELEMENT_TYPE = {
    id: ID_TYPE,
    type: string,
};

type VARIABLE_TYPE = ELEMENT_TYPE & {
    reference: ID_TYPE,
};

type LOOP_TYPE = ELEMENT_TYPE & {
    range: ?number[],
    start: ?number,
    end: ?number,
    iterable: ?any[],
};

type CONDITIONAL_TYPE = ELEMENT_TYPE & {
    condition: Function,
    ifTrue: string,
    ifFalse: ?string,
};
