/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import usePullCommunity from 'Hooks/usePullCommunity'
import usePullPosts from 'Hooks/usePullPosts'
import { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import FilterPane from 'Stories/Pane/FilterPane'

import VirtualList from 'Stories/Chunk/VirtualList/VirtualList'
import { useRecoilState } from 'recoil'
import { contentFlow } from 'State/Flow'
import BitSet from 'bitset'
import useCommunityFlow from 'Hooks/useCommunityFlow'
import useContentFlow from 'Hooks/useContentFlow'


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

const CommunityList = () => {

    const params = useParams()
    const [filter, setFilter] = useState('HOT')

    useContentFlow('community')
    useCommunityFlow(params.community_id)

    const [isLoading1, isError1, component, data] = usePullCommunity(params.community_id)
    const [isLoading, isError, components] = usePullPosts(params.community_id, filter)

    if (isError1 || isError) return <ChunkError variant='error' />
    if (isLoading1 || isLoading) return <ChunkError variant='loading' />

    return (
        <motion.div
            key={params.community_id}
            css={C.container}
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}

        >
            <VirtualList
                list={[
                    component,
                    <FilterPane value={filter} onChange={setFilter} />,
                    ...components]}
            />
        </motion.div>
    )
}


export default memo(CommunityList)