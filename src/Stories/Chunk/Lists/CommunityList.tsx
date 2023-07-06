/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import FilterPane from 'Stories/Bits/Filter/CommunityFilter'
import { useRecoilValue } from 'recoil'
import { postFilter } from 'State/filterAtoms'
import usePostList from 'Hooks/Pull/usePostList'
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter'
import usePullCommunity from 'Hooks/usePullCommunity'
import VirtuList from '../VirtualList/VirtuList'
import { mainSizeState } from 'State/Data'
import { FilterHolder, HeadHolder, PostHolder } from './PlaceHolders'
import useCommunity from 'Hooks/Pull/useCommunity'
import useLinkCommunity from 'Hooks/Link/useLinkCommunity'


const C = {
    container: css({
        height: '100%',
        width: '100%',
        position: 'absolute',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 50,
        gap: '12px',
    })
}

const CommunityList = () => {

    const params:any = useParams()
    const filter = useRecoilValue(postFilter)
    const mainSize = useRecoilValue(mainSizeState)

    const [isLoading1, isError1, component] = useCommunity(params.community_id)
    const [isLoading, isError, components]: any = usePostList(params.community_id, filter)

    useLinkCommunity(params.community_id, true)

    return (

        <motion.div
            key={params.community_id}
            css={C.container}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >

            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtuList
                    list={
                        (isError || isLoading || isError1 || isLoading1) ?
                            [<HeadHolder key={0} />, <FilterHolder key={1} />, <PostHolder key={2} />, <PostHolder key={3} />, <PostHolder key={5} />, <PostHolder key={6} />] :
                            [component, <FilterPane />, ...components]}
                />
            </div>

            {mainSize > 0 &&
                <div css={{ height: 'min-content', overflow: 'hidden', marginTop: '12px' }}>
                    <GlobalFilter />
                </div>}

        </motion.div>
    )
}


export default CommunityList