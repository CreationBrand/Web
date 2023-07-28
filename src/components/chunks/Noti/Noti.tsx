/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil';

import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ReplyAllRoundedIcon from '@mui/icons-material/ReplyAllRounded';

// @ts-ignore
import TimeAgo from 'react-timeago'
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { person as personData } from '@/state/person';
import Avatar from '@/components/bits/Avatar';
import { time } from '@/global/mixins';
import { formatTime } from '@/utils/formatTime';
import { bg_2, bg_3, bg_4 } from '@/global/var';


const C = {
    container: css({
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        // gap: '8px',
        height: 'auto',
        alignItems: 'stretch',
        position: 'relative',
        marginTop: '12px',
        background: bg_3,
        borderRadius: '12px',
        padding: ' 8px',
        color: '#f2f3f5',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
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
        color: '#f2f3f5',
        alignItems: 'center',
        width: 'min-content',
        maxWidth: '100%',
        padding: '6px 8px',
        borderRadius: '12px',
        background: bg_2,
        whiteSpace: 'nowrap',
        lineHeight: '22px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
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

            <div css={C.row}>

                {props?.author && <>
                    <Avatar public_id={props?.author?.public_id} size='tiny' />
                    {props?.author?.nickname}
                </>}

                {props?.type === 'post-reply' && ' replied to your post '}
                {props?.type === 'comment-reply' && ' replied to your comment '}
                {props?.type === 'post-mention' && <div className='mention'>@ Post</div>}
                {props?.type === 'comment-mention' && <div className='mention'>@ Comment</div>}

                {props?.post && <>
                    <Avatar public_id={props?.community?.public_id} size='tiny' />
                    <span css={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        minWidth: '0px',
                    }}>
                        {props?.post?.title ? props?.post?.title : props?.community?.title}
                    </span>
                </>}

                <div css={time}><TimeAgo date={props.created_at} formatter={formatTime} /></div>

            </div>

            {props?.content &&
                <blockquote css={{
                    borderTopLeftRadius: '2px !important',
                    borderBottomLeftRadius: '2px !important',
                    marginTop: '8px !important',
                    marginBottom: '8px !important'
                }}>
                    <ReactMarkdown className='text' children={content?.content} rehypePlugins={[rehypeRaw]}></ReactMarkdown>
                </blockquote>
            }


        </div>)
}


export default Noti





