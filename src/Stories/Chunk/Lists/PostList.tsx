
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import usePullComments from 'Hooks/usePullComments'
import usePullPost from 'Hooks/usePullPost'
import { memo, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import FilterPane from 'Stories/Pane/FilterPane'

import AddComment from '../Comment/AddComment'
import VirtualList from '../VirtualList/VirtualList'
import { contentFlow, postFilterFlow } from 'State/Flow'
import useCommunityFlow from 'Hooks/useCommunityFlow'
import useContentFlow from 'Hooks/useContentFlow'
import useComments from 'Hooks/Pull/useComments2'
import { seenAtom } from 'State/seenAtom'

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
    const [filter, setFilter] = useRecoilState(postFilterFlow)

    const [isLoading, isError, component, data] = usePullPost(params.post_id)
    const [isLoading2, isError2, components]: any = useComments(params.post_id, filter)
    const see = useSetRecoilState(seenAtom)

    useContentFlow('post')
    useCommunityFlow(data?.post?.community?.public_id)

    useEffect(() => {
        see((o: any) => [...o, params.post_id])
    }, [params.post_id])


    if (isError || isError2) return <ChunkError variant='error' />
    if (isLoading || isLoading2) return <ChunkError variant='loading' />

    console.log('components', components)

    return (
        <motion.div
            key={`Post:${params.post_id}`}
            css={C.container}
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}

        >
            <VirtualList
            
                list={[
                    component,
                    <div css={{ maxWidth: '800px', margin: 'auto', marginTop: '0px', display: 'flex', flexDirection: 'column' }}>
                        <FilterPane value={filter} onChange={setFilter} />
                        <AddComment post_id={params.post_id} parent_id={params.post_id} />
                    </div>,
                    ...components
                ]} />


        </motion.div>
    )
}


export default memo(PostList)
