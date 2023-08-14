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
import { layoutSize, mainSize } from '@/state/layout'
import MainFilter from '../bits/filter/MainFilter'
import usePosts from '@/hooks/list/usePosts'
import { BasePaneD, BasePaneM } from '@/sections/BasePane'
import { Info } from '@mui/icons-material'
import { CommunityPaneM } from '@/sections/CommuityPane'



const CommunityList = () => {

    const params: any = useParams()
    const filter = useRecoilValue(communityFilter(params.community_id))
    const size = useRecoilValue(mainSize)
    const layout = useRecoilValue(layoutSize)
    const [isLoading1, isError1, component, data] = useCommunity(params.community_id)
    const [isLoading, isError, components]: any = usePosts('COMMUNITY', params.community_id, filter, 'community')


    if (layout === 'mobile') return (
        <BasePaneM id={`COMMUNITY/${params.community_id}/${filter}/community`}>
            <VirtuList list={(isLoading || isLoading1) ?
                [<HeadHolder key={0} />, <FilterHolder key={1} />, <PostHolder key={2} />, <PostHolder key={3} />, <PostHolder key={5} />, <PostHolder key={6} />] :
                [<div css={{ height: '48px' }} />, <CommunityPaneM {...data} />, <MainFilter type={params.community_id} />, ...components]} />
        </BasePaneM>
    )



    return (
        <BasePaneD>

            <VirtuList list={(isLoading || isLoading1) ?
                [<HeadHolder key={0} />, <FilterHolder key={1} />, <PostHolder key={2} />, <PostHolder key={3} />, <PostHolder key={5} />, <PostHolder key={6} />] :
                [component, <MainFilter type={params.community_id} />, ...components]} />

            {size > 0 &&
                <div css={{ height: 'min-content', overflow: 'hidden', marginTop: '12px' }}>
                    <GlobalFilter />
                </div>}

        </BasePaneD>
    )




}


export default CommunityList