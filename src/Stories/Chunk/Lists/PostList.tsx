
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
import { postListData } from 'State/Data'


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

    const [PostListD, setPostListD]: any = useRecoilState(postListData)
    const params = useParams()
    const [filter, setFilter] = useState('HOT')
    const [error1, pane] = usePullPost(params.post_id)
    const [error, list]: any = usePullComments(params.post_id, filter, 'post')

    if (error || error1) return <ChunkError />


    // useEffect(() => {

    //     setPostListD([pane,
    //         <AddComment
    //             post_id={params.post_id}
    //             parent_id={params.post_id} />,
    //         <FilterPane value={filter} onChange={setFilter} />,
    //         ...list])

    // }, [pane, list])


    return (
        <motion.div
            key={'mount thing'}
            css={C.container}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <VirtualList list={[pane,
                <AddComment
                    post_id={params.post_id}
                    parent_id={params.post_id} />,
                <FilterPane value={filter} onChange={setFilter} />,
                ...list]} />


        </motion.div>
    )
}


export default memo(PostList)
