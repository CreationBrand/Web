/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import { useRef, useState } from "react"

//@ts-ignore
import { CKEditor } from '@ckeditor/ckeditor5-react';
//@ts-ignore
import build from 'ckeditor5-custom-build/build/ckeditor';


const C = {
    container: css({
        background: '#0e0e10',
    }),
}

const Editor = () => {

    const [model, setModel] = useState('')

    const handleModelChange = (model: any) => setModel(model)


    const log = () => {

    };

    return (<div>

        <CKEditor
            
            css={C.container}
            editor={build}
            data="<p>Hello from CKEditor 5!</p>"
            onReady={(editor: any) => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
            }}
            onChange={(event: any, editor: { getData: () => any; }) => {
                const data = editor.getData();
                console.log({ event, editor, data });
            }}
            onBlur={(event: any, editor: any) => {
                console.log('Blur.', editor);
            }}
            onFocus={(event: any, editor: any) => {
                console.log('Focus.', editor);
            }}
        />

        <button onClick={log}>Log editor content</button>
    </div>)

}


export default Editor