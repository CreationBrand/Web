/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo } from 'react'
import { Outlet, useParams } from 'react-router-dom'

import VirtuList from '../chunks/VirtualList/VirtuList'
import { FilterHolder, PostHolder } from './PlaceHolders'
import { useRecoilValue } from 'recoil'


//@ts-ignore
import { Helmet } from "react-helmet"
import useGroupList from '@/hooks/useGroupList'
import { baseList } from '@/global/mixins'
import { mainSize } from '@/state/layout'
import GlobalFilter from '../bits/filter/GlobalFilter'
import usePullGroup from '@/hooks/usePullGroup'
import usePostList from '@/hooks/usePostList'
import { communityFilter } from '@/state/filters'
import MainFilter from '../bits/filter/MainFilter'



const GroupList = () => {

    const params: any = useParams()
    const size = useRecoilValue(mainSize)
    const filter = useRecoilValue(communityFilter(params.group_id))

    const [isError1, group, data] = usePullGroup(params.group_id)
    const [isLoading, isError, components]: any = usePostList('GROUP', params.group_id, filter)

    return (

        <motion.div
            key={params.group_id}
            css={baseList}
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >



            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtuList
                    list={
                        (isError || isLoading ?
                            [<FilterHolder />, <PostHolder />, <PostHolder />, <PostHolder />, <PostHolder />] :
                            [group, <MainFilter type={params.group_id} />, ...components])}
                />
            </div>

            {size > 0 &&
                <div css={{ height: 'min-content', overflow: 'hidden', marginTop: '12px' }}>
                    <GlobalFilter />
                </div>}
        </motion.div>
    )
}


export default memo(GroupList)
