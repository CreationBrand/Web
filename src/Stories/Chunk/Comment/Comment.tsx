/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button, Input } from '@mui/material'
import theme from 'Global/Theme'
import ArrowDropUpRoundedIcon from '@mui/icons-material/ArrowDropUpRounded'
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded'
import {
    mBold,
    mMuted,
    mNormal,
    sBold,
    sMuted,
    xsMuted
} from 'Stories/Bits/Text/Text'
import { formatDistance, formatDistanceStrict, formatDistanceToNowStrict, parseISO } from 'date-fns'
import ReplyAllRoundedIcon from '@mui/icons-material/ReplyAllRounded'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { commentListData } from 'State/Data'
import { useState } from 'react'
import { socketRequest } from 'Service/Socket'
import { useParams } from 'react-router-dom'
import { vote } from 'Helper/Action'
import CommentReply from 'Stories/MOC/CommentReply'
import Avatar from 'Stories/Bits/Avatar/Avatar'
import Vote from 'Stories/Bits/Vote/Vote'
import ContentLoader from 'Stories/Bits/ContentLoader/ContentLoader'
import TimeStamp from 'Stories/Bits/TimeStamp/TimeStamp'
import AddComment from '../AddComment/AddComment'

const C = {
    container: css({
        width: '100%',
        display: 'flex',
        // border: '1px solid green',
        // paddingBottom: '8px',
        justifyContent: 'flex-start',
    }),
    inner: css({
        // background: '#343442',
        borderRadius: '8px',
        padding: '8px 0px 0px 0px',
        height: 'auto',
        // marginBottom: '8px',

        display: 'flex',
    }),

    left: css({
        // width: '46px',
        marginRight: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    }),
    right: css({
        width: '100%'
    }),
    footer: css({
        display: 'flex',
        // justifyContent: 'flex-end',
        marginTop: '4px',
        width: '100%'
    }),

    icon: css({
        height: '40px',
        width: '40px',
        borderRadius: '8px',
        background: '#0e0e10',
        overflow: 'hidden'
    }),

    title: css({
        padding: '6px 0px 8px 0',
        // fontWeight: '400'
    }),
    row: css({
        display: 'flex',
        gap: '4px',
    }),

    action: css({
        width: '25px',
        borderRadius: '8px',
        marginRight: '4px',
        marginLeft: '4px',
        minWidth: '20px',
        height: '25px'
    }),
    vote: css({
        display: 'flex',
        // background: theme.background.tri,
        flexDirection: 'row',
        borderRadius: '8px',
        // width: '40px',
        alignItems: 'center'
    }),
    thread: css({
        minWidth: '2px',
        width: '2px',
        maxWidth: '2px',
        margin: '0px 14px 0px 15px',
        background: '#bcbdbe',
        height: '101%',
        '&:last-child': {

        },
    }),
    threads: css({

        display: 'flex',
       
    }),
    bar: css({
        background: '#272732',
        borderRadius: '8px',
        height: '32px',
        display: 'flex',
    }),
    defaultThread: css({
        minWidth: '2px',
        width: '2px',
        maxWidth: '2px',
        margin: '0px 0px 0px 15px',
        background: '#bcbdbe',
        // height: '100%',
        height: 'calc(100% - 32px)',
        borderRadius: '8px',
    }),
}

const Comment = ({
    varient,
    public_id,
    author,
    content,
    vote,
    depth,
    karma,
    path,
    created_at,
    updated_at,
}: any) => {

    const params = useParams()
    const [showReply, setShowReply] = useState(false)

    const handleUp = (e: any) => {
        e.preventDefault()
        e.stopPropagation()
        vote(1, 'comment', public_id)
    }
    const handleDown = (e: any) => {
        e.stopPropagation()
        e.preventDefault()
        vote(-1, 'comment', public_id)
    }

    const handleReply = () => setShowReply(!showReply)

    const threads = []
    for (var i = 0; i < depth - 2; i++) {
        threads.push(<div css={C.thread} />)
    }

console.log(depth)
    return (
        <div id="comment" css={C.container} key={public_id}>

            {depth > 2 && <div id="threads" css={C.threads}>
                {threads}
            </div>}

            <div css={C.inner}>

                <div css={C.left}>
                    <Avatar public_id={author.public_id} size={'small'} />
                    <div css={C.defaultThread} />
                </div>

                <div css={C.right}>

                    <div css={C.row}>
                        <div css={[sBold, C.title]}>{author.nickname}</div>
                        <div css={[xsMuted, C.title]}>
                            ·  {' '}
                            {formatDistanceStrict(parseISO(created_at), new Date(), {
                                addSuffix: true
                            })}</div>
                    </div>
                    <ContentLoader type='text' content={content} />


                    <div css={C.footer}>

                        <div css={C.bar}>

                            <div css={C.vote}>
                                <Button
                                    onClick={handleUp}
                                    css={C.action}
                                    variant="text"
                                    color="secondary"
                                    size="small"
                                >
                                    <ArrowDropUpRoundedIcon
                                        fontSize="small"
                                        htmlColor={vote === 1 ? 'green' : ''}
                                    />
                                </Button>
                                <div css={mMuted}> {karma} </div>
                                <Button
                                    onClick={handleDown}
                                    css={C.action}
                                    variant="text"
                                    color="secondary"
                                    size="small"
                                >
                                    <ArrowDropDownRoundedIcon
                                        htmlColor={vote === -1 ? 'red' : ''}
                                        fontSize="small"
                                    />
                                </Button>
                            </div>


                            <Button
                                onClick={handleReply}
                                variant="text"
                                size="small"
                                color="secondary"
                                sx={{ gap: '8px' }}
                            >
                                <ReplyAllRoundedIcon fontSize="inherit" />
                                <div css={sMuted}>Reply</div>
                            </Button>


                        </div>




                    </div>

                    {showReply && <AddComment parent_id={public_id} post_id={params.post_id} />}
                </div>
            </div>

        </div>
    )
}

export default Comment
