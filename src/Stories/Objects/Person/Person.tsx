/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { List, ListItemButton, Menu } from '@mui/material'
import theme from 'Global/Theme'
import { useState } from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import PersonPopup from 'Stories/Bits/PersonPopup/PersonPopup'
import Chip from 'Stories/Objects/Chip/Chip'
import { bold, listText, smBold, smMuted, xsMuted } from 'Stories/Bits/Text/Text'
import Avatar from '../../Bits/Avatar/Avatar'
import SettingsIcon from '@mui/icons-material/Settings'
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded'
import { useNavigate } from 'react-router-dom'
import { textBold, textLight, textNormal } from 'Global/Mixins'

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
            />,
        )
    }

    return (
        <>
            <div id="person" css={C.container} onClick={handleClick}>
                <Avatar public_id={public_id} size="medium" />

                <div css={C.content}>
                    <div css={textBold('m')}>{nickname}</div>
                    <div css={textLight('t')}>@{username}</div>


                    {rolesArr.length !== 0 && <div css={C.roles}>{rolesArr}</div>}
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
                    <List css={C.list}>
                        <ListItemButton
                            sx={{
                                borderRadius: '4px !important',
                                gap: '12px',
                                '&:hover': {
                                    background: '#7166bb !important',
                                    color: '#fff !important',
                                },
                                color: '#b9bbbe',
                            }}
                        >
                            <DragIndicatorRoundedIcon fontSize="small" color="inherit" />
                            <div css={listText}> Status </div>
                        </ListItemButton>

                        <ListItemButton
                            onClick={() => nagivate('/settings')}
                            sx={{
                                borderRadius: '4px !important',
                                gap: '12px',
                                '&:hover': {
                                    background: '#7166bb !important',
                                    color: '#fff !important',
                                },
                                color: '#b9bbbe',
                            }}
                        >
                            <SettingsIcon fontSize="small" color="inherit" />
                            <div css={listText}> Settings </div>
                        </ListItemButton>

                        <ListItemButton
                            sx={{
                                borderRadius: '4px !important',
                                gap: '12px',
                                '&:hover': {
                                    background: '#ed4245 !important',
                                    color: '#fff !important',
                                },
                                color: '#ed4245',
                            }}
                        >
                            <LogoutIcon fontSize="small" color="inherit" />
                            <div css={listText}> Logout </div>
                        </ListItemButton>
                    </List>
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
