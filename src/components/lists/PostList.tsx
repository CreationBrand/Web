
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'

import { memo } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import AddComment from '../chunks/Comment/AddComment'



import { CommentHolder, FilterHolder, PostHolder } from './PlaceHolders'


//@ts-ignore
import { overList } from '@/global/mixins'
import useCommentList from '@/hooks/useCommentList'
import useCommunityData from '@/hooks/useCommunityData'
import usePost from '@/hooks/usePost'
import GlobalFilter from '../bits/filter/GlobalFilter'
import useLinkPost from '@/hooks/Link/useLinkPost'
import useIsMuted from '@/hooks/useIsMuted'
import { mainSize } from '@/state/layout'
import VirtualList from '../chunks/VirtualList/VirtualList'
import CommunityPreview from '../chunks/Preview/CommunityPreview'




const PostList = () => {

    const params: any = useParams()
    const [isLoading, isError, component] = usePost(params.post_id)
    const [isLoading2, isError2, components]: any = useCommentList(params.post_id)

    const data = useCommunityData(params.community_id)
    const size = useRecoilValue(mainSize)
    const isMuted = useIsMuted(params.community_id)
    useLinkPost(params.post_id, true)


    return (<motion.div
        key={params.post_id}
        css={overList}
        transition={{ duration: 0.3 }}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
    >
        <Outlet />
        <div css={{ maxWidth: '800px', width: '100%' }}>
            <VirtualList
                // public_id={params.post_id}
                overscan={10}
                list={
                    (isError || isError2 || isLoading || isLoading2) ? [<PostHolder />, <FilterHolder />, <CommentHolder />, <CommentHolder />] :
                        [
                            component,
                            <div key={'component'} css={{ margin: 'auto', marginTop: '8px', display: 'flex', flexDirection: 'column' }}>
                                <AddComment isMuted={isMuted} post_id={params.post_id} parent_id={params.post_id} />
                            </div>,
                            ...components
                        ]} />
        </div>

        {size > 0 &&
            <div css={{ height: 'min-content', marginTop: '12px' }}>
                {size === 1 ? null : <CommunityPreview {...data} />}
                <GlobalFilter />
            </div>
        }

    </motion.div >
    )
}


export default memo(PostList)

