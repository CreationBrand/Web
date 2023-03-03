/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import usePullPosts from 'Hooks/usePullPosts'
import { memo } from 'react'
import { useRecoilValue } from 'recoil'
import { pageFlow } from 'State/Flow'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import DynamicVirtual from 'Stories/Pure/DynamicVirtual/DynamicVirtual'
import ControlBar from '../ControlBar/ControlBar'
import VirtualList from '../VirtualList/VirtualList'

const C = {
    container: css({
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    })
}

const GlobalList = () => {

    const page = useRecoilValue(pageFlow)
    const [error, list] = usePullPosts(page, 'none', 'global')

    if (error) return <ChunkError />

    return (
        <motion.div
            key={page}
            css={C.container}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <VirtualList list={[list]} />
            <ControlBar></ControlBar>
        </motion.div>
    )
}


export default memo(GlobalList)