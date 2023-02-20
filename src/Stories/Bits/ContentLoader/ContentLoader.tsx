/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { memo } from 'react'

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import 'react-quill/dist/quill.snow.css'; // ES6
import ReactQuill from 'react-quill'

const C = {
    container: css({
        width: '100%',
        borderRadius: '8px',
        // padding: '8px',
        display: 'flex',
        'white-space': 'normal !important',
    }),
}



const ContentLoader = ({ type, content }: any) => {

    if (type === 'text') return <div css={C.container} className='quill css-mom1az-Editor'>
        <div className='ql-container ql-snow'>
            <ReactMarkdown children={content} rehypePlugins={[rehypeRaw]}></ReactMarkdown>
        </div>
    </div>



    return <div>
        not done yet
    </div>


}



export default memo(ContentLoader)