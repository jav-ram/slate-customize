// @flow

import Prism from 'prismjs';
import LanguageDefinition from './LanguageDefinition';



const Tokenize = (text: string) => {
    return Prism.tokenize(text, LanguageDefinition);
};

export default Tokenize;
