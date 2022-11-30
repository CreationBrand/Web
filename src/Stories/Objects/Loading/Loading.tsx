/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CircularProgress } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'

const C = {
    container: css({
        height:'100%',
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    }),

}

const Loading = () => {
    return (
        <div css={C.container}>
            <CircularProgress color="primary" size={60} />
        </div>
    )
}

export default Loading
