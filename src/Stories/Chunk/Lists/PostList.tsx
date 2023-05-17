
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

    const [isLoading, isError, component, data] = usePullPost(params.post_id)
    const [isLoading2, isError2, components, data2]: any = usePullComments(params.post_id, filter)


    useEffect(() => {
        setContentState({
            public_id: params.post_id,
            roleSet: null,
            type: 'post',
        })
    }, [])


    if (isError || isError2) return <ChunkError variant='error' />
    if (isLoading || isLoading2) return <ChunkError variant='loading' />

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
                component,
                <div css={{ maxWidth: '800px', margin: 'auto', marginTop: '8px' }}>
                    <FilterPane value={filter} onChange={setFilter} />
                    <AddComment post_id={params.post_id} parent_id={params.post_id} />
                </div>,
                ...components
            ]} />


        </motion.div>
    )
}


export default memo(PostList)
