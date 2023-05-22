/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import theme from 'Global/Theme'
import { useNavigate } from 'react-router-dom'
import { socketRequest } from 'Service/Socket'
import Avatar from '../Avatar/Avatar'
import { textBold, textNormal } from 'Global/Mixins'
import { MenuItem } from '@mui/material'

const C = {
    container: css({
        width: '300px',
        paddingBottom: '8px',
        background: "#0f0e10    ",
        borderRadius: '16px',
        position: 'relative',
        boxShadow:
            '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
    }),
    banner: css({
        height: '80px',
        borderTopRightRadius: '16px',
        borderTopLeftRadius: '16px',
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
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        justifyContent: 'center',
    }),
    menu: css({
        background: theme.background.tri,
        borderRadius: '8px',
        color: "#dbdee1 !important",
        margin: '12px',
        display: 'flex',
        flexDirection: 'column',
    }),
}

const PersonPopup = ({ username, public_id, nickname, children }: any) => {
    const navigate = useNavigate()



    return (
        <div css={C.container}>
            <div css={C.banner}>
                <img css={C.bannerImg} src={`${process.env.REACT_APP_CLOUDFRONT}/banner/${public_id}`} />
            </div>

            <div css={C.content}>
                <Avatar public_id={public_id} size="large" />
                <div css={C.me}>
                    <div css={{
                        fontSize: "20px",
                        lineHeight: "20px",
                        fontWeight: "600",
                        color: '#f2f3f5'
                    }}>{nickname}</div>
                    <div css={{
                        fontSize: "14px",
                        lineHeight: "14px",
                        fontWeight: "600",
                        color: '#f2f3f5'
                    }}>@{username}</div>
                </div>
            </div>

            <div css={C.menu}>
                <MenuItem>Set Status</MenuItem>
                <MenuItem onClick={() => navigate('/settings')}>Settings</MenuItem>
                <MenuItem
                    css={{
                        '&:hover': {
                            background: '#da373C',
                        }
                    }}
                >Sign out</MenuItem>

            </div>
        </div>
    )
}
export default PersonPopup
