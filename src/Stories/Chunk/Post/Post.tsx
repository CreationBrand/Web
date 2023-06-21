/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Avatar from 'Stories/Bits/Avatar/Avatar'
import ContentLoader from '../ContentLoader/ContentLoader'
import Author from "Stories/Bits/Titles/Author"
import CommunityTitle from "Stories/Bits/Titles/CommunityTitle"
import Nickname from "Stories/Bits/Titles/Nickname"
import { useNavigate } from 'react-router-dom'
import { memo, useEffect, useState, } from 'react'
import { useRecoilValue } from 'recoil'
import { authFlow, contentFlow, filterFlow } from 'State/Flow'
import { textBold, textLight, textNormal } from 'Global/Mixins'
import LiveComments from 'Stories/Alive/LiveComments'
import LiveViews from 'Stories/Alive/LiveViews'
import LiveVotes from 'Stories/Alive/LiveVotes'
import LiveTags from '../../Alive/LiveTags'
import { hasSeen } from 'State/seenAtom'
import usePostLive from './usePostLive'
import VisibilitySensor from 'react-visibility-sensor';

// @ts-ignore
import TimeAgo from 'react-timeago'
import { formatTime } from 'Util/formatTime'
import LiveRoles from 'Stories/Alive/LiveRoles'
import PostMenu from 'Stories/Menu/PostMenu'


const C = {
    container: css({
        width: '100%',
        padding: '16px 0px 0px 0px',

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


const Post = ({ view, ...props }: any) => {


    // proxing data
    const [inView, setVisibility] = useState(false)
    const data: any = usePostLive(inView, props)
    const { visibility, public_id, title, content, created_at, author, community, vote, karma, views, comments, tags, type, community_roles, global_roles } = data

    const filter = useRecoilValue(filterFlow)
    const authState = useRecoilValue(authFlow)
    const flow = useRecoilValue(contentFlow)

    const navigate = useNavigate()
    const handleVisibility = (isVisible: boolean) => setVisibility(isVisible)

    const bodyClick = (e: any) => {
        if (view === 'post') return
        navigate(`/c/${community.public_id}/p/${public_id}`)
    }

    const seen = useRecoilValue(hasSeen);

    if (!data || data === undefined || !visibility || !created_at) return null
    // if (tags && tags.some((obj: any) => filter.includes(obj?.public_id))) return null


    return (

        <div css={C.container}>
            <VisibilitySensor onChange={handleVisibility}>

                <div css={C.inner}
                    style={{ border: view === 'post' ? '2px solid #343442' : '2px solid #272732' }}
                    onClick={bodyClick}>
                    <div css={C.header}>
                        <Avatar size="medium" public_id={flow === 'global' ? community?.public_id : author?.public_id} />

                        {/* HEADER */}
                        {flow === 'community' && <div>
                            <div css={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Author
                                    title={author?.nickname}
                                    public_id={author?.public_id}
                                    community_id={community?.public_id}
                                    global_roles={global_roles}
                                />
                                <span css={{ fontSize: '14px', color: '#b9bbb3' }}><TimeAgo date={created_at} formatter={formatTime} /></span>
                            </div>

                            <div css={{ display: 'flex', alignItems: 'center', gap: '4px', height: '20px' }}>
                                {community_roles && <LiveRoles value={community_roles} />}
                                {tags && <LiveTags value={tags} />}
                            </div>
                        </div>}


                        {flow !== 'community' && <div>
                            <div>
                                <div css={{ display: 'flex', gap: '4px', alignItems: 'baseline' }}>
                                    <CommunityTitle title={community?.title} public_id={community?.public_id} />

                                    <span css={{ fontSize: '14px', color: '#b9bbb3' }}><TimeAgo date={created_at} formatter={formatTime} /></span>

                                </div>
                                <div css={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <Nickname title={author?.nickname} public_id={author?.public_id} global_roles={global_roles} />
                                    {community_roles && <LiveRoles value={community_roles} />}
                                    {tags && <LiveTags value={tags} />}
                                </div>
                            </div>


                        </div>}

                        {authState !== 'guest' && <PostMenu
                            tags={tags}
                            person_id={author?.public_id}
                            post_id={public_id}
                            community_id={community?.public_id}
                            global_roles={global_roles}
                            community_roles={community_roles} />}
                    </div>

                    {!(tags && tags.some((obj: any) => filter.includes(obj?.public_id))) && <>
                        <div css={[textBold('x'), (view === 'list' && seen(public_id)) && { color: '#b9b6ba !important' }]}>{title && title}</div>
                        <ContentLoader type={type} content={content} public_id={public_id} />
                        <div css={C.footer} onClick={(e) => e.stopPropagation()}>
                            <LiveVotes vote={vote} karma={karma} public_id={public_id} type='post' />
                            <LiveViews value={views} />
                            <LiveComments value={comments} />
                        </div>
                    </>}

                </div>
            </VisibilitySensor>
        </div>

    )
}


export default memo(Post)


