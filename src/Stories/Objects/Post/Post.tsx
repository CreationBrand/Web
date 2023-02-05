/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { lBold, mNormal, sNormal, xBold } from 'Stories/Bits/Text/Text'
import { IconButton, Menu } from '@mui/material'
import theme from 'Global/Theme'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useNavigate } from 'react-router-dom'
import TimeStamp from 'Stories/Bits/TimeStamp/TimeStamp'
import Avatar from 'Stories/Bits/Avatar/Avatar'
import Vote from 'Stories/Bits/Vote/Vote'
import PersonPopup from 'Stories/Bits/PersonPopup/PersonPopup'
import { useState } from 'react'
import PersonName from 'Stories/Bits/PersonName/PersonName'
import { useRecoilValue } from 'recoil'
import { pageFlow } from 'State/Flow'
import CommunityTitle from 'Stories/Bits/Titles/CommunityTitle'
import Author from 'Stories/Bits/Titles/Author'
import { motion } from 'framer-motion'
import Nickname from 'Stories/Bits/Titles/Nickname'

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

const Post = ({ data }: any) => {

    // hooks
    const page = useRecoilValue(pageFlow)
    const navigate = useNavigate()
    const [anchorEl, setAnchorEl] = useState(null)

    const viewPost = (e: any) => {
        console.log('ran')
        // if (preview) navigate(`/c/${data.community.public_id}/p/${data.public_id}`)
    }

    if (data.public_id === 'undefined') return <div>loading</div>

    // events
    const open = Boolean(anchorEl)
    const handleClick = (event: any) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    return (
        <>
            <motion.div
                key={data.public_id}
                transition={{ duration: 0.4 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}

                id="POST" css={C.container} onClick={viewPost}>
                <div css={C.left}>
                    {page !== 'community' ? (
                        <Avatar size="medium" public_id={data.community.public_id} onClick={handleClick} />
                    ) : (
                        <Avatar size="medium" public_id={data.author.public_id} onClick={handleClick} />
                    )}

                    <Vote karma={data.karma} />
                </div>

                <div css={C.right}>





                    {page !== 'community' ? (
                        <>
                            <CommunityTitle title={data.community.title} public_id={data.community.public_id} />
                            <Author username={data.author.username} public_id={data.author.public_id} />
                        </>
                    ) : (
                        <>
                            <Nickname title={data.author.nickname} public_id={data.author.public_id} />
                            <Author username={data.author.username} public_id={data.author.public_id} />
                        </>
                    )}



                    {/* <div css={C.row}>
                        <TimeStamp time={data.created_at} />
                    </div> */}

                    <div css={[C.title, xBold]}>{data.title}</div>
                    <div css={[mNormal]}>{data.content}</div>
                </div>
            </motion.div>

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
