
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import usePullComments from 'Hooks/usePullComments'
import usePullCommunity from 'Hooks/usePullCommunity'
import usePullPost from 'Hooks/usePullPost'
import usePullPosts from 'Hooks/usePullPosts'
import { memo, useMemo, useState } from 'react'
import { Tree } from 'react-arborist'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { pageFlow } from 'State/Flow'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import FilterPane from 'Stories/Pane/FilterPane'
import DynamicVirtual from 'Stories/Pure/DynamicVirtual/DynamicVirtual'
import PostBar from '../ControlBar/PostBar'
import Comment from 'Stories/Chunk/Comment/Comment'


const C = {
    container: css({
        height: '100%',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    })
}

const PostList = () => {

    const params = useParams()
    const [filter, setFilter] = useState('HOT')
    const [error1, pane] = usePullPost(params.post_id)
    const [error, list]: any = usePullComments(params.post_id, filter, 'post')

    if (error || error1) return <ChunkError />

    return (
        <motion.div
            key={'mount thing'}
            css={C.container}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >

            <DynamicVirtual rows={[pane, ...list]}    />

            <PostBar />
        </motion.div>
    )
}


export default memo(PostList)
