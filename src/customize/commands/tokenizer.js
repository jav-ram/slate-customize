// @flow

import Prism from 'prismjs';
import LanguageDefinition from './LanguageDefinition';



const Tokenize = (text: string): Object => {
    return Prism.tokenize(text, LanguageDefinition);
};

export default Tokenize;
