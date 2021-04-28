import { subObjectMatcher } from './';


let stringOptions = [
    'hello',
    'banana',
    'music',
    'perro',
    'melon',
    'musk'
];

test('Type Ahead list of strings', () => {
    const stringTypeAhead = subObjectMatcher<string>({ options: stringOptions });
    expect(['hello'].sort()).toEqual(stringTypeAhead('h').sort());
    expect(['hello'].sort()).toEqual(stringTypeAhead('he').sort());
    expect(['hello'].sort()).toEqual(stringTypeAhead('hel').sort());
    expect(['hello'].sort()).toEqual(stringTypeAhead('hell').sort());
    expect(['hello'].sort()).toEqual(stringTypeAhead('hello').sort());

    expect(['banana'].sort()).toEqual(stringTypeAhead('ana').sort());
    expect(['banana', 'melon'].sort()).toEqual(stringTypeAhead('n').sort());

    expect(['melon', 'musk', 'music'].sort()).toEqual(stringTypeAhead('m').sort());
});