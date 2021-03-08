// @flow
import mammoth from 'mammoth';

import { deserializeHTML } from './index';

export const OnChangeUpload = (event: SyntheticInputEvent<HTMLInputElement>, setValue: Function) => {
    const f = event.target.files[0];
    const reader = new FileReader();
    
    const ext = f.name.split('.').slice(-1)[0];

    reader.onload = (function(theFile) {
        return (e: ProgressEvent) => {
            // $FlowIgnore
            const rawText = e.target.result;

            if (ext === "docx") {
                console.log(rawText)
                mammoth.convertToHtml({ arrayBuffer: rawText })
                    .then(result => {
                        const txtHTML = result.value;
                        const document = new DOMParser().parseFromString(txtHTML, "text/html");
                        setValue(deserializeHTML(document.body));
                    })
                    .catch( e => console.log(e) )
                    .done();
            } else if (ext === "html") {
                const document = new DOMParser().parseFromString(rawText, "text/html");
                setValue(deserializeHTML(document.body));
            }

            
        };
    })(f);

    if (ext === "docx") {
        reader.readAsArrayBuffer(f)
    } else if (ext === "html") {
        reader.readAsText(f);
    }
}