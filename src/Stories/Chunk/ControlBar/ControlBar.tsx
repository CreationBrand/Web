/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useRecoilValue } from 'recoil'
import { pageFlow } from 'State/Flow'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { IconButton } from '@mui/material';


import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
import AddLinkRoundedIcon from '@mui/icons-material/AddLinkRounded';
import VerticalAlignTopRoundedIcon from '@mui/icons-material/VerticalAlignTopRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CreatePost from 'Stories/Forum/CreatePost';
import { useNavigate } from 'react-router-dom';


const C = {
    container: css({
        width: '100%',
        height: '50px',
        maxHeight: '50px',
        minHeight: '50px',
        position: 'relative',
    }),
    wrapper: css({
        position: 'absolute',
        bottom: '0px',
        width: '100%',
        height: 'auto',
        minHeight: '50px',
        transform: 'none',
    }),
    box: css({
        width: 'min-content',
        margin: '0 auto',
        height: '44px',
        minHeight: '44px',
        maxHeight: '44px',
        background: '#343442',
        borderRadius: '8px',
        display: 'flex',
        marginBottom: '8px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    }),
    inner: css({
        display: 'flex',
        paddingLeft: '12px',
        paddingRight: '12px',
        alignItems: 'center',
        gap: '4px',
        justifyContent: 'space-between',
    }),
    panel: css({
        width: 'calc(100% - 40px)',
        borderRadius: '8px',
        height: 'auto',
        minHeight: '200px',
        background: '#343442',
        margin: '10px 20px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',

    }),
}





const ControlBar = () => {

    const page = useRecoilValue(pageFlow)
    const [active, setActive] = useState(false)
    const navigate = useNavigate()

    return (

        <div css={C.container}>
            <AnimatePresence >
                <motion.div css={C.wrapper} layout>


                    <motion.div
                        key='box'
                        layout
                        // animate={{y:0}}
                        css={C.box}>
                        <div css={C.inner}>

                            <IconButton
                                disableRipple={true}
                                size="small"
                                color="secondary"
                                sx={{
                                    ':hover': { color: '#fff' },
                                    borderRadius: '4px',
                                    height: '32px',
                                    width: '32px',
                                }}>
                                <VerticalAlignTopRoundedIcon />
                            </IconButton>


                            <IconButton
                                disableRipple={true}
                                size="small"
                                color="secondary"
                                sx={{
                                    ':hover': { color: '#fff' },
                                    borderRadius: '4px',
                                    height: '32px',
                                    width: '32px',
                                    transform: 'rotate(90deg)',
                                }}
                            >
                                <KeyRoundedIcon />
                            </IconButton>


                            <IconButton
                                onMouseDown={() => navigate(`/submit`)}
                                disableRipple={true}
                                size="small"
                                color="secondary"
                                sx={{
                                    ':hover': { color: '#fff' },
                                    borderRadius: '4px',
                                    height: '42px',
                                    width: '42px',
                                }}>
                                <AddCircleRoundedIcon
                                    fontSize='large'
                                />
                            </IconButton>


                            <IconButton
                                disableRipple={true}
                                size="small"
                                color="secondary"
                                sx={{
                                    ':hover': { color: '#fff' },
                                    borderRadius: '4px',
                                    height: '32px',
                                    width: '32px',
                                }}>
                                <AddPhotoAlternateRoundedIcon />
                            </IconButton>


                            <IconButton
                                disableRipple={true}
                                size="small"
                                color="secondary"
                                sx={{
                                    ':hover': { color: '#fff' },
                                    borderRadius: '4px',
                                    height: '32px',
                                    width: '32px',
                                }}>
                                <AddLinkRoundedIcon />
                            </IconButton>


                        </div>
                    </motion.div >

                    {/* {active &&
                        <motion.div
                            key='panel'
                            css={C.panel}
                            transition={{ ease: 'easeInOut' }}
                            exit={{ y: '100%' }}
                            initial={{ y: '100%' }}
                            animate={{ y: '0%' }}
                        >

                            <CreatePost handleClose={() => { }} />


                        </motion.div>

                    } */}

                </motion.div>
            </AnimatePresence>
        </div>

    )
}

export default ControlBar
