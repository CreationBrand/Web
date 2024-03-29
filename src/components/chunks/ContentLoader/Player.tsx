
/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'

import { Dialog, IconButton } from '@mui/material';
import { memo, useState } from 'react';
import ReactPlayer from 'react-player';
import VisibilitySensor from 'react-visibility-sensor';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
// import useWindow from 'Hooks/useWindow';
import { useRecoilState } from 'recoil';
import { autoPlayAtom, muteAtom, soundState } from '@/state/data';


const C = {

    container: css({
        width: '100%',
        height: '400px',
        minHeight: '400px',
        borderRadius: '12px',
        maxHeight: '400px',
        maxWidth: '800px',
        border: '1px solid black',
        background: '#0f0e10',
        overflow: 'hidden',
        position: 'relative',
        '& > div': {
            position: 'relative',
            width: '100% !important',
            objectFit: 'contain',
            zIndex: 100,
            height: '400px',
            minHeight: '400px',
        },
        '& > div > video': {
            objectFit: 'contain',
            width: '100% !important',
            height: 'auto',
            borderRadius: '8px',
            zIndex: 100,
        }
    }),
    error: css({
        width: '100%',
        height: '80px',
        borderRadius: '12px',
        background: '#181820',
        overflow: 'hidden',
    }),
    canvas: css({
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        zIndex: 10,
    }),

}

const Player = ({ url, fallback }: any) => {

    const handleVisability = (visable: boolean) => setIsPlaying(visable)
    const [error, setError] = useState(false)
    const handleError = () => setError(true)

    const [autoPlay, setAutoPlay] = useRecoilState(autoPlayAtom)
    const [mute, setMute] = useRecoilState(muteAtom)

    const [open, setOpen] = useState(false);

    const handleOpen = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true)
        setIsPlaying(false)
    };

    const handleClose = () => setOpen(false);
    const [isPlaying, setIsPlaying] = useState(false)


    const handlePlay = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        setIsPlaying(!isPlaying)
    }

    if (error) return <div css={C.error}>    </div>

    return (
        <VisibilitySensor onChange={handleVisability}>

            <div css={C.container} onClick={handleOpen}>
                {open && <Viewer url={url} open={open} onClose={handleClose} />}

                <ReactPlayer
                    playing={isPlaying}
                    url={url}
                    muted={true}
                    autoPlay={autoPlay}
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
                        onClick={handlePlay}>

                        {isPlaying ?
                            <PauseRoundedIcon css={{ fontSize: 34 }} /> :
                            <PlayArrowRoundedIcon css={{ fontSize: 34 }} />}
                    </IconButton>
                </span>
            </div>
        </VisibilitySensor >
    )
}


export default memo(Player)


const Viewer = ({ url, open, onClose }: any) => {

    const [sound, _setSound] = useRecoilState(soundState)

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
                    borderRadius: '0px !important',
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
                    // background: 'rgba(15,14,16,0.90)',
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
                        maxWidth: '100vw !important',
                        maxHeight: '80vh !important',
                        background: '#0f0e10 !important',
                        borderRadius: '0px',
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

