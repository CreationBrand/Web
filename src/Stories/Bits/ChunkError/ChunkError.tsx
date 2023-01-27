/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'

const C = {
    container: css({
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    message: css({
        color: '#f7f7f8',
        fontFamily: `'Libre Barcode 39 Text'`,
        fontWeight: '400',
        fontSize: '40px',
        textAlign: 'center',
    }),
}

const ChunkError = () => {
    return (
        <div css={C.container}>
            <div css={C.message}>Server ERROR</div>
        </div>
    )
}

export default ChunkError
