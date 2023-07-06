
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'

import { memo, useEffect, useState, } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'

import AddComment from '../Comment/AddComment'
import VirtualList from '../VirtualList/VirtualList'
import { seenAtom } from 'State/seenAtom'
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter'
import useCommunityData from 'Hooks/Pull/useCommunityData'
import { textLabel } from 'Global/Mixins'
import Online from 'Stories/Bits/Online/Online'

import Avatar from 'Stories/Bits/Avatar/Avatar'
import { leaveCommunity, joinCommunity } from 'Helper/Action'
import useComments from 'Hooks/Pull/useComments'
import usePost from 'Hooks/Pull/usePost'
import { communityListData, mainSizeState } from 'State/Data'
import VirtuList from '../VirtualList/VirtuList'
import useCommentList from 'Hooks/Pull/useCommentList'
import useIsMuted from 'Hooks/Util/useIsMuted'
import { CommentHolder, FilterHolder, PostHolder } from './PlaceHolders'
import useLinkPost from 'Hooks/Link/useLinkPost'
import Move from 'Stories/Bits/Filter/Move'
import CommunityPreview from 'Stories/Bits/Preview/CommunityPreview'


const C = {
    container: css({
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        zIndex: 100,
        background: '#0f0e10',
    })
}



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


    return (
        <motion.div
            key={params.post_id}
            css={C.container}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >

            <div css={{ maxWidth: '800px', width: '100%' }}>

                <VirtualList
                    public_id={params.post_id}
                    overscan={10}
                    list={
                        (isError || isError2 || isLoading || isLoading2) ? [<PostHolder />, <FilterHolder />, <CommentHolder />, <CommentHolder />,] :
                            [
                                component,
                                <div key={'component'} css={{ maxWidth: '800px', margin: 'auto', marginTop: '8px', display: 'flex', flexDirection: 'column' }}>
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

const handleImgError = (e: any) => e.target.style.display = 'none'







