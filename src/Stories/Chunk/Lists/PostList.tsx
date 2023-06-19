
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import usePullComments from 'Hooks/usePullComments'
import usePullPost from 'Hooks/usePullPost'
import { memo, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import FilterPane from 'Stories/Bits/Filter/CommunityFilter'

import AddComment from '../Comment/AddComment'
import VirtualList from '../VirtualList/VirtualList'
import { contentFlow, postFilterFlow } from 'State/Flow'
import useCommunityFlow from 'Hooks/useCommunityFlow'
import useComments from 'Hooks/Pull/useComments'
import { seenAtom } from 'State/seenAtom'
import usePostList from 'Hooks/Pull/usePostList'
import { postFilter } from 'State/filterAtoms'
import CommunityFilter from 'Stories/Bits/Filter/CommunityFilter'
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

const PostList = () => {

    const params = useParams()
    const [filter, setFilter] = useRecoilState(postFilter)

    const [isLoading, isError, component] = usePost(params.post_id)
    const [isLoading2, isError2, components]: any = useComments(params.post_id)
    const see = useSetRecoilState(seenAtom)

    useCommunityFlow(params.community_id)

    useEffect(() => {
        see((o: any) => [...o, params.post_id])
    }, [params.post_id])

    if (isError || isError2) return <ChunkError variant='error' />
    if (isLoading || isLoading2) return <ChunkError variant='loading' />

    return (
        <motion.div
            key={`Post:${params.post_id}`}
            css={C.container}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

        >
            <VirtualList
                list={[
                    component,
                    <div css={{ maxWidth: '800px', margin: 'auto', marginTop: '0px', display: 'flex', flexDirection: 'column' }}>
                        <AddComment post_id={params.post_id} parent_id={params.post_id} />
                    </div>,
                    ...components
                ]} />


        </motion.div>
    )
}


export default PostList
