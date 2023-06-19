/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo, } from 'react'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import VirtualList from '../VirtualList/VirtualList'
import {  useParams } from 'react-router-dom'
import useCommunityFlow from 'Hooks/useCommunityFlow'
import useCommentSubTree from 'Hooks/Pull/useCommentSubTree'
import usePost from 'Hooks/Pull/usePost'

const C = {
    container: css({
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 100,
        background: '#0f0e10',
    })
}

const CommentList = () => {

    const params = useParams()

    const [isLoading, isError, component, data] = usePost(params.post_id)
    const [isLoading2, isError2, components] = useCommentSubTree(params.comment_id)

    useCommunityFlow(params.community_id)
    useCommunityFlow(null)


    if (isError || isError2) return <ChunkError variant='error' />
    if (isLoading || isLoading2) return <ChunkError variant='loading' />

    return (
        <motion.div
            key={params.person_id}
            css={C.container}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <VirtualList
                list={[
                    component,
                    ...components
                ]}
            />
        </motion.div>
    )
}


export default memo(CommentList)