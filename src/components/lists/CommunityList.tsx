/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { motion } from 'framer-motion'
import { Outlet, useParams } from 'react-router-dom'

import VirtuList from '../chunks/VirtualList/VirtuList'
import { FilterHolder, HeadHolder, PostHolder } from './PlaceHolders'


//@ts-ignore
import { baseList } from '@/global/mixins'
import useLinkCommunity from '@/hooks/Link/useLinkCommunity'
import useCommunity from '@/hooks/useCommunity'
import usePostList from '@/hooks/usePostList'
import { useRecoilValue } from 'recoil'
import FilterPane from '../bits/filter/CommunityFilter'
import GlobalFilter from '../bits/filter/GlobalFilter'
import { communityFilter, postFilter } from '@/state/filters'
import { mainSize } from '@/state/layout'
import MainFilter from '../bits/filter/MainFilter'


const CommunityList = () => {

    const params: any = useParams()
    const filter = useRecoilValue(communityFilter(params.community_id))
    const size = useRecoilValue(mainSize)

    const [isLoading1, isError1, component, data] = useCommunity(params.community_id)
    const [isLoading, isError, components]: any = usePostList('COMMUNITY', params.community_id, filter)

    // useLinkCommunity(params.community_id, true)

    return (

        <motion.div
            key={params.community_id}
            css={baseList}
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >

            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtuList
                    list={
                        (isLoading || isLoading1) ?
                            [<HeadHolder key={0} />, <FilterHolder key={1} />, <PostHolder key={2} />, <PostHolder key={3} />, <PostHolder key={5} />, <PostHolder key={6} />] :
                            [component, <MainFilter type={params.community_id} />, ...components]}
                />
                {/* <VirtuList list={[component, <MainFilter type={params.community_id} />, ...components]} /> */}

            </div>

            {size > 0 &&
                <div css={{ height: 'min-content', overflow: 'hidden', marginTop: '12px' }}>
                    <GlobalFilter />
                </div>}

        </motion.div>

    )
}


export default CommunityList