/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Menu } from '@mui/material'
import { underline } from 'ansicolor'
import { useState } from 'react'
import { lBold, mMuted, sMuted, sNormal } from 'Stories/Bits/Text/Text'
import PersonPopup from '../PersonPopup/PersonPopup'

const C = {
    container: css({
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        width: 'min-content',
    }),
    underline: css({
        ':hover': {
            textDecoration: 'underline',
            cursor: 'pointer',
        },
    }),
}

const PersonName = ({ author, showUsername, showNickname }: any) => {
    const [anchorEl, setAnchorEl] = useState(null)

    const open = Boolean(anchorEl)
    const handleClick = (event: any) => {
        event.stopPropagation()

        setAnchorEl(event.currentTarget)
    }
    const handleClose = (e: any) => {
        e.stopPropagation()
        setAnchorEl(null)
    }

    return (
        <>
            <div css={C.container} onClick={handleClick}>
                {showNickname && <div css={[lBold, C.underline]}>{author.nickname}</div>}
                {showUsername && <div css={sNormal}>@{author.username}</div>}
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
                <PersonPopup username={author.username} public_id={author.public_id} nickname={author.nickname} />
            </Menu>
        </>
    )
}

export default PersonName
