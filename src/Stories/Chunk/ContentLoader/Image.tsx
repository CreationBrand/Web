/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useState, memo } from "react";
import { motion } from "framer-motion";
import { Dialog } from '@mui/material';
import { ErrorBoundary } from 'react-error-boundary';
import Walk from 'Stories/Bits/ChunkError/Walk';


const C = {
    container: css({
        border: '1px solid #0f0e10',
        position: 'relative',
        borderRadius: "12px",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    }),
    blur: css({
        width: '100%',
        height: '100%',
        background: 'red',
        position: 'absolute',
        filter: 'blur(4px) brightness(45%)',
    }),
    img: css({
        zIndex: 100,
        objectFit: 'contain',
        maxHeight: '400px',
        width: '100%',
    }),
    error: css({
        width: '100%',
        height: '80px',
        borderRadius: '12px',
        background: '#181820',
        overflow: 'hidden',
    }),
}



const Image = ({ url }: any) => {


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [error, setError] = useState(false);
    const handleImgError = (e: any) => setError(true)



    if (error) return <div css={C.error}>
        <Walk variant='error' />
    </div>

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Viewer src={url} open={open} onClose={handleClose} />

            <div
                onClick={(e) => { handleOpen() }}
                css={C.container}>

                <img
                    onError={handleImgError}
                    src={url} css={C.blur} />

                <img
                    onError={handleImgError}
                    css={C.img} src={url} />

            </div>
        </div>
    )
}


const Viewer = ({ src, open, onClose }: any) => {

    const [scale, setScale] = useState(1)

    const handleScroll = (e: any) => {
        setScale(scale + e.deltaY * -0.0005)
    }

    function onPanEnd(event: any, info: { point: { x: any; y: any; }; }) {
        console.log(info.point.x, info.point.y)
        onClose()
    }


    return (

        <Dialog
            open={open}
            onClose={onClose}

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
            <motion.img
                onWheel={handleScroll}
                src={src}
                onPan={onPanEnd}
                // style={{
                //     width: '100%',
                // }}
                css={{
                    zIndex: 10000,
                    width: '100%',
                    maxWidth: 'calc(100vw - 32px)',
                    maxHeight: '80vh',
                }}
            />
        </Dialog>

    );
}


export default memo(Image);
