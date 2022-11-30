/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { socketRequest } from 'Service/Socket'
import { lBold, mutedBold } from 'Stories/Text/Text'

const C = {
    container: css({
        width: '300px',
        minHeight: '360px',
        background: '#0e0e10',
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
    icon: css({
        height: '60px',
        width: '60px',
        borderRadius: '8px',
        background: '#0e0e10',
        overflow: 'hidden',
    }),
    bannerImg: css({
        height: '80px',
        borderTopRightRadius: '8px',
        borderTopLeftRadius: '8px',
        width: '100%',
        // objectFit: 'fill',
    }),
    image: css({
        height: '60px',
        width: '60px',
        objectFit: 'cover',
    }),
    content: css({
        margin: '12px',
        borderRadius: '8px',
        background: '#2f3136',
        display: 'flex',
        gap: '8px',
        padding: '8px',
        alignItems: 'center',
    }),
}

const PersonPopup = ({ username, public_id, nickname }: any) => {
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
                <div css={C.icon}>
                    <img css={C.image} src={`${process.env.REACT_APP_CLOUDFRONT}/avatar/${public_id}.png`}></img>
                </div>

                <div>
                    <div css={lBold}>{nickname}</div>
                    <div css={mutedBold}>@{username}</div>
                </div>
            </div>

            <div css={C.content}>
                <Button variant="outlined" fullWidth onClick={handleClick}>
                    Start Chat
                </Button>
            </div>
        </div>
    )
}
export default PersonPopup
