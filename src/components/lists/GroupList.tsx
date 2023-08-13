/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo } from 'react'
import { Outlet, useParams } from 'react-router-dom'

import VirtuList from '../chunks/VirtualList/VirtuList'
import { useRecoilValue } from 'recoil'


//@ts-ignore

import { baseList } from '@/global/mixins'
import { mainSize } from '@/state/layout'
import GlobalFilter from '../bits/filter/GlobalFilter'
import usePullGroup from '@/hooks/usePullGroup'
import { communityFilter } from '@/state/filters'
import MainFilter from '../bits/filter/MainFilter'
import usePosts from '@/hooks/list/usePosts'



const GroupList = () => {

    const params: any = useParams()
    const size = useRecoilValue(mainSize)
    const filter = useRecoilValue(communityFilter(params.group_id))

    const [isError1, group, data] = usePullGroup(params.group_id)
    const [isLoading, isError, components]: any = usePosts('GROUP', params.group_id, filter,'global')

    return (<motion.div
        key={params.group_id}
        css={baseList}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
    >

        <div css={{ maxWidth: '800px', width: '100%' }}>
            <VirtuList list={[group, <MainFilter type={params.group_id} />, ...components]} />
        </div>

        {size > 0 &&
            <div css={{ height: 'min-content', overflow: 'hidden', marginTop: '12px' }}>
                <GlobalFilter />
            </div>}
    </motion.div>
    )
}


export default memo(GroupList)
