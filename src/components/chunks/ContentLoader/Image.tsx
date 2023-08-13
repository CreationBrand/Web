/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useState, memo } from "react";

import { motion } from "framer-motion";
import { Backdrop, Dialog } from '@mui/material';
import { bg_1, bg_2 } from '@/global/var';
import { atomFamily, useRecoilState } from 'recoil';


import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'


const C = {
    container: css({
        border: '1px solid #0f0e10',
        position: 'relative',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        height: 'auto',
        background: bg_2,
        maxHeight: '400px',
        minHeight: '100px',

    }),
    blur: css({
        width: '100%',
        // height: '100%',
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

export const imageHeights = atomFamily({
    key: 'imageHeights',
    default: 'auto' as any,
})




const Image = ({ url }: any) => {


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [error, setError] = useState(false);
    const handleImgError = (e: any) => setError(true)

    const stopDefault = (e: any) => { e.preventDefault(); e.stopPropagation() }

    const [height, setHeight] = useRecoilState(imageHeights(url))

    const onLoad = (e: any) => {
        setHeight(e.target.offsetHeight)
    }


    if (error) return <div css={C.error}>

    </div>

    return (
        <div onClick={stopDefault}>
            {open && <Viewer src={url} open={open} onClose={handleClose} />}
            <div
                style={{ height: height }}
                onClick={(e) => { handleOpen() }}
                css={C.container}>

                <img
                    alt='blur'
                    onError={handleImgError}
                    src={url} css={C.blur} />

                <img
                    onLoad={onLoad}
                    alt='content'
                    onError={handleImgError}
                    css={C.img}
                    src={url} />
            </div>
        </div >

    )
}


const Viewer = ({ src, open, onClose }: any) => {


    const [{ y }, api]: any = useSpring(() => ({ y: 0 }))


    const bind = useDrag(({ movement: [x, y], down }: any) => {
        if (y < -100 && !down) return onClose()
        if (down) return api.start({ y: y < 0 ? y : 0 })
    }, {
    })

    return (
        <Backdrop
            sx={{
                zIndex: 2000,

            }}
            open={true}
            onClick={onClose}>
            <animated.img

                {...bind()}
                style={{ y: y, opacity: y.to([0, -400], [1, 0]) }}
                src={src}

                css={{
                    objectFit: 'contain',
                    touchAction: 'pan-x',
                    maxHeight: '100%',
                    maxWidth: '100%',
                    height: '80vh',
                    width: '100vw',
                    zIndex: 100000,

                }}

            />

        </Backdrop>
    );
}


export default memo(Image);
