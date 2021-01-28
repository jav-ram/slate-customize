const LanguageDefinition = {
    'variable': {
        pattern: /\\var \w*/,
        alias: 'command',
        lookahead: true,
    },
    'list': {
        pattern: /\\list/,
        alias: 'command',
    },
    'command': {
        pattern: /\\\w+/,
        alias: 'command',
    },

};

export default LanguageDefinition;
