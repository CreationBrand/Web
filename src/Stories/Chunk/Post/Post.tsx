/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import Avatar from 'Stories/Bits/Avatar/Avatar'
import ContentLoader from '../ContentLoader/ContentLoader'
import Author from "Stories/Bits/Titles/Author"
import CommunityTitle from "Stories/Bits/Titles/CommunityTitle"
import Nickname from "Stories/Bits/Titles/Nickname"
import { Link, useNavigate } from 'react-router-dom'
import { memo } from 'react'
import { useRecoilValue } from 'recoil'
import { authFlow, contentFlow, filterFlow } from 'State/Flow'
import { time } from 'Global/Mixins'
import LiveComments from 'Stories/Alive/LiveComments'
import LiveViews from 'Stories/Alive/LiveViews'
import LiveVotes from 'Stories/Alive/LiveVotes'
import LiveTags from '../../Alive/LiveTags'
import { hasSeen } from 'State/seenAtom'
import usePostLive from './usePostLive'

// @ts-ignore
import TimeAgo from 'react-timeago'
import { formatTime } from 'Util/formatTime'
import LiveRoles from 'Stories/Alive/LiveRoles'
import PostMenu from 'Stories/Menu/PostMenu'
import { block, cancel } from 'Util/stopPropagation'


const C = {
    inner: css({
        background: '#272732',
        minHeight: '56px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        marginTop: '12px',
        gap: '8px',
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
    }),
    title: css({
        all: 'unset',
        color: '#f2f4f5',
        fontSize: '24px',
        lineHeight: '25px',
        fontWeight: 600,
    }),
}


const Post = ({ view, ...props }: any) => {

    // proxing data
    const data: any = usePostLive(false, props)
    const { visibility, public_id, title, content, created_at, author, community, vote, karma, views, comments, tags, type, community_roles, global_roles } = data
    const navigate = useNavigate();
    const seen = useRecoilValue(hasSeen);
    const filter = useRecoilValue(filterFlow)
    const authState = useRecoilValue(authFlow)
    const flow: any = useRecoilValue(contentFlow)
    const bodyClick = (e: any) => { e.preventDefault(); e.stopPropagation(); navigate(`/c/${community.public_id}/p/${public_id}`) }

    if (!data || data === undefined || !visibility || !created_at) return null

    return (
        <div css={C.inner} onClick={bodyClick}>

            <div css={C.header}>
                {['global', 'person', 'search', 'group'].includes(flow) && <>
                    <Avatar size="medium" public_id={community?.public_id} />
                    <div css={{ maxWidth: 'calc(100% - 88px)' }}>
                        <div css={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                            <CommunityTitle title={community?.title} public_id={community?.public_id} />
                            <span css={time}><TimeAgo date={created_at} formatter={formatTime} /></span>
                        </div>
                        <div css={{ width: '100%', overflow: 'scroll', whiteSpace: 'nowrap', flexWrap: 'nowrap', display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <Nickname title={author?.nickname} public_id={author?.public_id} global_roles={global_roles} />
                            {tags && <LiveTags value={tags} />}
                        </div>
                    </div>
                </>}

                {['comment', 'post', 'community', 'searchCommunity'].includes(flow) && <>
                    <Avatar size="medium" public_id={author?.public_id} />
                    <div>
                        <div css={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
                            <Author title={author?.nickname} public_id={author?.public_id} community_id={community?.public_id} global_roles={global_roles} />
                            <span css={time}><TimeAgo date={created_at} formatter={formatTime} /></span>
                        </div>
                        <div css={{ display: 'flex', alignItems: 'center', gap: '4px', height: '18px' }}>
                            {community_roles && <LiveRoles value={community_roles} />}
                            {tags && <LiveTags value={tags} />}
                        </div>
                    </div>
                </>}


                {authState !== 'guest' && <PostMenu
                    tags={tags}
                    person_id={author?.public_id}
                    post_id={public_id}
                    community_id={community?.public_id}
                    global_roles={global_roles}
                    community_roles={community_roles} />}
            </div>

            {!(tags && tags.some((obj: any) => filter.includes(obj?.public_id))) &&
                <section css={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Link
                        onClick={block}
                        to={`/c/${community.public_id}/p/${public_id}`} css={[C.title, (view === 'list' && seen(public_id)) && { color: '#b9b6ba !important' }]} >
                        {title && title}
                    </Link>
                    <ContentLoader view={view} type={type} content={content} public_id={public_id} />
                    <div css={C.footer} onClick={(e: any) => { e.preventDefault(); e.stopPropagation() }}>
                        <LiveVotes vote={vote} karma={karma} public_id={public_id} type='post' />
                        <LiveViews value={views} />
                        <LiveComments value={comments} />
                    </div>
                </section>
            }

        </div>

    )
}


export default memo(Post)


