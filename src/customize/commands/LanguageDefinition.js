const LanguageDefinition = {
    'variable': {
        pattern: /\\var/,
        greedy: true,
    },
    'list': {
        pattern: /\\list/,
        greedy: true,
    },
    'command': {
        pattern: /\\\w+/,
    },

};

export default LanguageDefinition;
