/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useState, memo } from "react";
import { motion } from "framer-motion";
import { Dialog } from '@mui/material';


const C = {
    container: css({
        border: '1px solid #0f0e10',
        position: 'relative',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        height: '400px',
        background: '#181820',

    }),
    blur: css({
        width: '100%',
        height: '100%',
        background: '#181820',
        position: 'absolute',
        filter: 'blur(4px) brightness(45%)',
        objectFit: 'cover',
    }),
    img: css({
        zIndex: 100,
        objectFit: 'contain',
        maxHeight: '400px',
        width: '100%',
    }),
    error: css({
        width: '100%',
        height: '400px',
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

    const stopDefault = (e: any) => { e.preventDefault(); e.stopPropagation() }

    if (error) return <div css={C.error}>

    </div>

    return (
        <div onClick={stopDefault}>
            {open && <Viewer src={url} open={open} onClose={handleClose} />}
            <div
                onClick={(e) => { handleOpen() }}
                css={C.container}>

                <img
                    alt='blur'
                    loading="lazy"
                    onError={handleImgError}
                    src={url} css={C.blur} />

                <img
                    alt='content'
                    loading="lazy"
                    onError={handleImgError}
                    css={C.img} src={url} />
            </div>
        </div >

    )
}


const Viewer = ({ src, open, onClose }: any) => {

    const [scale, setScale] = useState(1)

    const handleScroll = (e: any) => {
        setScale(scale + e.deltaY * -0.0005)
    }

    function onPanEnd(event: any, info: { point: { x: any; y: any; }; }) {
        // console.log(info.point.x, info.point.y)
        // onClose()
    }


    return (

        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                borderRadius: '0px',
                // backgroundColor: 'transparent',
                // backgroundColor: 'rgba(15,14,16,0.55)',

                '& .MuiDialog-paper': {
                    backgroundColor: 'transparent !important',
                    boxShadow: 'none !important',
                    padding: '0px !important',
                    margin: '0px !important',


                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',

                    overflow: 'hidden',
                    maxWidth: '800px',
                    maxHeight: '800px',


                },
                Backdrop: {
                    background: 'rgba(15,14,16,0.90)',
                }
            }}
        >
            <motion.img
                onClick={onClose}
                src={src}
                onPan={onPanEnd}

                css={{
                    objectFit: 'contain',
                    maxHeight: '100%',
                    maxWidth: '100%',
                    height: '80vh',
                    width: '100vw',

                }}
            />
        </Dialog>

    );
}


export default memo(Image);