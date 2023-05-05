/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import usePullPosts from 'Hooks/usePullPosts'
import { memo } from 'react'
import { useRecoilValue } from 'recoil'
import { pageFlow } from 'State/Flow'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import VirtualList from '../VirtualList/VirtualList'
import { useParams } from 'react-router-dom'
import usePullGroups from 'Hooks/usePullGroups'

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

const GroupList = () => {

    const params = useParams()

    const page = useRecoilValue(pageFlow)

    const [error, list] = usePullGroups(params.group_id, 'none', 'global')
    if (error) return <ChunkError />

    return (
        <motion.div
            key={params.group_id}
            css={C.container}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <VirtualList list={[list]} />
        </motion.div>
    )
}


export default memo(GroupList)