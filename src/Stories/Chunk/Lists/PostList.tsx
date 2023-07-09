
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'

import { memo } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import AddComment from '../Comment/AddComment'
import VirtualList from '../VirtualList/VirtualList'
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter'
import useCommunityData from 'Hooks/Pull/useCommunityData'

import usePost from 'Hooks/Pull/usePost'
import { mainSizeState } from 'State/Data'
import useCommentList from 'Hooks/Pull/useCommentList'
import useIsMuted from 'Hooks/Util/useIsMuted'
import { CommentHolder, FilterHolder, PostHolder } from './PlaceHolders'
import useLinkPost from 'Hooks/Link/useLinkPost'
import CommunityPreview from 'Stories/Bits/Preview/CommunityPreview'

//@ts-ignore
import { Helmet } from "react-helmet"
import { overList } from 'Global/Mixins'




const PostList = () => {

    const params: any = useParams()
    const [isLoading, isError, component] = usePost(params.post_id)
    const [isLoading2, isError2, components]: any = useCommentList(params.post_id)

    // const see = useSetRecoilState(seenAtom)
    const data = useCommunityData(params.community_id)
    const mainSize = useRecoilValue(mainSizeState)
    const isMuted = useIsMuted(params.community_id)
    useLinkPost(params.post_id, true)


    // useEffect(() => {
    //     see((o: any) => [...o, params.post_id])
    // }, [params.post_id])



    return (<motion.div
        key={params.post_id}
        css={overList}
        transition={{ duration: 0.15 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
    >


        <Helmet>
            <title>{component?.props?.title}</title>
            <meta name="description" content={component?.props?.content} />
        </Helmet>


        <div css={{ maxWidth: '800px', width: '100%' }}>
            <VirtualList
                public_id={params.post_id}
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

        {mainSize > 0 &&
            <div css={{ height: 'min-content', marginTop: '12px' }}>
                {mainSize === 1 ? null : <CommunityPreview {...data} />}
                <GlobalFilter />
            </div>
        }

    </motion.div >
    )
}


export default memo(PostList)

