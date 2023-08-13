

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import AddComment from './AddComment'

//icons
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';



import ContentLoader from '../ContentLoader/ContentLoader'

// @ts-ignore
import TimeAgo from 'react-timeago'

import { faFolder, faFolderOpen, faReplyAll } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useIsMuted from '@/hooks/useIsMuted'
import LiveRoles from '@/components/bits/Alive/LiveRoles'
import LiveTags from '@/components/bits/Alive/LiveTags'
import LiveVotes from '@/components/bits/Alive/LiveVotes'
import { iconButton } from '@/global/mixins'
import { filterFlow, authFlow } from '@/state/flow'
import { formatTime } from '@/utils/formatTime'
import { useRecoilValue, useRecoilState } from 'recoil'
import Nickname from '../Titles/Nickname'
import { layoutSize } from '@/state/layout';
import { commentSync, pathExistsSelector, pathSelector } from '@/state/sync';
import Avatar from '@/components/bits/Avatar';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { bg_1, bg_3, bg_4, text_2 } from '@/global/var';
import CommentMenu from '@/components/menu/CommentMenu';

const C = {
    container: css({
        width: '100%',
        background: bg_3,
        padding: '0px 8px',
    }),
    inner: css({
        display: 'flex',
    }),
    comment: css({
        marginTop: '8px',
        marginBottom: '8px',
        width: '100%',
    }),
    header: css({
        display: 'flex',
        gap: '8px',
        height: '36px',
    }),
    spacer: css({
        height: 'calc(100% + 20px)',

        width: '4px !important',
        minWidth: '4px !important',
        maxWidth: '4px !important',

        borderRadius: '8px',
        marginRight: '14px',
        marginLeft: '15px',
        background: '#52555d',
        alignSelf: 'stretch',
        position: 'relative',
        top: '-20px',
        cursor: 'pointer',
        zIndex: 5,


    }),
    spacerMobile: css({
        height: '100%',
        width: '2px !important',
        minWidth: '2px !important',
        maxWidth: '2px !important',
        borderRadius: '8px',
        marginRight: '4px',
        marginLeft: '0px',
        background: '#52555d',
        position: 'relative',
        zIndex: 5,
    }),
    defaultSpacer: css({
        zIndex: 1,
        marginLeft: '15px',
        marginRight: '22px',
        borderRadius: '8px',
        width: '4px !important',
        minWidth: '4px !important',
        maxWidth: '4px !important',
        background: '#52555d',
        cursor: 'pointer',

    }),
    float: css({
        marginTop: '12px',
        overflow: 'hidden',
        background: bg_4,
        borderRadius: '8px',
        width: 'min-content',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        zIndex: 10,
        position: 'relative',
        padding: '0px 2px',
    }),
    left: css({
        display: 'flex',
        flexDirection: 'column',
        width: '32px',
        marginRight: '8px',
    }),
    headComment: css({
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
        marginTop: '8px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.9), 0 0px 2px',
    }),
    tailComment: css({
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        paddingBottom: '8px',
    }),
    spacers: css({
        display: 'flex',
    }),
    action: css({
        width: '32px',
        borderRadius: '8px',
        minWidth: '20px',
        height: '32px',
    }),
    divider: css({
        borderRight: '1px solid #272732',
        height: '100%',
    }),
}






const colors: any = {
    0: '#6f38be',
    1: '#4c5ad0',
    2: '#63be28',
    3: '#a6be28',
    4: '#be8428',
    5: '#be3d28',
    6: '#6f38be',
    7: '#4c5ad0',
    8: '#63be28',
    9: '#be8428',
    10: '#be2828',
}

const Comment = (props: any) => {

    const isMuted = useIsMuted(props?.community?.public_id)

    const { vote, tags, community_roles, global_roles, visibility, author, content, created_at, depth, karma, last, path, public_id, sort_path, updated_at, active, id, hasChildren, }: any = useRecoilValue(commentSync(props.public_id))

    const params = useParams()
    const [showReply, setShowReply] = useState(false)
    const filter = useRecoilValue(filterFlow)
    const layout = useRecoilValue(layoutSize)
    const auth = useRecoilValue(authFlow)

    const [paths, setPaths] = useRecoilState(pathSelector);
    const doesPathExist = useRecoilValue(pathExistsSelector);
    const status = doesPathExist(path);

    const handleReply = () => setShowReply(!showReply)

    const handleSpacer = (e: any) => {
        let parts = path.split('.')
        if (!hasChildren && (parts.length === Number(e.currentTarget.dataset.key) + 2)) return
        parts = parts.slice(0, Number(e.currentTarget.dataset.key) + 2)
        setPaths(parts.join('.'))
    }

    const handleButton = (e: any) => setPaths(path)


    // // NO RENDERS
    if (status === 'invisible' || !public_id || !visibility) return null


    // SPACERS
    const spacers = []
    for (var i = 0; i < depth - 2; i++) {
        if (layout === 'desktop') spacers.push(<div onClick={handleSpacer} data-key={i} css={C.spacer} key={i} style={{ background: colors[i] }} />)
        else spacers.push(<div css={C.spacerMobile} key={i} style={{ background: colors[i] }} />)
    }


    return (
        <div css={C.container}>
            <div css={C.inner}>

                <div css={C.spacers}>{spacers}</div>

                <div css={[C.comment, { marginLeft: layout === 'mobile' ? '6px' : '0px' }]}>

                    <div style={{ marginBottom: layout === 'mobile' ? '8px' : '0px' }} css={C.header}>

                        <Avatar public_id={author.public_id} size={'small'} />

                        <div css={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Nickname title={author?.nickname} public_id={author?.public_id} global_roles={global_roles} created_at={created_at} />
                            {(community_roles || tags) &&
                                <div css={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {community_roles && <LiveRoles value={community_roles} />}
                                    {tags && <LiveTags value={tags} />}
                                </div>}
                        </div>



                        {(auth !== 'guest' &&
                            props?.community?.public_id &&
                            author?.public_id
                        ) && <CommentMenu
                                community_id={props.community.public_id}
                                person_id={author.public_id}
                                tags={tags}
                                comment_id={public_id}
                                global_roles={global_roles} 
                                community_roles={community_roles} />}




                    </div>

                    <div css={{ display: 'flex', marginTop: '8px' }}>

                        {layout === 'desktop' && <div onClick={handleSpacer} data-key={depth - 2} css={C.defaultSpacer} style={{ background: colors[depth - 2] }} />}

                        <div style={{ color: text_2 }} >

                            {!(tags && tags.some((obj: any) => filter.includes(obj.public_id))) && <ReactMarkdown className='text' children={content} rehypePlugins={[rehypeRaw]}></ReactMarkdown>}

                            <div css={C.float}>

                                {hasChildren && <div css={[iconButton, { borderRight: '1px solid #272732' }]} onClick={handleButton}>
                                    {status === 'active' ?
                                        <FontAwesomeIcon icon={faFolder} size='sm' color='#d15c7a' /> :
                                        <FontAwesomeIcon icon={faFolderOpen} size='sm' />}
                                </div>}

                                <LiveVotes size='small' vote={vote} karma={karma} public_id={public_id} type='comment' />
                                {depth < 10 && <>
                                    <div
                                        css={[iconButton, { borderLeft: '1px solid #272732' }]}
                                        onClick={handleReply}>
                                        <FontAwesomeIcon icon={faReplyAll} />
                                    </div>
                                </>}

                            </div>

                        </div>



                    </div>

                </div>
            </div>

            {showReply &&
                <div css={{ padding: '12px 0px', background: bg_3, zIndex: 100, position: 'relative' }}>
                    <AddComment isMuted={isMuted} parent_id={public_id} post_id={params.post_id} onClose={handleReply} />
                </div>}



        </div>
    )
}

export default Comment



