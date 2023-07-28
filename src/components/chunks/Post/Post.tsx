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
import { bg_3 } from '@/global/var'
import { postStyle } from '@/state/filters'
import PreviewLoader from '../ContentLoader/PreviewLoader'
import PostMenu from '@/components/menu/PostMenu'

// @ts-ignore
import { Textfit } from 'react-textfit';


const C = {
    container: css({
        background: bg_3,
        display: 'flex',
        flexDirection: 'column',
        marginTop: '12px',
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
        width: 'min-content',
        gap: '8px',
    }),
    title: css({
        all: 'unset',
        color: '#f2f4f5',
        fontSize: '20px',
        lineHeight: '24px',
        fontWeight: 'bold',
    }),
}


const Post = ({ view, ...props }: any) => {

    // proxing data
    const data: any = useRecoilValue(postSync(props.public_id))
    const { visibility, public_id, title, content, created_at, author, community, vote, karma, views, comments, tags, type, community_roles, global_roles } = data
    const navigate = useNavigate();
    // const seen = useRecoilValue(hasSeen);
    const filter = useRecoilValue(filterFlow)
    const authState = useRecoilValue(authFlow)
    const flow: any = useRecoilValue(contentFlow)
    const layout = useRecoilValue(layoutSize)
    const style = useRecoilValue(postStyle)

    const handleClick = (e: any) => {
        if (view !== 'list') return
        navigate(`/c/${community.public_id}/p/${public_id}`)
    }

    if (!data || data === undefined || !visibility || !created_at) return null

    return (
        <div css={C.container} onClick={handleClick} style={{
            marginTop: layout === 'mobile' ? '8px' : '12px',
            borderRadius: layout === 'mobile' ? '8px' : '12px',
        }}>
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


            {(tags && tags.some((obj: any) => filter.includes(obj?.public_id))) ? null :

                style === 'CARD' || view === 'post' ?


                    <><div css={C.title}>{title}</div>
                        <ContentLoader view={view} type={type} content={content} public_id={public_id} />

                        <div css={C.footer} onClick={(e: any) => { e.preventDefault(); e.stopPropagation() }}>
                            <LiveVotes vote={vote} karma={karma} public_id={public_id} type='post' />
                            <LiveViews value={views} />
                            <LiveComments value={comments} />
                        </div>
                    </> :



                    <div css={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div css={{ display: 'flex', flexDirection: 'column', gap: '8px', justifyContent: 'space-between', overflow: 'hidden' }}>
                            <div css={C.title}
                                style={{ fontSize: layout === 'desktop' ? '20px' : '16px' }}
                            >{title}</div>
                            <div css={C.footer} onClick={(e: any) => { e.preventDefault(); e.stopPropagation() }}>
                                <LiveVotes vote={vote} karma={karma} public_id={public_id} type='post' />
                                <LiveViews value={views} />
                                <LiveComments value={comments} />
                            </div>
                        </div>
                        <PreviewLoader view={view} type={type} content={content} public_id={public_id} />
                    </div>
            }

        </div>
    )
}


export default memo(Post)


{/* <div css={C.header}>
{['global', 'person', 'search', 'group'].includes(flow) && <>
    <Avatar size="medium" public_id={community?.public_id} />
    <div css={{ maxWidth: 'calc(100% - 88px)' }}>
        <div css={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <CommunityTitle title={community?.title} public_id={community?.public_id} />
            <span css={time}><TimeAgo date={created_at} formatter={formatTime} /></span>
        </div>
        <div css={{ width: '100%', whiteSpace: 'nowrap', flexWrap: 'nowrap', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Nickname title={author?.nickname} public_id={author?.public_id} global_roles={global_roles} />
            {/* {tags && <LiveTags value={tags} />} */}
//         </div>
//     </div>
// </>}

// {['comment', 'post', 'community', 'searchCommunity'].includes(flow) && <>
//     <Avatar size="medium" public_id={author?.public_id} />
//     <div>
//         <div css={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
//             <Author title={author?.nickname} public_id={author?.public_id} community_id={community?.public_id} global_roles={global_roles} />
//             <span css={time}><TimeAgo date={created_at} formatter={formatTime} /></span>
//         </div>
//         <div css={{ display: 'flex', alignItems: 'center', gap: '4px', height: '18px' }}>
//             {/* {community_roles && <LiveRoles value={community_roles} />}
//             {tags && <LiveTags value={tags} />} */}
//         </div>
//     </div>
// </>}


{/* {authState !== 'guest' && <PostMenu
    tags={tags}
    person_id={author?.public_id}
    post_id={public_id}
    community_id={community?.public_id}
    global_roles={global_roles}
    community_roles={community_roles} />} */}
// </div>

// {!(tags && tags.some((obj: any) => filter.includes(obj?.public_id))) &&
// <section css={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//     <div css={C.title}>
//         {title && title}
//     </div>
//     {/* <ContentLoader view={view} type={type} content={content} public_id={public_id} /> */}
//     {/* <div css={C.footer} onClick={(e: any) => { e.preventDefault(); e.stopPropagation() }}>
//         <LiveVotes vote={vote} karma={karma} public_id={public_id} type='post' />
//         <LiveViews value={views} />
//         <LiveComments value={comments} />
//     </div> */}
// </section> */}