/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { useState } from "react"
import { Dialog, } from '@mui/material';


import Carousel from "framer-motion-carousel";
import { useRecoilValue } from 'recoil';

import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import { layoutSize } from '@/state/layout';

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
        position: 'absolute',
        bottom: '0px',
        left: "calc(50%)",
        zIndex: 400,
        background: "#000",
        borderRadius: "4px",
        padding: "2px 4px",
        fontSize: "8px",

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
                    loading='lazy'
                    onError={handleImgError}
                    onClick={handleOpen}
                    src={images[0]}
                    css={C.blur} />
                <img
                    loading='lazy'
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
    const layout = useRecoilValue(layoutSize)

    const handleClose = () => {
        if (layout === 'mobile') onClose()
    };

    const arrowLeft = ({ handlePrev, activeIndex }: any) => {

        const onClick = () => {
            handlePrev(activeIndex - 1);
        }

        if (activeIndex === 0 || layout === 'mobile') return (<div></div>)

        return <div
            onClick={onClick}
            css={{
                cursor: 'pointer',

                background: '#996ccc9c',
                position: 'absolute',
                top: 'calc(50% - 40px)',
                padding: '8px',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
            }}>
            <ChevronLeftRoundedIcon />
        </div>
    }

    const arrowRight = ({ handleNext, activeIndex }: any) => {

        const onClick = () => {
            handleNext(activeIndex + 1);
        }

        if (activeIndex === images.length - 1 || layout === 'mobile') return (<div></div>)

        return <div
            onClick={onClick}
            css={{
                cursor: 'pointer',
                background: '#996ccc9c',
                position: 'absolute',
                top: 'calc(50% - 40px)',
                padding: '8px',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                right: '0px',
            }}>
            <ChevronRightRoundedIcon />
        </div>
    }
    const dots = ({ activeIndex, setActiveIndex }: any) => {

        return <div css={C.float1}>
            {activeIndex + 1}/{images.length}
        </div>
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
                    maxWidth: '900px',
                    maxHeight: '900px',
                },
            }}
        >


            <Carousel
                renderDots={dots}
                renderArrowLeft={arrowLeft}
                renderArrowRight={arrowRight}
                autoPlay={false} interval={0} loop={true}>
                {images.map((item: any, i: any) => (

                    <img
                        css={{
                            objectFit: 'contain',
                            maxHeight: '100%',
                            maxWidth: '100%',
                            marginBottom: '12px',
                            height: '85vh',
                            width: '100vw ',
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




        </Dialog >


    );
}


