/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import { useParams } from 'react-router-dom'
import useCommentSubTree from 'Hooks/Pull/useCommentSubTree'
import usePost from 'Hooks/Pull/usePost'
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter'
import VirtuList from '../VirtualList/VirtuList'
import { textLabel } from 'Global/Mixins'
import { mainSizeState } from 'State/Data'
import Online from 'Stories/Bits/Online/Online'
import { useRecoilValue } from 'recoil'
import Avatar from 'Stories/Bits/Avatar/Avatar'
import useCommunityData from 'Hooks/Pull/useCommunityData'
import { PostHolder } from './PlaceHolders'

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
            css={C.container}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

        >

            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtuList
                    public_id={params.post_id}
                    overscan={2}
                    list={[
                        (isError || isError2 || isLoading || isLoading2) ?
                            [<PostHolder />] :
                            [component, ...components]
                    ]} />
            </div>


            {mainSize > 0 &&
                <div css={{ height: 'min-content', marginTop: '16px' }}>
                    {mainSize === 1 ? null :
                        data ?
                            <motion.div
                                key={`preview`
                                }
                                transition={{ duration: 0.4 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                css={D.container}>

                                <img css={D.banner}
                                    onError={handleImgError}
                                    src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${data.community.public_id}`} />

                                <div css={{
                                    padding: '12px 0px 0px 0px',
                                    display: 'flex',
                                    gap: '8px',
                                    alignItems: 'center',

                                }}>
                                    <Avatar size='medium' public_id={params.community_id} />
                                    <div css={{
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                    }}>
                                        <h4 css={{
                                            color: '#dbdee1',
                                            fontSize: '16px', textOverflow: "ellipsis",
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                        }}>{data.community.title}</h4>
                                    </div>


                                </div>

                                <div css={{
                                    padding: '12px 8px 0px 0px',
                                    fontSize: '14px',
                                    display: 'flex',
                                    gap: '18px',
                                }}>
                                    <div>
                                        <div css={[textLabel('t'), { marginBottom: '4px', color: '#f2f3f5' }]}>Members</div>
                                        <div css={{
                                            color: '#fff',
                                            fontWeight: 700,
                                        }}>
                                            <span css={{
                                                display: ' inline-block',
                                                width: '10px',
                                                height: '10px',
                                                borderRadius: '50%',
                                                background: '#c4c9ce',
                                                marginRight: '4px',
                                            }} />{data.community.subscribers}</div>
                                    </div>
                                    <div>
                                        <div css={[textLabel('t'), { marginBottom: '4px', color: '#f2f3f5' }]}>Online</div>
                                        <Online public_id={data.community.public_id} />

                                    </div>

                                </div>
                            </motion.div> : <div css={{ width: '240px', height: '164px', marginBottom: '8px' }}></div>}
                    <GlobalFilter />
                    {/* <Move /> */}
                </div>
            }




        </motion.div >
    )
}


export default CommentList

const handleImgError = (e: any) => e.target.style.display = 'none'
