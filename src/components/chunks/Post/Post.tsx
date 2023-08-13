/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Link, useNavigate } from 'react-router-dom'
import { memo } from 'react'
import { useRecoilValue } from 'recoil'

import { postSync } from '@/state/sync'
import { filterFlow, authFlow, contentFlow } from '@/state/flow'
import Avatar from '@/components/bits/Avatar'
import CommunityTitle from '@/components/chunks/Titles/CommunityTitle'
import Nickname from '../Titles/Nickname'
import ContentLoader from '../ContentLoader/ContentLoader'
import LiveVotes from '@/components/bits/Alive/LiveVotes'
import LiveViews from '@/components/bits/Alive/LiveViews'
import LiveComments from '@/components/bits/Alive/LiveComments'
import LiveTags from '@/components/bits/Alive/LiveTags'
import { layoutSize } from '@/state/layout'
import { bg_1, bg_2, bg_3, bg_4, bg_active, bg_hover, bg_post, text_1, text_2, text_3 } from '@/global/var'
import { postStyle } from '@/state/filters'
import PreviewLoader from '../ContentLoader/PreviewLoader'
import PostMenu from '@/components/menu/PostMenu'
import { time } from '@/global/mixins'
import { formatTime } from '@/utils/formatTime'
// @ts-ignore
import TimeAgo from 'react-timeago'
import { motion } from 'framer-motion'
import LiveRoles from '@/components/bits/Alive/LiveRoles'
import { block } from '@/utils/stopPropagation'

// const C = {
//     container: css({
//         background: bg_3,
//         display: 'flex',
//         flexDirection: 'column',
//         // marginTop: '12px',
//         gap: '8px',
//         padding: '8px',
//         borderRadius: '12px',
//     }),
//     head: css({
//         display: 'flex',
//         gap: '8px',
//         height: '40px',
//     }),
//     footer: css({
//         display: 'flex',
//         width: 'min-content',
//         gap: '8px',
//     }),
//     title: css({
//         all: 'unset',
//         color: '#f2f4f5',
//         fontSize: '18px',
//         lineHeight: '24px',
//         fontWeight: '600',
//     }),
// }


// const Post = ({ view, ...props }: any) => {

//     // proxing data
//     const data: any = useRecoilValue(postSync(props.public_id))
//     const { visibility, public_id, title, content, created_at, author, community, vote, karma, views, comments, tags, type, community_roles, global_roles } = data

//     const navigate = useNavigate();
//     const filter = useRecoilValue(filterFlow)
//     const authState = useRecoilValue(authFlow)

//     const flow: any = useRecoilValue(contentFlow)

//     const layout = useRecoilValue(layoutSize)
//     const style = useRecoilValue(postStyle)

//     const handleClick = (e: any) => {
//         if (view !== 'list') return
//         navigate(`/c/${community.public_id}/p/${public_id}`)
//     }

//     if (!data || data === undefined || !visibility || !created_at) return null

//     return (
//         <div css={C.container} onClick={handleClick} style={{
//             marginTop: layout === 'mobile' ? '8px' : '12px',
//             borderRadius: layout === 'mobile' ? '8px' : '12px',
//         }}>
//             <div css={C.head}>
//                 <Avatar size="medium" public_id={community?.public_id} />
//                 <div css={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', }}>
//                     <CommunityTitle title={community?.title} public_id={community?.public_id} created_at={created_at} />
//                     <div css={{ display: 'flex', gap: '6px', height: '18px' }}>
//                         <Nickname title={author?.nickname} public_id={author?.public_id} global_roles={global_roles} />
//                         {tags && <LiveTags value={tags} />}
//                     </div>
//                 </div>


// {authState !== 'guest' && <PostMenu
//     tags={tags}
//     person_id={author?.public_id}
//     post_id={public_id}
//     community_id={community?.public_id}
//     global_roles={global_roles}
//     community_roles={community_roles} />}


//             </div>


//             {(tags && tags.some((obj: any) => filter.includes(obj?.public_id))) ? null : style === 'CARD' || view === 'post' ?


//                 <><div
//                     style={{ fontSize: layout === 'desktop' ? '32px' : '18px' }}
//                     css={C.title}>{title}</div>
//                     <ContentLoader view={view} type={type} content={content} public_id={public_id} />

//                     <div css={C.footer} onClick={(e: any) => { e.preventDefault(); e.stopPropagation() }}>
//                         <LiveVotes vote={vote} karma={karma} public_id={public_id} type='post' />
//                         <LiveViews value={views} />
//                         <LiveComments value={comments} />
//                     </div>
//                 </> :



//                 <div css={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <div css={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'space-between', overflow: 'hidden' }}>
//                         <div css={C.title}
//                             style={{ fontSize: layout === 'desktop' ? '18px' : '18px' }}
//                         >{title}</div>
// <div css={C.footer} onClick={(e: any) => { e.preventDefault(); e.stopPropagation() }}>
//     <LiveVotes vote={vote} karma={karma} public_id={public_id} type='post' />
//     <LiveViews value={views} />
//     <LiveComments value={comments} />
// </div>
//                     </div>
//                     <PreviewLoader view={view} type={type} content={content} public_id={public_id} />
//                 </div>
//             }

//         </div>
//     )
// }










const C = {
    container: css({
        background: bg_3,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '8px',
        borderRadius: '12px',
    }),
    head: css({
        display: 'flex',
        gap: '8px',
        height: '40px',
    }),
    footer: css({
        display: 'flex',
        gap: '8px',
        alignItems: 'center',
    }),
    title: css({
        all: 'unset',
        color: '#f2f4f5',
        fontSize: '18px',
        lineHeight: '24px',
        fontWeight: '600',
    }),
    desktopCard: css({
        marginTop: '12px',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        background: bg_3,
        borderRadius: '12px',
    }),
    mobileCard: css({
        padding: '8px 8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        background: bg_2,
    }),
}


const Post = ({ view, ...props }: any) => {

    // proxing data
    const data: any = useRecoilValue(postSync(props.public_id))
    const { visibility, public_id, title, content, created_at, author, community, vote, karma, views, comments, tags, type, community_roles, global_roles } = data
    const navigate = useNavigate();

    const filter = useRecoilValue(filterFlow)
    const authState = useRecoilValue(authFlow)

    const layout = useRecoilValue(layoutSize)
    const style = useRecoilValue(postStyle)

    const handleClick = (e: any) => {
        if (view === 'post') return
        navigate(`/c/${community.public_id}/p/${public_id}`)
    }

    if (!data || data === undefined || !visibility || !created_at) return null

    else if (layout === 'desktop' && style === 'CARD' && ['global', 'community', 'person'].includes(view)) {
        return <div css={C.desktopCard} onClick={handleClick}>


            <div css={C.head}>

                <Avatar size="medium" public_id={community?.public_id} />
                <div css={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', }}>
                    <CommunityTitle title={community?.title} public_id={community?.public_id} created_at={created_at} />
                    <div css={{ display: 'flex', gap: '6px', height: '18px' }}>
                        <Nickname title={author?.nickname} public_id={author?.public_id} global_roles={global_roles} />
                        {tags && <LiveTags value={tags} />}
                    </div>
                </div>

                {authState !== 'guest' && <PostMenu
                    tags={tags}
                    person_id={author?.public_id}
                    post_id={public_id}
                    community_id={community?.public_id}
                    global_roles={global_roles}
                    community_roles={community_roles} />}
            </div>


            <div css={{ fontSize: '1.125rem', lineHeight: '1.5rem', color: text_1, fontWeight: '600' }}>{title}</div>


            <ContentLoader view={view} type={type} content={content} public_id={public_id} />

            <div css={C.footer} onClick={(e: any) => { e.preventDefault(); e.stopPropagation() }}>
                <LiveVotes vote={vote} karma={karma} public_id={public_id} type='post' />
                <LiveViews value={views} />
                <LiveComments value={comments} />
            </div>

        </div>
    }
    else if (layout === 'desktop' && style === 'CARD' && view === 'post') {
        return <div css={C.desktopCard} onClick={handleClick}>
            <div css={C.head}>
                <Avatar size="medium" public_id={community?.public_id} />
                <div css={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', }}>
                    <CommunityTitle title={community?.title} public_id={community?.public_id} created_at={created_at} />
                    <div css={{ display: 'flex', gap: '6px', height: '18px' }}>
                        <Nickname title={author?.nickname} public_id={author?.public_id} global_roles={global_roles} />
                        {tags && <LiveTags value={tags} />}
                    </div>
                </div>

                {authState !== 'guest' && <PostMenu
                    tags={tags}
                    person_id={author?.public_id}
                    post_id={public_id}
                    community_id={community?.public_id}
                    global_roles={global_roles}
                    community_roles={community_roles} />}
            </div>

            <div css={{ fontSize: '1.75rem', lineHeight: '2rem', color: text_1, fontWeight: '600' }}>{title}</div>

            <ContentLoader view={view} type={type} content={content} public_id={public_id} />

            <div css={C.footer} onClick={(e: any) => { e.preventDefault(); e.stopPropagation() }}>
                <LiveVotes vote={vote} karma={karma} public_id={public_id} type='post' />
                <LiveViews value={views} />
                <LiveComments value={comments} />
            </div>

        </div>

    }

    else if (layout === 'mobile' && style === 'CARD' && view === 'global') {

        return <>
            <Divider />

            <div css={C.mobileCard} onClick={handleClick}>

                <div css={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Avatar size="mobilePost" public_id={community?.public_id} />
                    <Link onClick={block} to={`/c/${community?.public_id}`} css={{ all: 'unset', fontSize: '0.75rem', lineHeight: '0.75rem', color: text_1, fontWeight: '600' }}>{community?.title}  <span css={time}><TimeAgo date={created_at} formatter={formatTime} /></span></Link>
                    {tags && <LiveTags value={tags} />}
                </div>


                <div css={{ fontSize: '1.25rem', lineHeight: '1.5rem', color: text_1, fontWeight: '600' }}>{title}</div>

                <ContentLoader view={view} type={type} content={content} public_id={public_id} />

                <div css={C.footer} onClick={(e: any) => { e.preventDefault(); e.stopPropagation() }}>
                    <LiveVotes vote={vote} karma={karma} public_id={public_id} type='post' />
                    <LiveViews value={views} />
                    <LiveComments value={comments} />

                    {authState !== 'guest' && <PostMenu
                        tags={tags}
                        person_id={author?.public_id}
                        post_id={public_id}
                        community_id={community?.public_id}
                        global_roles={global_roles}
                        community_roles={community_roles} />}

                </div>

            </div >
        </>
    }
    else if (layout === 'mobile' && style === 'CARD' && view === 'community') {

        return <>
            <Divider />

            <div css={C.mobileCard} onClick={handleClick}>

                <div css={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Avatar size="mobilePost" public_id={author?.public_id} />

                    <div>
                        <Link onClick={block} to={`/p/${author?.public_id}`} css={{ all: 'unset', fontSize: '0.75rem', lineHeight: '0.75rem', color: text_1, fontWeight: '600' }}>{author?.username} <span css={time}><TimeAgo date={created_at} formatter={formatTime} /></span></Link>

                        <div css={{ display: 'flex', alignItems: 'center', gap: '8px' }}> {community_roles && <LiveRoles value={community_roles} />}</div>
                    </div>

                    {tags && <LiveTags value={tags} />}
                </div>

                <div css={{ fontSize: '1.25rem', lineHeight: '1.5rem', color: text_1, fontWeight: '600' }}>{title}</div>

                <ContentLoader view={view} type={type} content={content} public_id={public_id} />

                <div css={C.footer}>
                    <LiveVotes vote={vote} karma={karma} public_id={public_id} type='post' />
                    <LiveViews value={views} />
                    <LiveComments value={comments} />


                </div>

            </div>
        </>
    }
    else if (layout === 'mobile' && style === 'CARD' && view === 'post') {

        return <><div css={C.mobileCard} onClick={handleClick}>

            <div css={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Avatar size="mobilePost" public_id={author?.public_id} />

                <div css={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                    <Link onClick={block} to={`/p/${author?.public_id} `} css={{ all: 'unset', fontSize: '0.75rem', lineHeight: '0.75rem', color: text_1, fontWeight: '600' }}>{author?.username} <span css={time}><TimeAgo date={created_at} formatter={formatTime} /></span></Link>
                    <div css={{ display: 'flex', alignItems: 'center', gap: '8px' }}> {community_roles && <LiveRoles value={community_roles} />}</div>
                </div>

                {tags && <LiveTags value={tags} />}

            </div>


            <div css={{ fontSize: '1.5rem', lineHeight: '1.75rem', color: text_1, fontWeight: '600' }}>{title}</div>


            <ContentLoader view={view} type={type} content={content} public_id={public_id} />

            <div css={C.footer} onClick={(e: any) => { e.preventDefault(); e.stopPropagation() }}>
                <LiveVotes vote={vote} karma={karma} public_id={public_id} type='post' />
                <LiveViews value={views} />
                <LiveComments value={comments} />

                {authState !== 'guest' && <PostMenu
                    tags={tags}
                    person_id={author?.public_id}
                    post_id={public_id}
                    community_id={community?.public_id}
                    global_roles={global_roles}
                    community_roles={community_roles} />}


            </div>

        </div>

        </>

    }




    else return <div css={{ height: '0.1px' }} />
}
























export default memo(Post)


const Divider = () => <div css={{
    width: 'calc(100% - 16px)',
    margin: '0 auto',
    height: '2px',
    borderRadius: '6px',
    background: bg_active,
}} />
