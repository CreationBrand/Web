/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { memo } from 'react'
import parse from 'html-react-parser';

const C = {
    container: css({
        width: '100%',
        borderRadius: '8px',
        // padding: '8px',
        display: 'flex',
    }),
}

const ContentLoader = ({ type, content }: any) => {



    if (type === 'TEXT') return <div css={C.container} className='ql-editor'>
        {parse(content)}
    </div>



    return <div>
        not done yet
    </div>


}



export default memo(ContentLoader)