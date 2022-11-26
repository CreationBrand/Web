/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { formatDistance, parseISO } from 'date-fns'

import { lBold, lNormal, sMuted, sNormal } from 'Stories/Text/Text'
import Avatar from '../Avatar/Avatar'

const C = {
    container: css({
        width: '100%',
        display: 'flex',
        gap: '8px',
        border: '1px solid red',
        padding: '2px 48px 2px 70px',
        marginTop: '20px',
        '&:hover': {
            background: 'rgba(0,0,0,0.1)'
        }
    }),
    content: css({
        display: 'flex',
        gap: '2px',
        flexDirection: 'column'
    }),
    header: css({
        display: 'flex',
        gap: '4px',
        alignItems: 'center',     
    }),
    name: css({
        color: 'white'
    })
}

const Message = ({ props }: any) => {
    console.log(props)

    if (!props) return null
    return (
        <div css={C.container}>
            <Avatar public_id={props.author.public_id} size="medium" />

            <div css={C.content}>

                <div css={C.header}>
                    <div css={[lNormal, C.name]}>{props.author.nickname}</div>
                    <div css={sNormal}>{formatDistance(parseISO(props.created_at),new Date(),{ addSuffix: true })}</div>
                </div>

                <div css={lNormal}>{props.content}</div>
            </div>
        </div>
    )
}

export default Message
