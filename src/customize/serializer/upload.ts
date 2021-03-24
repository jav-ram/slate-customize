import mammoth from 'mammoth';
import { Editor } from 'slate';

import { CleanHistory } from '../extras';
import { deserializeHTML } from './index';

export const OnChangeUpload = (editor: Editor, event: Event, setValue: Function) => {
    const input = event.target as HTMLInputElement;
    const f = input.files[0];
    const reader = new FileReader();
    
    const ext = f.name.split('.').slice(-1)[0];

    reader.onload = (function(theFile) {
        return (e) => {
            // $FlowIgnore
            const rawText = e.target.result;

            if (ext === "docx") {
                mammoth.convertToHtml({ arrayBuffer: rawText })
                    .then(result => {
                        const txtHTML = result.value;
                        const document = new DOMParser().parseFromString(txtHTML, "text/html");
                        setValue(deserializeHTML(document.body));
                        editor = CleanHistory(editor);
                    })
                    .catch( e => console.log(e) )
                    .done();
            } else if (ext === "html") {
                const document = new DOMParser().parseFromString(rawText, "text/html");
                setValue(deserializeHTML(document.body));
                editor = CleanHistory(editor);
            }

            
        };
    })(f);

    if (ext === "docx") {
        reader.readAsArrayBuffer(f)
    } else if (ext === "html") {
        reader.readAsText(f);
    }
}