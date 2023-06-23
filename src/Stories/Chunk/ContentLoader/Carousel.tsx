/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useState } from "react"
import { Dialog, IconButton } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
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
        height: '400px',
        background: '#181820',
    }),
    float: css({
        display: "flex",
        placeContent: "center",
        placeItems: "center",
        overflow: "hidden",
        position: "absolute",
        pointerEvents: "auto",
        left: "50%",
        top: "unset",
        transform: "translateX(-50%)",
        flexDirection: "row",
        bottom: "20px",
        gap: "12px",
        height: "30px",
        width: "auto",
        borderRadius: "50px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(20px)"
    }),
    dot: css({
        borderRadius: "50%",
        background: "#5d6066",
        cursor: "pointer",
        border: "none",
        placeContent: "center",
        placeItems: "center",
        width: "8px",
        height: "8px",
        opacity: 1
    }),

    blur: css({
        width: '100%',
        height: '100%',
        background: '#181820',
        position: 'absolute',
        filter: 'blur(4px) brightness(45%)',
    }),
    img: css({
        zIndex: 100,
        objectFit: 'contain',
        maxHeight: '400px',
        width: '100%',
    }),
    float1: css({
        display: "flex",
        placeContent: "center",
        placeItems: "center",
        overflow: "hidden",
        position: "absolute",
        pointerEvents: "auto",
        left: "50%",
        top: "unset",
        transform: "translateX(-50%)",
        zIndex: 200,
        flexDirection: "row",
        bottom: "20px",
        gap: "12px",
        height: "30px",
        width: "auto",
        borderRadius: "50px",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(20px)",
        color: "#fff",
    }),
    error: css({
        width: '100%',
        height: '400px',
        borderRadius: '12px',
        background: '#181820',
        overflow: 'hidden',
    }),
}


const Carousel = ({ images }: any) => {

    const [index, setIndex] = useState(0)
    const dots = Array(images.length).fill(0);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [error, setError] = useState(false);

    const handleImgError = (e: any) => setError(true)

    const up = () => {
        if (index < images.length - 1) setIndex(index + 1)
    }
    const down = () => {
        if (index > 0) setIndex(index - 1)
    }

    if (images.length === 0) return null

    if (error) return <div css={C.error}>
        <Walk variant='error' />
    </div>


    const move = (to: number) => {
        setIndex(to)
    }

    return (
        <div onClick={(e) => e.stopPropagation()}>

            {open && <Viewer images={images} open={open} onClose={handleClose} />}

            <div css={C.container} onClick={handleOpen}>
                <img
                    onError={handleImgError}
                    src={images[index]}
                    css={C.blur} />
                <img
                    onError={handleImgError}
                    src={images[index]}
                    css={C.img} />
                <div onClick={(e) => e.stopPropagation()} css={C.float1}>

                    <IconButton
                        sx={{
                            height: '34px',
                            width: '34px',
                            color: '#b9bbbe',
                        }}
                        onClick={down}
                    >
                        < ArrowBackRoundedIcon />
                    </IconButton>
                    {dots.length < 10 ? dots.map((_, i) => (<div key={i} css={[C.dot, i === index && { background: '#fff' }]} onClick={() => move(i)} />)) :
                        <div>  {index + 1}/{images.length} </div>
                    }

                    <IconButton
                        sx={{
                            height: '34px',
                            width: '34px',
                            color: '#b9bbbe',
                        }}
                        onClick={up}

                    >
                        <ArrowForwardRoundedIcon />
                    </IconButton>

                </div>

            </div>
        </div>
    )
}

export default Carousel



const Viewer = ({ images, open, onClose }: any) => {

    const [index, setIndex] = useState(0)
    const [[imageCount, direction], setImageCount] = useState([0, 0])
    const dots = Array(images.length).fill(0);

    const move = (to: number) => {
        setIndex(to)
    }
    const up = () => {
        if (index < images.length - 1) setIndex(index + 1)
    }
    const down = () => {
        if (index > 0) setIndex(index - 1)
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
            <img
                onClick={onClose}
                src={images[index]}
                key={`i${imageCount}`}
                css={{
                    objectFit: 'contain',
                    maxHeight: '100%',
                    maxWidth: '100%',
                    height: '80vh',
                    width: '100vw',
                }}
            />
            <div css={C.float}>

                <IconButton
                    sx={{
                        height: '34px',
                        width: '34px',
                        color: '#b9bbbe',
                    }}
                    onClick={down}
                >
                    < ArrowBackRoundedIcon />
                </IconButton>
                {dots.length < 10 ? dots.map((_, i) => (<div key={i} css={[C.dot, i === index && { background: '#fff' }]} onClick={() => move(i)} />)) :
                    <div>  {index + 1}/{images.length} </div>
                }

                <IconButton
                    sx={{
                        height: '34px',
                        width: '34px',
                        color: '#b9bbbe',
                    }}
                    onClick={up}

                >
                    <ArrowForwardRoundedIcon />
                </IconButton>

            </div>
        </Dialog>

    );
}
