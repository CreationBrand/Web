/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Badge, Menu, MenuItem } from '@mui/material'

import theme from 'Global/Theme'
import { useState } from 'react'
import { logoutCognito } from 'Service/Auth'
import Chip from 'Stories/Objects/Chip/Chip'
import {
    bold,
    heading3,
    mutedBold,
    normal,
    smBold,
    smMuted,
    xsMuted
} from 'Stories/Text/Text'
import Avatar from '../../Bits/Avatar/Avatar'

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
        alignItems: 'center'
    }),

    content: css({
        width: 'calc(100% - 56px)',
        gap: '8px',
        padding: '8px',
        alignItems: 'center',
        overflow: 'hidden',
        maxHeight: '80px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }),
    roles: css({
        display: 'flex'
    }),
    status: css({
        background: '#66bb6a',
        borderRadius: '8px',
        width: '4px',
        marginRight: '4px',
        marginLeft: '4px',
        height: '28px'
    })
}

const Person = ({
    username,
    nickname,
    roles,
    route,
    public_id,
    status
}: Props) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: any) => setAnchorEl(event.currentTarget)

    const handleClose = () => setAnchorEl(null)

    let rolesArr = []

    for (var i in roles) {
        console.log(i)

        rolesArr.push(
            <Chip
                key={i}
                //@ts-ignore
                color={roles[i].color}
                //@ts-ignore
                title={roles[i].title}
                showBullet={false}
                clickable={false}
            />
        )
    }

    return (
        <>
            <div id="person" css={C.container} onClick={handleClick}>
                <Avatar public_id={public_id} size="medium" />

                <div css={C.content}>
                    <div css={roles ? smBold : bold}>{nickname}</div>
                    <div css={roles ? xsMuted : smMuted}>@{username}</div>

                    {rolesArr.length !== 0 && (
                        <div css={C.roles}>{rolesArr}</div>
                    )}
                </div>

                {status && <div css={C.status} />}
            </div>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
            >
                <MenuItem onClick={() => {}}>Status</MenuItem>
                <MenuItem onClick={() => {}}>Settings</MenuItem>
                <MenuItem onClick={() => { logoutCognito()}}>Logout</MenuItem>
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
