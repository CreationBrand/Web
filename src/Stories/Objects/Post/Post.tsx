/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { lBold, mNormal, sNormal, xBold } from 'Stories/Text/Text'
import { IconButton, Menu } from '@mui/material'
import theme from 'Global/Theme'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useNavigate } from 'react-router-dom'
import TimeStamp from 'Stories/Bits/TimeStamp/TimeStamp'
import Avatar from 'Stories/Bits/Avatar/Avatar'
import Vote from 'Stories/Bits/Vote/Vote'
import PersonPopup from 'Stories/Bits/PersonPopup/PersonPopup'
import { useState } from 'react'

const C = {
    container: css({
        background: theme.background.qua,
        width: '100%',
        margin: '10px 20px',
        borderRadius: '8px',
        padding: '8px',
        display: 'flex',
    }),
    header: css({
        display: 'flex',

        gap: '4px',
        alignItems: 'center',
    }),

    title: css({
        padding: '8px 0px',
        fontWeight: '400',
    }),
    left: css({
        width: '56px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        // alignItems: 'center',
    }),
    right: css({
        width: '100%',
    }),
    row: css({
        display: 'flex',
        alignItems: 'center',
        height: '20px',
        gap: '4px',
    }),
    menu: css({
        marginLeft: 'auto',
    }),

    underline: css({
        ':hover': {
            textDecoration: 'underline',
        },
    }),
}

const Post = ({ data, preview }: any) => {
    // hooks
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)

    console.log(data)

    const viewPost = (e: any) => {
        if (preview) navigate(`/c/${data.community.public_id}/p/${data.public_id}`)
    }

    if (data.public_id === 'undefined') return <div>loading</div>

    const open = Boolean(anchorEl)
    const handleClick = (event: any) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    return (
        <>
            <div id="POST" css={C.container} onClick={viewPost}>
                <div css={C.left}>
                    <Avatar size="medium" public_id={data.author.public_id} onClick={handleClick} />
                    <Vote karma={data.karma} />
                </div>

                <div css={C.right}>
                    <div css={[C.row]}>
                        <div css={lBold}>{data.author.nickname}</div>
                        <div css={sNormal}>@badwithawp</div>
                        <IconButton css={C.menu} color="secondary" size="small">
                            <MoreHorizIcon />
                        </IconButton>
                    </div>
                    <div css={C.row}>
                        <TimeStamp time={data.created_at} />
                    </div>

                    <div css={[C.title, xBold]}>{data.title}</div>
                    <div css={[mNormal]}>{data.content}</div>
                </div>
            </div>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
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
                <PersonPopup
                    username={data.author.username}
                    public_id={data.author.public_id}
                    nickname={data.author.nickname}
                />
            </Menu>
        </>
    )
}

export default Post
