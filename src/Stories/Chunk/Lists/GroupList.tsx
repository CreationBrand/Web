/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo } from 'react'
import { useParams } from 'react-router-dom'
import usePullGroup from 'Hooks/usePullGroup'
import usePostList from 'Hooks/Pull/usePostList'
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter'
import VirtuList from '../VirtualList/VirtuList'
import { FilterHolder, PostHolder } from './PlaceHolders'
import { mainSizeState } from 'State/Data'
import { useRecoilValue } from 'recoil'

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

const GroupList = ({ group_id }: any) => {

    const params: any = useParams()
    const mainSize = useRecoilValue(mainSizeState)

    const [isError1, group, data] = usePullGroup(params.group_id)
    const [isLoading, isError, components]: any = usePostList(group_id, 'group')

    return (
        <motion.div
            key={params.group_id}
            css={C.container}
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
        >

            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtuList
                    list={
                        (isError || isLoading ?
                            [<FilterHolder />, <PostHolder />, <PostHolder />, <PostHolder />, <PostHolder />] :
                            [
                                group,
                                ...components
                            ])}
                />
            </div>

            {mainSize > 0 &&
                <div css={{ height: 'min-content', overflow: 'hidden', marginTop: '16px' }}>
                    <GlobalFilter />
                </div>}
        </motion.div>
    )
}


export default memo(GroupList)