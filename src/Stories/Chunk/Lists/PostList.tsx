
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'

import { useEffect, useRef, useState, } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'

import AddComment from '../Comment/AddComment'
import VirtualList from '../VirtualList/VirtualList'
import { authFlow } from 'State/Flow'
import { seenAtom } from 'State/seenAtom'
import useWindow from 'Hooks/useWindow'
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter'
import useCommunityData from 'Hooks/Pull/useCommunityData'
import { textLabel } from 'Global/Mixins'
import { isAdmin } from 'Service/Rbac'
import Online from 'Stories/Bits/Online/Online'

import Avatar from 'Stories/Bits/Avatar/Avatar'
import { leaveCommunity, joinCommunity } from 'Helper/Action'
import useComments from 'Hooks/Pull/useComments'
import usePost from 'Hooks/Pull/usePost'
import { communityListData } from 'State/Data'
import { postFilter } from 'State/filterAtoms'
import { Button } from '@mui/material'
import useSize from 'Hooks/useSize'
import VirtuList from '../VirtualList/VirtuList'

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
        // background: '#272732',
        width: '240px',
        maxWidth: '240px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 8,
        marginTop: '16px'

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

const PostList = () => {

    const params: any = useParams()

    const [isLoading, isError, component] = usePost(params.post_id)
    const [isLoading2, isError2, components]: any = useComments(params.post_id)

    const see = useSetRecoilState(seenAtom)
    const data = useCommunityData(params.community_id)
    const auth = useRecoilValue(authFlow)
    const [isMember, setIsMember] = useState(false)
    const communityList = useRecoilValue(communityListData)

    const ref: any = useRef()
    const size: any = useSize(ref)
    let width = size?.width

    useEffect(() => {
        see((o: any) => [...o, params.post_id])
    }, [params.post_id])


    const handleJoin = (e: any) => {
        e.stopPropagation()
        setIsMember(!isMember)
        if (isMember) leaveCommunity(params.community_id)
        else joinCommunity(params.community_id)
    }

    // find out if your a member
    useEffect(() => {
        const hasMatchingId = communityList.some((obj: any) => obj.public_id === params.community_id);
        setIsMember(hasMatchingId)
    }, [params.community_id])

    if (isError || isError2) return <ChunkError refa={ref} variant='error' />
    if (isLoading || isLoading2) return <ChunkError refa={ref} variant='loading' />


    return (
        <motion.div
            ref={ref}
            key={`Post:${params.post_id}`}
            css={C.container}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}

        >


            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtualList
                    overscan={20}

                    list={[
                        component,
                        <div css={{ maxWidth: '800px', margin: 'auto', marginTop: '8px', display: 'flex', flexDirection: 'column' }}>
                            <AddComment post_id={params.post_id} parent_id={params.post_id} />
                        </div>,
                        ...components
                    ]}
                />
            </div>


            {width > 852 &&
                <div css={{ height: 'min-content' }}>

                    {width < 1052 ? null :


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

                                    {auth !== 'guest' && <div css={D.action}>
                                        <Button
                                            disabled={isAdmin(data?.communityHex)}
                                            onClick={handleJoin}
                                            disableElevation
                                            sx={{
                                                marginLeft: 'auto !important',
                                                fontFamily: 'Noto Sans',
                                                background: '#0f0e10',
                                                borderRadius: '16px',
                                                fontSize: '12px',
                                                fontWeight: '700',
                                            }}
                                            variant="contained">{isMember ? 'LEAVE' : 'JOIN'}</Button>
                                    </div>
                                    }

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
                            </motion.div> : <div css={{ width: '240px', height: '172px' }}></div>}

                    <GlobalFilter />

                </div>
            }




        </motion.div >
    )
}


export default PostList

const handleImgError = (e: any) => e.target.style.display = 'none'
