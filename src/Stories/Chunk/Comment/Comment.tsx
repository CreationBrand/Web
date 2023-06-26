

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button, } from '@mui/material'
import LiveRoles from 'Stories/Alive/LiveRoles'
import ReplyAllRoundedIcon from '@mui/icons-material/ReplyAllRounded'
import { useRecoilState, useRecoilValue } from 'recoil'
import { layoutSizeData } from 'State/Data'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Avatar from 'Stories/Bits/Avatar/Avatar'
import AddComment from './AddComment'

//icons
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';

import { textBold, textLight, time } from 'Global/Mixins'
import LiveTags from '../../Alive/LiveTags'
import Nickname from 'Stories/Bits/Titles/Nickname'
import LiveVotes from 'Stories/Alive/LiveVotes'
import RightMenu from 'Stories/Bits/RightMenu/RightMenu'
import { authFlow, filterFlow } from 'State/Flow'
import useLiveData from 'Hooks/useLiveData'
import useCommentLive from './useCommentLive'
import { pathExistsSelector, pathSelector } from 'State/commentAtoms'
import ContentLoader from '../ContentLoader/ContentLoader'

// @ts-ignore
import TimeAgo from 'react-timeago'
import { formatTime } from 'Util/formatTime'
import CommentMenu from 'Stories/Menu/CommentMenu'
import useIsMuted from 'Hooks/Util/useIsMuted'

const C = {
    container: css({
        width: '100%',
        background: '#272732',
        padding: '0px 8px',


        '&::last-of-type': {
            marginBottom: '8px',
        }

    }),
    inner: css({
        // width: '100%',
        // maxWidth: '800px',
        // margin: '0 auto',
        // padding: '0px 8px',
        display: 'flex',


    }),
    header: css({
        marginTop: '12px',
        display: 'flex',
        gap: '8px',
        height: '36px',
    }),
    comment: css({
        width: '100%',
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
        overflow: 'hidden',

        marginBottom: '8px',
        background: '#3b3b4b',
        borderRadius: '8px',
        width: 'min-content',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        zIndex: 10,

        position: 'relative',
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
        width: '1.5px',
        minWidth: '1.5px',
        borderRadius: '8px',
        height: '100%',
        background: '#272732',
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


    const [inView, setVisibility] = useState(false)
    const isMuted = useIsMuted(props?.community?.public_id)

    const [vote, tags, community_roles, global_roles, visibility, author, content, created_at,
        depth, karma, last, path, public_id, sort_path, updated_at, active, id, hasChildren,
    ] = useCommentLive(true, props)

    const params = useParams()
    const [showReply, setShowReply] = useState(false)
    const filter = useRecoilValue(filterFlow)
    const layoutState = useRecoilValue(layoutSizeData)
    const authState = useRecoilValue(authFlow)

    const [paths, setPaths] = useRecoilState(pathSelector);
    const doesPathExist = useRecoilValue(pathExistsSelector);
    const status = doesPathExist(path);

    const handleVisibility = (isVisible: boolean) => setVisibility(isVisible)
    const handleReply = () => setShowReply(!showReply)
    const handleSpacer = (e: any) => {
        let parts = path.split('.')
        if (!hasChildren && (parts.length === Number(e.currentTarget.dataset.key) + 2)) return
        parts = parts.slice(0, Number(e.currentTarget.dataset.key) + 2)
        setPaths(parts.join('.'))
    }

    const handleButton = (e: any) => setPaths(path)


    // NO RENDERS
    if (status === 'invisible' || !public_id) return null
    else if (!visibility) return null

    // SPACERS
    const spacers = []
    for (var i = 0; i < depth - 2; i++) {
        if (layoutState === 'desktop') spacers.push(<div onClick={handleSpacer} data-key={i} css={C.spacer} key={i} style={{ background: colors[i] }} />)
        else spacers.push(<div css={C.spacerMobile} key={i} style={{ background: colors[i] }} />)
    }

    return (
        <div key={public_id} css={[C.container]} id="comment">

            <div css={C.inner}>


                <div css={C.spacers}>{spacers}</div>

                <div css={[C.comment, { marginLeft: layoutState === 'mobile' ? '4px' : '0px' }]}>

                    <div style={{ marginBottom: layoutState === 'mobile' ? '8px' : '0px' }} css={C.header}>

                        <Avatar public_id={author.public_id} size={'small'} />

                        <div css={{ height: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>

                            <div css={{ display: 'flex', alignItems: 'center', gap: '4px', lineHeight: '14px' }}>
                                <Nickname title={author?.nickname} public_id={author?.public_id} global_roles={global_roles} />
                                <span css={time}><TimeAgo date={created_at} formatter={formatTime} /></span>
                            </div>

                            {(community_roles || tags) &&
                                <div css={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    {community_roles && <LiveRoles value={community_roles} />}
                                    {tags && <LiveTags value={tags} />}
                                </div>}

                        </div>






                        {(authState !== 'guest' &&
                            props?.community?.public_id &&
                            author?.public_id
                        ) && <CommentMenu
                                community_id={props.community.public_id}
                                person_id={author.public_id}
                                tags={tags}
                                comment_id={public_id}
                                global_roles={global_roles} c
                                community_roles={community_roles} />}

                    </div>

                    <div css={{ display: 'flex', marginTop: '8px' }}>

                        {layoutState === 'desktop' && <div onClick={handleSpacer} data-key={depth - 2} css={C.defaultSpacer} style={{ background: colors[depth - 2] }} />}

                        <div>

                            {!(tags && tags.some((obj: any) => filter.includes(obj.public_id))) && <div css={{ marginBottom: '16px', }}>
                                <ContentLoader type='text' content={content} />
                            </div>}

                            <div css={C.float}>

                                {hasChildren && <>
                                    <Button
                                        onClick={handleButton}
                                        css={C.action}
                                        variant="text"
                                        color="secondary"
                                        size="large"
                                    >
                                        {status === 'active' ?
                                            <AddBoxOutlinedIcon sx={{ fontSize: '16px' }} /> :
                                            <IndeterminateCheckBoxOutlinedIcon sx={{ fontSize: '16px' }} />
                                        }
                                    </Button>
                                    <div css={C.divider} />
                                </>}

                                <LiveVotes size='small' vote={vote} karma={karma} public_id={public_id} type='comment' />
                                {depth < 10 && <>
                                    <div css={C.divider} />

                                    <Button
                                        onClick={handleReply}
                                        variant="text"
                                        size="small"
                                        color="secondary"
                                        sx={{ gap: '8px', fontSize: '16px' }}                                    >
                                        <ReplyAllRoundedIcon fontSize="inherit" />
                                        <div css={[textBold('t'), {
                                            color: '#b9bbbe',
                                        }]}>Reply</div>
                                    </Button>
                                </>}

                            </div>

                        </div>

                    </div>

                </div>




            </div>

            {showReply &&
                <div css={{ padding: '12px 0px', maxWidth: '800px', margin: '0 auto', background: '#272732', zIndex: 100, position: 'relative' }}>
                    <AddComment isMuted={isMuted} parent_id={public_id} post_id={params.post_id} onClose={handleReply} />
                </div>}

        </div>

        // </div>



    )
}

export default Comment



