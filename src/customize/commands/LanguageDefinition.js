const LanguageDefinition = {
    'variable': {
        pattern: /v<.*>/,
        greedy: true,
    },
    'list': {
        pattern: /l<.*>/,
        greedy: true,
    },
    
};

export default LanguageDefinition;
