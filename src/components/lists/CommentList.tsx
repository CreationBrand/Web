/** @jsxImportSource @emotion/react */
import { overList } from '@/global/mixins'
import useCommentSubTree from '@/hooks/useCommentSubTree'
import useCommunityData from '@/hooks/useCommunityData'
import usePost from '@/hooks/usePost'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import GlobalFilter from '../bits/filter/GlobalFilter'
import VirtuList from '../chunks/VirtualList/VirtuList'
import { PostHolder } from './PlaceHolders'
import { mainSize } from '@/state/layout'
import useLinkPost from '@/hooks/Link/useLinkPost'
import CommunityPreview from '../chunks/Preview/CommunityPreview'


const D = {
    container: css({
        width: '240px',
        maxWidth: '240px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 8,

    }),
    banner: css({
        height: '60px',
        borderRadius: '8px',
        objectFit: 'cover',
    }),
    action: css({
        marginLeft: 'auto',
        zIndex: 100,
    }),
}

const CommentList = () => {

    const params: any = useParams()
    const size = useRecoilValue(mainSize)
    const data = useCommunityData(params.community_id)


    const [isLoading, isError, component] = usePost(params.post_id)
    const [isLoading2, isError2, components] = useCommentSubTree(params.comment_id)

    // useLinkPost(params.post_id, true)



    return (
        <motion.div
            key={`comment:${params.post_id}`}
            css={overList}
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

        >
            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtuList
                    public_id={params.post_id}
                    overscan={2}
                    list={[
                        (isError || isError2 || isLoading || isLoading2) ?
                            [<PostHolder key={0} />] :
                            [component, ...components]
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


export default CommentList

const handleImgError = (e: any) => e.target.style.display = 'none'
