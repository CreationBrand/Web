/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { brand } from 'Stories/Bits/Text/Text'

const C = {
    page: css({
        background: '#0f0e10',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }),
    wrapper: css({
        display: 'flex',
        margin: '0 auto',
    }),
    bar: css({}),
}
const Loading = () => {

    return (
        < div css={C.page} >
            {/* <div css={C.wrapper}>
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, repeatDelay: 3 }} css={[C.bar, brand]}>L</motion.div>
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, repeatDelay: 3, delay: 0.2 }} css={[C.bar, brand]}>o</motion.div>
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, repeatDelay: 3, delay: 0.4 }} css={[C.bar, brand]}>a</motion.div>
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, repeatDelay: 3, delay: 0.6 }} css={[C.bar, brand]}>d</motion.div>
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, repeatDelay: 3, delay: 0.8 }} css={[C.bar, brand]}>i</motion.div>
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, repeatDelay: 3, delay: 1 }} css={[C.bar, brand]}>n</motion.div>
                <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, repeatDelay: 3, delay: 1.2 }} css={[C.bar, brand]}>g</motion.div>
            </div> */}
        </div >
    )
}

export default Loading
