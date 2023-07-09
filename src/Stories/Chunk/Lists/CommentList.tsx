/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import useCommentSubTree from 'Hooks/Pull/useCommentSubTree'
import usePost from 'Hooks/Pull/usePost'
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter'
import VirtuList from '../VirtualList/VirtuList'
import { mainSizeState } from 'State/Data'
import { useRecoilValue } from 'recoil'
import useCommunityData from 'Hooks/Pull/useCommunityData'
import { PostHolder } from './PlaceHolders'
import CommunityPreview from 'Stories/Bits/Preview/CommunityPreview'
import { overList } from 'Global/Mixins'



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
    const mainSize = useRecoilValue(mainSizeState)
    const data = useCommunityData(params.community_id)


    const [isLoading, isError, component] = usePost(params.post_id)
    const [isLoading2, isError2, components] = useCommentSubTree(params.comment_id)




    return (
        <motion.div
            key={`comment:${params.post_id}`}
            css={overList}
            transition={{ duration: 0.4 }}
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


            {mainSize > 0 &&
                <div css={{ height: 'min-content', marginTop: '16px' }}>
                    {mainSize === 1 ? null : <CommunityPreview {...data} />}
                    <GlobalFilter />
                </div>
            }




        </motion.div >
    )
}


export default CommentList

const handleImgError = (e: any) => e.target.style.display = 'none'
