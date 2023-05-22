/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { Menu } from '@mui/material'
import theme from 'Global/Theme'
import { useState } from 'react'
import PersonPopup from 'Stories/Bits/PersonPopup/PersonPopup'
import Avatar from '../../Bits/Avatar/Avatar'
import { useNavigate } from 'react-router-dom'
import { textBold, textLight } from 'Global/Mixins'

const C = {
    container: css({
        height: '56px',
        width: '100%',
        maxWidth: '250px',
        overflow: 'hidden',
        display: 'flex',
        background: theme.background.tri,
        borderRadius: '8px',
        justifyContent: 'space-between',
        paddingLeft: '8px',
        paddingRight: '8px',
        alignItems: 'center',
    }),

    content: css({
        width: 'calc(100% - 56px)',
        gap: '8px',
        padding: '8px',
        alignItems: 'center',
        overflow: 'hidden',
        maxHeight: '80px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    }),
    roles: css({
        display: 'flex',
    }),
    status: css({
        background: '#66bb6a',
        borderRadius: '8px',
        width: '4px',
        marginRight: '4px',
        marginLeft: '4px',
        height: '28px',
    }),
    list: css({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    }),
}

const Person = ({ username, nickname, roles, route, public_id, status }: Props) => {
    const nagivate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: any) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)



    return (
        <>
            <div id="person" css={C.container} onClick={handleClick}>

                <Avatar public_id={public_id} size="medium" />

                <div css={C.content}>
                    <div css={textBold('m')}>{nickname}</div>
                    <div css={textLight('t')}>@{username}</div>
                </div>

                {status && <div css={C.status} />}
            </div>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                sx={{
                    borderRadius: '8px !important',
                    padding: '0px !important',
                    '.MuiMenu-list': {
                        borderRadius: '8px !important',
                        padding: '0px !important',
                    },
                    '	.MuiMenu-paper': {
                        borderRadius: '8px !important',
                        padding: '0px !important',
                    },
                }}
            >
                <PersonPopup username={username} nickname={nickname} public_id={public_id}>
               


               
                </PersonPopup>
            </Menu>
        </>
    )
}

export default Person

interface Props {
    username: string
    nickname: string
    public_id: number
    roles?: []
    route?: string
    status?: 'active' | 'offline'
}
