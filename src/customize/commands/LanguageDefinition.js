const LanguageDefinition = {
    'variable': {
        pattern: /v<.*>/,
        greedy: true,
    },
    'error': /\w<([^(>|\S)]*)(\S+)/,
};

export default LanguageDefinition;
