
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'

import { Dialog, IconButton } from '@mui/material';
import Walk from 'Stories/Bits/ChunkError/Walk';
import { memo, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import VisibilitySensor from 'react-visibility-sensor';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import useWindow from 'Hooks/useWindow';
import { useRecoilState, useRecoilValue } from 'recoil';
import { soundState } from 'State/atoms';




const C = {
    player: css({
        borderRadius: '8px',
        width: '100%',
        // width: 'min-content',
        overflow: 'hidden',
        position: 'relative',
        '& > div': {
            width: '100% !important',
            background: '#272732',
        },
        '& > div > video': {
            backgroundColor: '#fff',
            background: '#181820 !important',
            objectFit: 'contain',
            width: '100% !important',
            height: 'auto',
            borderRadius: '8px',

        }
    }), error: css({
        width: '100%',
        height: '80px',
        borderRadius: '12px',
        background: '#181820',
        overflow: 'hidden',
    }),
}

const Player = ({ url }: any) => {

    const handleVisability = (visable: boolean) => setIsPlaying(visable)
    const [error, setError] = useState(false)
    const handleError = () => setError(true)

    const [open, setOpen] = useState(false);

    const handleOpen = (e: any) => {
        e.stopPropagation()
        setOpen(true)
        setIsPlaying(false)
    };

    const handleClose = () => setOpen(false);
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        document.querySelectorAll('iframe').forEach((iframe: any) => {
            iframe.setAttribute('sandbox', '');
        })
    }, [])

    if (error) return <div css={C.error}>
        <Walk variant='error' />
    </div>

    return (
        <VisibilitySensor onChange={handleVisability}>
            <div css={C.player} onClick={handleOpen} >

                {open && <Viewer url={url} open={open} onClose={handleClose} />}

                <ReactPlayer
                    onError={handleError}
                    playing={isPlaying}
                    url={url}
                    muted={true}
                    loop={true}
                />

                <span
                    css={{
                        background: 'transparent',
                        bottom: '0px',
                        position: 'absolute',
                        zIndex: 100,
                        color: '#fff',
                        padding: '0px 0px 8px 8px',
                    }}>

                    <IconButton
                        sx={{
                            padding: '2px',
                            borderRadius: '8px',
                        }}
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsPlaying(!isPlaying)
                        }}>

                        {isPlaying ?
                            <PauseRoundedIcon css={{ fontSize: 34 }} onClick={(e) => {
                                setIsPlaying(true)
                            }} /> :
                            <PlayArrowRoundedIcon css={{ fontSize: 34 }} onClick={(e) => {
                                setIsPlaying(false)

                            }} />}
                    </IconButton>
                </span>
            </div>
        </VisibilitySensor >
    )
}


export default memo(Player)


const Viewer = ({ url, open, onClose }: any) => {

    const { width, height } = useWindow()
    let scale = width * 0.8 < 800 ? width * 0.8 : 800

    const [sound, setSound] = useRecoilState(soundState)

    const handleClose = (e: any) => {
        e.stopPropagation()
        onClose()
    }



    return (

        <Dialog
            open={open}
            onClose={handleClose}

            sx={{
                borderRadius: '0px',
                backgroundColor: 'transparent',
                '& .MuiDialog-paper': {
                    backgroundColor: 'transparent !important',
                    boxShadow: 'none !important',
                    padding: '0px !important',
                    margin: '0px !important',
                    width: 'auto',
                    height: 'auto',
                    maxWidth: '800px',
                    maxHeight: '800px',
                },
                Backdrop: {
                    background: 'rgba(14,16,15,0.80)',
                }
            }}
        >
            <div
                css={{
                    '& > div': {
                        width: '100% !important',
                        height: 'auto !important',
                    }, '& > div > video': {
                        width: '100% !important',
                        height: 'auto !important',
                        maxWidth: 'calc(100vw - 32px) !important',
                        maxHeight: '80vh !important',
                        background: '#0f0e10 !important',
                        borderRadius: '8px',
                        border: '1px solid #0f0e10',
                    }

                }}
            >

                <ReactPlayer
                    playing={true}
                    controls
                    url={url}
                    muted={false}
                    volume={sound}
                    loop={true}
                />
            </div>

        </Dialog>

    );
}

