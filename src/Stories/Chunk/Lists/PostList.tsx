
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import usePullComments from 'Hooks/usePullComments'
import usePullPost from 'Hooks/usePullPost'
import { memo, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import FilterPane from 'Stories/Pane/FilterPane'

import AddComment from '../AddComment/AddComment'
import VirtualList from '../VirtualList/VirtualList'
import { contentFlow } from 'State/Flow'

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

const PostList = () => {

    const params = useParams()
    const [contentState, setContentState] = useRecoilState(contentFlow)
    const [filter, setFilter] = useState('HOT')

    const [error1, pane] = usePullPost(params.post_id)
    const [error, list]: any = usePullComments(params.post_id, filter)


    useEffect(() => {
        setContentState({
            public_id: params.post_id,
            roleSet: null,
            type: 'post',
        })
    }, [])



    if (!list || !pane) return <ChunkError variant={'loading'} />
    if (error || error1) return <ChunkError variant={'error'} />


    return (
        <motion.div
            key={`Post:${params.post_id}`}
            css={C.container}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <VirtualList list={[
                pane,
                <div css={{ maxWidth: '800px', margin: 'auto', marginTop: '8px' }}>
                    <FilterPane value={filter} onChange={setFilter} />
                    <AddComment post_id={params.post_id} parent_id={params.post_id} />
                </div>,
                ...list
            ]} />


        </motion.div>
    )
}


export default memo(PostList)
