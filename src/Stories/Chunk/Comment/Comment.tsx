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
import { formatDistance, formatDistanceToNowStrict, parseISO } from 'date-fns'
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

const C = {
    container: css({
        width: '100%',
        display: 'flex',
        // border: '1px solid green',
        // paddingBottom: '8px',
        justifyContent: 'flex-start',
    }),
    inner: css({
        background: '#343442',
        borderRadius: '8px',
        padding: '8px',
        height: 'auto',
        marginBottom: '8px',

        display: 'flex',
    }),

    left: css({
        width: '56px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    }),
    right: css({
        width: '100%'
    }),
    footer: css({
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%'
    }),
    header: css({
        display: 'flex',
        marginBottom: '4px',
        gap: '4px',
        alignItems: 'center'
    }),
    icon: css({
        height: '40px',
        width: '40px',
        borderRadius: '8px',
        background: '#0e0e10',
        overflow: 'hidden'
    }),
    image: css({
        height: '40px',
        width: '40px',
        objectFit: 'cover'
    }),
    title: css({
        padding: '8px 0px',
        fontWeight: '400'
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
        margin: '0px 0px 0px 20px',
        background: '#bcbdbe',
        height: '101%',
        // flexGrow: 1,
        // flex: 1,
        // minHeight: '30px'
    }),
    threads: css({
        // flexGrow: 1,
        // flex: 1,
        display: 'flex',
        paddingRight: '20px'
    })
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

    // console.log(data)
    // const [commentList, setCommentList]: any = useRecoilState(commentListData)

    // let index = commentList.findIndex(
    //     (item: any) => item.props.data.id === data.id
    // )

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

    const handleReply = () => {
        // console.log(commentList)
        // console.log(index)

        // setCommentList(
        //     insert(commentList, index + 1, <CommentReply parent={data.id} />)
        // )
    }

    const threads = []
    for (var i = 0; i < depth - 2; i++) {
        threads.push(<div css={C.thread} />)
    }

    // let isParent = false
    // try {
    //     // console.log(commentList[index + 1].props.data.depth, data.depth)

    //     isParent = commentList[index + 1].props.data.depth > data.depth
    //     // console.log(isParent)
    // } catch { }


    return (
        <div id="comment" css={C.container} key={public_id}>
            {threads.length > 0 && (
                <div id="threads" css={C.threads}>
                    {threads}
                </div>
            )}


            <div css={C.inner}>

                <div css={C.left}>
                    <Avatar public_id={author.public_id} size={'medium'} />
                    <Vote karma={karma} />
                </div>

                <div css={C.right}>

                    <div css={sBold}>{author.nickname}</div>

                    {/* <div css={mNormal}>{content}</div> */}

                    <ContentLoader type='text' content={content} />

                    {/* 
                    <div css={C.footer}>
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
                    </div> */}
                </div>
            </div>





            {/* <div css={C.left}>


            <div css={C.right}>
                <div css={C.header}>
                    <div css={mBold}>{data.author.nickname}</div>
                    <div css={sMuted}>
                        -{' '}
                        {formatDistanceToNowStrict(parseISO(data.created_at), {
                            addSuffix: true
                        })}
                    </div>
                </div>

                <div css={mNormal}>{data.content}</div>

                <div css={C.footer}>
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
                                htmlColor={data.vote === 1 ? 'green' : ''}
                            />
                        </Button>
                        <div css={mMuted}> {data.karma} </div>
                        <Button
                            onClick={handleDown}
                            css={C.action}
                            variant="text"
                            color="secondary"
                            size="small"
                        >
                            <ArrowDropDownRoundedIcon
                                htmlColor={data.vote === -1 ? 'red' : ''}
                                fontSize="small"
                            />
                        </Button>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Comment

const insert = (arr: string | any[], index: any, newItem: any) => [
    ...arr.slice(0, index),
    newItem,
    ...arr.slice(index)
]
