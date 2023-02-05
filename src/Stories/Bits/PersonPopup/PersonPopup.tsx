/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button } from '@mui/material'
import theme from 'Global/Theme'
import { useNavigate } from 'react-router-dom'
import { socketRequest } from 'Service/Socket'
import Chip from 'Stories/Objects/Chip/Chip'
import { lBold, mMuted, mutedBold } from 'Stories/Bits/Text/Text'
import Avatar from '../Avatar/Avatar'

const C = {
    container: css({
        width: '300px',
        minHeight: '360px',
        background: theme.background.sec,
        borderRadius: '8px',
        position: 'relative',
        boxShadow:
            '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
    }),
    banner: css({
        height: '80px',
        borderTopRightRadius: '8px',
        borderTopLeftRadius: '8px',
        width: '100%',
        background: '#9147ff',
    }),
    bannerImg: css({
        height: '80px',
        borderTopRightRadius: '8px',
        borderTopLeftRadius: '8px',
        width: '100%',
    }),
    content: css({
        margin: '12px',
        borderRadius: '8px',
        background: theme.background.tri,
        display: 'flex',
        gap: '8px',
        padding: '8px',
        alignItems: 'center',
    }),
    me: css({
        // lineBreak:'strict',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    }),
}

const PersonPopup = ({ username, public_id, nickname,children }: any) => {
    const navigate = useNavigate()

    const handleClick = async () => {
        console.log('click')

        let req: any = await socketRequest('new-messenger', { person: public_id })
        console.log(req)

        if (req.status === 'ok') {
            navigate(`m/${req.messenger.public_id}`)
        }
    }

    return (
        <div css={C.container}>
            <div css={C.banner}>
                <img css={C.bannerImg} src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${public_id}.png`} />
            </div>

            <div css={C.content}>
                <Avatar public_id={public_id} size="large" />

                <div css={C.me}>
                    <div css={lBold}>{nickname}</div>
                    <div css={mMuted}>@{username}</div>
                    <Chip title={'user'} color={'#66bb6a'}></Chip>
                </div>
            </div>

            <div css={C.content}>

            {children}

                {/* <Button variant="outlined" fullWidth onClick={handleClick}>
                    Start Chat
                </Button> */}
            </div>
        </div>
    )
}
export default PersonPopup
