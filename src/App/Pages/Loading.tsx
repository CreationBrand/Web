/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import useWindow from 'Hooks/useWindow'
import { useEffect, memo } from 'react'
import { useRecoilState } from 'recoil'
import { layoutSizeData } from 'State/Data'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'

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
const Loading = ({ variant }: any) => {

    const [layoutSize, setLayoutSize] = useRecoilState(layoutSizeData)
    const { width } = useWindow()

    //runs on every size change (very inefficient)
    useEffect(() => {
        if (width < 800 && layoutSize === 'desktop') setLayoutSize('mobile')
        if (width >= 800 && layoutSize === 'mobile') setLayoutSize('desktop')
    }, [width])


    return (
        < div css={C.page} >

            <ChunkError variant={variant}></ChunkError>
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

export default memo(Loading)


