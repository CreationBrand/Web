/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import LockPersonRoundedIcon from '@mui/icons-material/LockPersonRounded'
import { mMuted, mNormal, sMuted, sNormal } from 'Stories/Bits/Text/Text'
import { Tooltip, IconButton, Menu, MenuItem, Button } from '@mui/material'
import { useState } from 'react'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import Editor from 'Stories/Forum/Editor/Editor'
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';

const C = {
    container: css({
        width: 'calc(100% - 40px)',
        margin: 'auto',
        height: '44px !important',
        background: '#343442',
        borderRadius: '8px',
        display: 'flex',
        minHeight: '44px',
        paddingLeft: '16px',
        paddingRight: '16px',
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '12px',
        marginTop: 'auto',

        justifyContent: 'space-between',
        alignItems: 'center'
    }),
    input: css({
        width: '100%',
        background: '#272732',
        borderRadius: '8px',
        height: '28px',
        marginRight: '8px',
        marginLeft: '8px',
        lineHeight: '28px',
        paddingLeft: '8px',
        color: '#fff'
    }),
    slideContainer: css({
        width: 'calc(100% - 40px)',
        height: '150px',
        background: '#343442',
        margin: '0px 20px ',
        borderRadius: '8px',
        display: 'flex',
        minHeight: '150px',
        marginBottom: '12px',
        overflow: 'hidden'
    }),
    editorContainer: css({
        width: 'calc(100% - 40px)',
        height: 'min-content',
        background: '#343442',

        borderRadius: '8px',
        marginLeft: '20px',
        marginRight: '20px',
        marginBottom: '12px'
    }),

    row: css({
        display: 'flex',
        height: '40px',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '8px',
        marginRight: '12px'
    })
}

const PostControlBar = () => {
    // state
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [menuValue, setMenuValue] = useState(false)
    const [slide, setSlide] = useState(false)
    const [editorValue, setEditor] = useState('')

    const handleMenuClose = () => setAnchorEl(null)
    const handleMenuOpen = (event: any) => setAnchorEl(event.currentTarget)

    const openSlide = () => setSlide(true)
    const closeSlide = () => setSlide(false)

    const editorChange = (value: any) => setEditor(value)
    const handleSubmit = () => {
        console.log('submit', editorValue)
    }

    return (
        <LayoutGroup>
            <motion.div layout css={C.container}>
              
                    <IconButton
                        onClick={handleMenuOpen}
                        size="small"
                        color="secondary"
                        disableRipple
                        sx={{
                            borderRadius: '4px',
                            height: '32px',
                            width: '32px',
                            '&:hover': {
                                color: '#fff'
                            }
                        }}
                    >
                        <AddBoxRoundedIcon />
                    </IconButton>
             

                <div css={C.input}>
                    <div css={mNormal}>Create Post </div>
                </div>
                <IconButton
                    onClick={closeSlide}
                    size="small"
                    color="secondary"
                    disableRipple
                    sx={{
                        borderRadius: '4px',
                        height: '32px',
                        width: '32px',
                        '&:hover': {
                            color: '#fff'
                        }
                    }}
                >
                    <ImageOutlinedIcon />
                </IconButton>

                <IconButton
                    onClick={openSlide}
                    size="small"
                    color="secondary"
                    disableRipple
                    sx={{
                        borderRadius: '4px',
                        height: '32px',
                        width: '32px',
                        '&:hover': {
                            color: '#fff'
                        }
                    }}
                >
                    <InsertLinkIcon />
                </IconButton>

            </motion.div>

            <AnimatePresence>
                {slide && (
                    <motion.div
                        transition={{ delay: 0.1, duration: 0.1 }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                    >
                        <div css={C.editorContainer}>
                            <Editor
                                value={editorValue}
                                onChange={editorChange}
                            />

                            <div css={C.row}>
                                <Button
                                    onClick={closeSlide}
                                    sx={{ height: '28px', borderRadius: '8px' }}
                                    size="small"
                                    variant="text"
                                    color="secondary"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    sx={{
                                        height: '28px',
                                        borderRadius: '8px'
                                    }}
                                    size="small"
                                    variant="contained"
                                    disableElevation
                                >
                                    Post
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </LayoutGroup>
    )
}

export default PostControlBar



// <Menu
// anchorEl={anchorEl}
// id="account-menu"
// open={Boolean(anchorEl)}
// onClose={handleMenuClose}
// onClick={handleMenuClose}
// disableScrollLock
// sx={{
//     '.MuiMenu-paper': {
//         overflow: 'hidden',
//         background: '#0f0e10',
//         padding: '2px 8px',
//         borderRadius: '8px'
//     }
// }}
// transformOrigin={{
//     horizontal: 'center',
//     vertical: 'bottom'
// }}
// anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
// >
// <div css={mNormal}>Roles</div>
// </Menu>