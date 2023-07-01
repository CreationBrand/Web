/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import Avatar from 'Stories/Bits/Avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil';
import { personData } from 'State/Data';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ReplyAllRoundedIcon from '@mui/icons-material/ReplyAllRounded';
import { time } from 'Global/Mixins';
import { formatTime } from 'Util/formatTime';
// @ts-ignore
import TimeAgo from 'react-timeago'
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';


const C = {
    container: css({
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        // gap: '8px',
        height: 'auto',
        alignItems: 'stretch',
        position: 'relative',
        marginTop: '16px',
        background: '#272732',
        borderRadius: '8px',
        padding: ' 8px',
        color: '#f2f3f5',
        cursor: 'pointer',
        // fontWeight: 600,
    }),
    left: css({
        marginRight: '8px',
    }),
    right: css({
    }),
    row: css({
        display: 'flex',
        gap: '4px',
        lineHeight: '20px',
        color: '#f2f3f5',
        alignItems: 'center',
        width: 'min-content',
        padding: '6px 8px',
        borderRadius: '8px',
        background: '#181820',
        whiteSpace: 'nowrap',
    }),
}


const Noti = (props: any) => {

    const person = useRecoilValue(personData)
    let content = JSON.parse(props.content)
    const navigate = useNavigate()

    const handleClick = () => {
        if (props.type === 'comment-reply') navigate(`/c/${props?.community?.public_id}/p/${props?.post?.public_id}/c/${props?.comment?.public_id}`)
        if (props.type === 'post-reply') navigate(`/c/${props?.community?.public_id}/p/${props?.post?.public_id}/c/${content?.comment_id}`)
        if (props.type === 'post-mention') navigate(`/c/${props?.community?.public_id}/p/${props?.post?.public_id}`)
        if (props.type === 'comment-mention') navigate(`/c/${props?.community?.public_id}/p/${props?.post?.public_id}/c/${props?.comment?.public_id}`)
    }

    return (
        <div css={C.container} onClick={handleClick} key={props.public_id}>

            <div css={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                {props?.author && <div css={C.row}>
                    <Avatar public_id={props?.author?.public_id} size='tiny' />
                    {props?.author?.nickname}
                </div>}

                {props?.type === 'post-reply' && <ReplyAllRoundedIcon sx={{ transform: 'scaleX(-1)', color: '#c6abff !important', }} />}
                {props?.type === 'comment-reply' && <ReplyAllRoundedIcon sx={{ transform: 'scaleX(-1)', color: '#c6abff !important', }} />}
                {props?.type === 'post-mention' && <div className='mention'>@{person.username}</div>}
                {props?.type === 'comment-mention' && <div className='mention'>@{person.username}</div>}

                {props?.post && <div css={C.row}>
                    & {props?.post?.title}
                </div>}

                {/* <ArrowForwardRoundedIcon /> */}
                <div style={{ fontSize: '22px' }} className='mention'>#</div>

                {props?.community && <div css={C.row}>
                    <Avatar public_id={props?.community?.public_id} size='tiny' />
                    {props?.community?.title}
                </div>}


                <div css={time}><TimeAgo date={props.created_at} formatter={formatTime} /></div>
            </div>

            {props?.content &&
                <blockquote css={{
                    borderTopLeftRadius: '2px !important',
                    borderBottomLeftRadius: '2px !important',
                    marginTop: '8px !important',
                    marginBottom: '8px !important'
                }}>
                    <ReactMarkdown children={content?.content} rehypePlugins={[rehypeRaw]}></ReactMarkdown>
                </blockquote>
            }


        </div>)
}


export default Noti





