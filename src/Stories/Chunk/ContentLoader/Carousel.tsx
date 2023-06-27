/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { Key, useState } from "react"
import { Dialog, IconButton } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import Walk from 'Stories/Bits/ChunkError/Walk';

import Carousel from "framer-motion-carousel";
import { motion } from 'framer-motion';
import { useRecoilValue } from 'recoil';
import { layoutSizeData } from 'State/Data';


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
        touchAction: 'pan-y',


    }),
    float: css({
        position: 'absolute',
        top: '8px',
        right: '8px',
        background: '#0f0e10',
        borderRadius: '12px',
        zIndex: 150,
        padding: '0px 8px',
        fontSize: '12px',
        color: '#d7dadc',
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


const Carousela = ({ images }: any) => {


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [error, setError] = useState(false);

    const handleImgError = (e: any) => setError(true)


    return (
        <div onClick={(e) => e.stopPropagation()} >

            {open && <Viewer images={images} open={open} onClose={handleClose} />}


            <div css={C.container}>


                <img
                    onError={handleImgError}
                    onClick={handleOpen}
                    src={images[0]}
                    css={C.blur} />


                <img
                    onError={handleImgError}
                    onClick={handleOpen}

                    src={images[0]}
                    css={C.img} />

                <div css={C.float}>{images.length}</div>

            </div>
        </div >
    )
}

export default Carousela



const Viewer = ({ images, open, onClose }: any) => {
    const layoutSize = useRecoilValue(layoutSizeData)

    const handleClose = () => {
        if (layoutSize === 'mobile') onClose()
    };


    return (


        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                borderRadius: '0px',
                backgroundColor: 'transparent',


                // backgroundColor: 'rgba(15,14,16,0.90)',

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


            <Carousel
                renderDots={(props: any) => { return <div></div>; }}
                autoPlay={false} interval={0} loop={true}>
                {images.map((item: any, i: any) => (

                    <img
                        css={{
                       
                            objectFit: 'contain',
                            maxHeight: '100%',
                            maxWidth: '100%',
                            height: '80vh',
                            marginLeft: '8px',
                            width: 'calc(100vw - 16px)',
                        }}
                        onClick={handleClose}
                        onDrag={(e: any) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        onDragCapture={(e: any) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                        draggable="false"
                        src={`${item}`}
                        key={i}
                        width="100%"
                        alt=""
                    />
                ))}
            </Carousel>




        </Dialog>


    );
}
