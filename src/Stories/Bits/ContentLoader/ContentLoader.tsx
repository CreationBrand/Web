/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { memo } from 'react'
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css'

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

    console.log(type, content)

    if (type === 'TEXT') return <div css={C.container} className='quill css-mom1az-Editor'>
        {parse(content)}
    </div>



    return <div>
        not done yet
    </div>


}



export default memo(ContentLoader)