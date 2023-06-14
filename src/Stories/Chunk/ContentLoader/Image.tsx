/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useState, memo } from "react";
import { motion } from "framer-motion";
import { Dialog } from '@mui/material';


const C = {
    container: css({
        width: '100%',
        borderRadius: '8px',
        // padding: '8px',
        display: 'flex',
        'white-space': 'normal !important',
    }),


}



const Image = ({ url }: any) => {


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }



    return (
        <div onClick={(e) => e.stopPropagation()}>
            <Viewer src={url} open={open} onClose={handleClose} />

            <div
                onClick={(e) => { handleOpen() }}
                css={{
                    width: '100%',
                    height: '1000px',
                    maxHeight: '400px',
                    minHeight: '200px',
                    position: 'relative',
                    borderRadius: "12px",
                    overflow: 'hidden',

                }}>


                <div css={{
                    position: 'absolute',
                    border: '1px solid #272732',
                    display: "block",
                    minWidth: '100%',
                    minHeight: '100%',
                    aspectRatio: 'auto 1 / 1',
                    zIndex: 50,

                    filter: 'blur(4px) brightness(50%)',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${url})`
                }} />
                <div css={{
                    position: 'absolute',
                    zIndex: 100,
                    aspectRatio: 'auto 1 / 1',
                    border: '1px solid #272732',
                    display: "block",
                    width: '100%',
                    height: '1000px',
                    maxHeight: '400px',
                    minHeight: '200px',
                    borderRadius: "12px",
                    backgroundSize: 'contain',
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${url})`,

                }} />
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
                    width: '100%',
                    height: 'auto',

                },
                Backdrop: {
                    background: 'rgba(14,16,15,0.80)',
                }
            }}
        >
            <motion.img
                onWheel={handleScroll}
                src={src}
                onPanEnd={onPanEnd}
                // animate={{ scale: scale }}
                style={{
                    width: '100%',
                }}
                css={{

                    zIndex: 10000,
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: 'auto',
                    height: 'auto',
                }}
            />
        </Dialog>

    );
}


export default Image;
