/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

const C = {
    container: css({
        width: '100%',
        height: '50px',
        maxHeight: '50px',
        minHeight: '50px',
        position: 'relative',
    }),

}





const PostBar = () => {


    const navigate = useNavigate()

    return (

        <div css={C.container}>
            asdf
        </div >

    )
}

export default PostBar
