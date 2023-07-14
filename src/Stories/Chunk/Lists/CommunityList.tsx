/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { motion } from 'framer-motion'
import { Outlet, useParams } from 'react-router-dom'
import FilterPane from 'Stories/Bits/Filter/CommunityFilter'
import { useRecoilValue } from 'recoil'
import { postFilter } from 'State/filterAtoms'
import usePostList from 'Hooks/Pull/usePostList'
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter'
import VirtuList from '../VirtualList/VirtuList'
import { mainSizeState } from 'State/Data'
import { FilterHolder, HeadHolder, PostHolder } from './PlaceHolders'
import useCommunity from 'Hooks/Pull/useCommunity'
import useLinkCommunity from 'Hooks/Link/useLinkCommunity'

//@ts-ignore
import { Helmet } from "react-helmet"
import { baseList } from 'Global/Mixins'


const CommunityList = () => {

    const params: any = useParams()
    const filter = useRecoilValue(postFilter)
    const mainSize = useRecoilValue(mainSizeState)

    const [isLoading1, isError1, component, data] = useCommunity(params.community_id)
    const [isLoading, isError, components]: any = usePostList(params.community_id, filter)

    useLinkCommunity(params.community_id, true)

    return (

        <motion.div
            key={params.community_id}
            css={baseList}
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >

            <Helmet>
                <title>{data?.community?.title} | Artram</title>
                <meta name="description" content={data?.community?.description} />
            </Helmet>

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