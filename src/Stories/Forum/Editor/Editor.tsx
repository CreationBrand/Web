/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const C = {
    container: css({
        background: '#0e0e10'
    }),
    editor: css({
        color: 'white',
        width: '100%',
        borderRadius: '8px',
        // border: 'none',
        '.ql-toolbar': {
            // background: '#1c1c22',
            // borderRadius: '8px',
            borderTopRightRadius: '8px',
            borderTopLeftRadius: '8px',

            border: 'none'
        },
        '.ql-container': {
            fontFamily: 'Ubuntu !important',
            border: 'none',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px'
            // paddingBottom: '8px',
        },
        '.ql-stroke': {
            stroke: '#bcbdbe'
        },
        '.ql-picker': {
            color: '#bcbdbe'
        },
        '.ql-snow': {
            border: 'none'
        },
        '.ql-editor': {
            // padding: '2px',
            // margin: '0px 12px',
            borderRadius: '8px',
            minHeight: '80px',
            background: '#272732'
        }
    })
}







const Editor = ({ value, onChange, lock }: any) => {




    return (
        <ReactQuill
            preserveWhitespace
            css={[
                C.editor,
                lock && {
                    height: lock,
                    '.ql-container': { overflowY: 'scroll' }
                }
            ]}
            theme="snow"
            placeholder={'Write something...'}
            value={value}
            onChange={onChange}
        />
    )
}

export default Editor
