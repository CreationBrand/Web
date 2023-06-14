/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import usePullCommunity from 'Hooks/usePullCommunity'
import { memo } from 'react'
import { useParams } from 'react-router-dom'

import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import FilterPane from 'Stories/Bits/Filter/CommunityFilter'


import { useRecoilValue } from 'recoil'
import useCommunityFlow from 'Hooks/useCommunityFlow'
import useContentFlow from 'Hooks/useContentFlow'
import VirtuList from '../VirtualList/VirtuList'
import { postFilter } from 'State/filterAtoms'
import usePostList from 'Hooks/Pull/usePostList'
import VirtualList from '../VirtualList/VirtualList'


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
    const filter = useRecoilValue(postFilter)

    useContentFlow('community')
    useCommunityFlow(params.community_id)

    const [isLoading1, isError1, component, data] = usePullCommunity(params.community_id)
    const [isLoading, isError, components] = usePostList(params.community_id, filter)

    if (isError1 || isError) return <ChunkError variant='error' />
    if (isLoading1 || isLoading) return <ChunkError variant='loading' />


    return (
        <motion.div
            key={params.community_id}
            css={C.container}
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
        > <VirtualList
                public_id={params.community_id}
                list={[
                    component,
                    <FilterPane />,
                    ...components]}
            />
        </motion.div>
    )
}


export default memo(CommunityList)