/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { motion } from "framer-motion"
import Avatar from 'Stories/Bits/Avatar/Avatar'
import ContentLoader from 'Stories/Bits/ContentLoader/ContentLoader'
import Author from "Stories/Bits/Titles/Author"
import CommunityTitle from "Stories/Bits/Titles/CommunityTitle"
import Nickname from "Stories/Bits/Titles/Nickname"
import { useNavigate } from 'react-router-dom'
import { memo, useEffect, useState, } from 'react'
import { useRecoilValue } from 'recoil'
import { authFlow, contentFlow } from 'State/Flow'
import { textBold, textLight } from 'Global/Mixins'
import RightMenu from 'Stories/Bits/RightMenu/RightMenu'
import { formatDistanceStrict, parseISO } from 'date-fns'
import VisibilitySensor from 'react-visibility-sensor';
import LiveComments from 'Stories/Alive/LiveComments'
import LiveViews from 'Stories/Alive/LiveViews'
import LiveVotes from 'Stories/Alive/LiveVotes'
import LiveTags from '../../Alive/LiveTags'
import useLiveData from 'Hooks/useLiveData'
import LiveRoles from 'Stories/Alive/LiveRoles'

const C = {
    container: css({
        width: '100%',
        minHeight: '100px',
        padding: '16px 2px 0px 0px',

    }),
    inner: css({
        margin: '0 auto',
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        background: '#272732',
        padding: '8px',
        borderRadius: '8px',
        cursor: 'pointer',
    }),
    footer: css({
        display: 'flex',
        width: 'min-content',
        gap: '8px',

    }),
    right: css({
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        gap: '8px',
        maxWidth: '750px',
    }),
    header: css({
        gap: '8px',
        height: '40px',
        color: '#f2f4f5 !important',
        display: 'flex',
    })
}


const Post = ({ public_id }: any) => {

    useEffect(() => {
        return () => {
        };
    }, []);

    // proxing data
    const [visibility, setVisibility] = useState(false)
    const data = useLiveData(visibility, `subscribe:${public_id}`)
    const { title, content, created_at, author, community, vote, karma, views, comments, tags, type, community_roles, global_roles } = data

    const authState = useRecoilValue(authFlow)
    const contentState = useRecoilValue(contentFlow)

    const navigate = useNavigate()
    const handleVisibility = (isVisible: boolean) => setVisibility(isVisible)
    const bodyClick = () => navigate(`/c/${community.public_id}/p/${public_id}`)

    if (!data || data === undefined || !created_at) return null

    return (
        <VisibilitySensor onChange={handleVisibility}>
            <div css={C.container} key={`/c/${community.public_id}/p/${public_id}`}>
                <div css={C.inner} onClick={bodyClick}>


                    <div css={C.header}>

                        {contentState === 'global' ?
                            <Avatar size="medium" public_id={community?.public_id} /> :
                            <Avatar size="medium" public_id={author?.public_id} />}

                        {contentState === 'community' && <div>
                            <div css={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Author
                                    title={author?.nickname}
                                    public_id={author?.public_id}
                                    community_id={community?.public_id}
                                    global_roles={global_roles}
                                />
                                <span css={textLight('t')}> - {formatDistanceStrict(parseISO(created_at), new Date(), { addSuffix: true })}</span>
                            </div>

                            <div css={{ display: 'flex', alignItems: 'center', gap: '4px', height: '20px' }}>
                                {community_roles && <LiveRoles value={community_roles} />}
                                {tags && <LiveTags value={tags} />}
                            </div>
                        </div>}


                        {contentState !== 'community' && <div>
                            <div>
                                <div css={{ display: 'flex', gap: '4px', alignItems: 'baseline' }}>
                                    <CommunityTitle title={community?.title} public_id={community?.public_id} />

                                    <div css={textLight('t')}> - {formatDistanceStrict(parseISO(created_at), new Date(), {
                                        addSuffix: true
                                    })}</div>
                                </div>
                                <div css={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <Nickname title={author?.nickname} public_id={author?.public_id} global_roles={global_roles} />
                                    {community_roles && <LiveRoles value={community_roles} />}
                                    {tags && <LiveTags value={tags} />}                                    </div>
                            </div>


                        </div>}

                        {authState !== 'guest' && <RightMenu
                            tags={tags}
                            type={'post'}
                            person_id={author?.public_id}
                            public_id={public_id}
                            global_roles={global_roles}
                            community_roles={community_roles} />}

                    </div>

                    <div css={textBold('x')}>{title && title}</div>
                    <ContentLoader type={type} content={content} />

                    <div css={C.footer} onClick={(e) => e.stopPropagation()}>
                        <LiveVotes value={vote} karma={karma} public_id={public_id} type='post' />
                        <LiveViews value={views} />
                        <LiveComments value={comments} />
                    </div>

                </div>
            </div>
        </VisibilitySensor>
    )
}


export default memo(Post)



                        //     <>
                        //         <div css={{ display: 'flex', gap: '4px' }}>
                        //             <Author username={author?.nickname} public_id={author?.public_id} />
                        //             <div css={textLight('t')}> - {formatDistanceStrict(parseISO(created_at), new Date(), {
                        //                 addSuffix: true
                        //             })}
                        //             </div>
                        //         </div>
                        //         {tags && <LiveTags value={tags} />}
                        //     </>
                        // ) : (<></>
                            // <div>
                            //     <div css={{ display: 'flex', gap: '4px', alignItems: 'baseline' }}>
                            //         <CommunityTitle title={community?.title} public_id={community?.public_id} />

                            //         <div css={textLight('t')}> - {formatDistanceStrict(parseISO(created_at), new Date(), {
                            //             addSuffix: true
                            //         })}</div>
                            //     </div>
                            //     <div css={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            //         <Nickname title={author?.nickname} public_id={author?.public_id} />
                            //         {tags && <LiveTags value={tags} />}                                    </div>
                            // </div>
                        // )}
