/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { lBold, lNormal, sMuted, sNormal } from 'Stories/Bits/Text/Text'
import Avatar from '../../Bits/Avatar/Avatar'

import TimeAgo from 'react-timeago'
import { formatTime } from 'Util/formatTime'

const C = {
    container: css({
        width: '100%',
        display: 'flex',
        paddingTop: '16px',
        // border: '1px solid red',
        // marginTop: '18px',
        // padding: '4px 0px 2px 0px',
        // transform: `rotate(180deg)`,


    }),
    content: css({
        display: 'flex',

        flexDirection: 'column',
        color: '#dbdee1',
    }),
    header: css({
        display: 'flex',
        gap: '4px',
        alignItems: 'baseline',
        height: '20px',
    }),
    name: css({
        fontSize: '16px',
        color: '#f2f3f5',
        fontWeight: 500,
        lineHeight: '20px',

    }),
    left: css({
        width: '72px',
        display: 'flex',
        justifyContent: 'center',
    }),
    time: css({
        marginLeft: '4px',
        fontSize: '12px',
        color: '#b9bbbe',
        fontWeight: 400,
        lineHeight: '20px',

    }),
}

const Message = ({ props }: any) => {

    if (!props) return null

    return (
        <div css={C.container} key={props.public_id}>

            <div css={C.left}>
                <Avatar public_id={props.author.public_id} size="medium" />
            </div>

            <div css={C.content}>

                <div css={C.header}>
                    <div css={C.name}>{props.author.nickname}</div>
                    <span css={{ fontSize: '12px', color: '#b9bbb3' }}>• <TimeAgo date={props.created_at}  /></span>

                    {/* <div css={C.time}> {formatDistance(parseISO(props.created_at), new Date(), { addSuffix: true })}</div> */}
                </div>

                <div>{props.content}</div>
            </div>
        </div>
    )
}

export default Message
