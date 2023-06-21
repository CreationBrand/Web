/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo, useRef, useState, } from 'react'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import VirtualList from '../VirtualList/VirtualList'
import { useParams } from 'react-router-dom'
import useCommunityFlow from 'Hooks/useCommunityFlow'
import useCommentSubTree from 'Hooks/Pull/useCommentSubTree'
import usePost from 'Hooks/Pull/usePost'
import useWindow from 'Hooks/useWindow'
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter'
import useSize from 'Hooks/useSize'
import VirtuList from '../VirtualList/VirtuList'

const C = {
    container: css({
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        zIndex: 100,
        background: '#0f0e10',
    })
}

const CommentList = () => {

    const params = useParams()

    const [isLoading, isError, component, data] = usePost(params.post_id)
    const [isLoading2, isError2, components] = useCommentSubTree(params.comment_id)

    const ref: any = useRef()
    const size: any = useSize(ref)
    let width = size?.width

    if (isError || isError2) return <ChunkError refa={ref} variant='error' />
    if (isLoading || isLoading2) return <ChunkError refa={ref} variant='loading' />


    return (
        <motion.div
            ref={ref}
            key={params.person_id}
            css={C.container}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtualList
                    overscan={20}
                    list={[
                        component,
                        ...components
                    ]}
                />
            </div>




            {width > 852 &&
                <div css={{ marginTop: '4px', height: 'min-content' }}>
                    <GlobalFilter />
                </div>}





        </motion.div>
    )
}


export default CommentList