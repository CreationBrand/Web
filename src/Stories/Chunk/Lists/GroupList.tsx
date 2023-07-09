/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import usePullGroup from 'Hooks/usePullGroup'
import usePostList from 'Hooks/Pull/usePostList'
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter'
import VirtuList from '../VirtualList/VirtuList'
import { FilterHolder, PostHolder } from './PlaceHolders'
import { mainSizeState } from 'State/Data'
import { useRecoilValue } from 'recoil'


//@ts-ignore
import { Helmet } from "react-helmet"
import { baseList } from 'Global/Mixins'
import useGroupList from 'Hooks/Pull/useGroupList'



const GroupList = ({ group_id }: any) => {

    const params: any = useParams()
    const mainSize = useRecoilValue(mainSizeState)

    const [isError1, group, data] = usePullGroup(group_id)
    const [isError, components]: any = useGroupList(group_id)

    return (

        <motion.div
            key={group_id}
            css={baseList}
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
        >
            <Helmet>
                <title>{data?.group?.title}</title>
            </Helmet>

            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtuList
                    list={
                        (isError ?
                            [<FilterHolder />, <PostHolder />, <PostHolder />, <PostHolder />, <PostHolder />] :
                            [
                                group,
                                ...components
                            ])}
                />
            </div>

            {mainSize > 0 &&
                <div css={{ height: 'min-content', overflow: 'hidden', marginTop: '12px' }}>
                    <GlobalFilter />
                </div>}
        </motion.div>
    )
}


export default memo(GroupList)