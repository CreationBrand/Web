/** @jsxImportSource @emotion/react */
import { Theme, css } from '@emotion/react'
import { memo } from 'react'

import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactPlayer from 'react-player'
import Carousel from '../Carousel/Carousel';
import clsx from 'clsx';

import * as React from "react";
import { useState, useRef } from "react";
import { AnimatePresence, motion, useDomEvent } from "framer-motion";
import { Backdrop, Dialog, Modal, styled } from '@mui/material';
import Close from '../Close/Close';
import VisibilitySensor from 'react-visibility-sensor';

const C = {
    container: css({
        width: '100%',
        borderRadius: '8px',
        // padding: '8px',
        display: 'flex',
        'white-space': 'normal !important',
    }),
    editor: css({
        color: 'white',
        width: '100%',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column-reverse',
        padding: '0px',

        '.ql-blank': {
            minHeight: '40px',
            '&::before': {
                color: '#bcbdbe'
            }
        },

        '.ql-toolbar': {
            borderRadius: '8px',
            width: 'fit-content',
            padding: '4px',
            margin: '4px',
            border: 'none',
            background: '#272732',
        },
        '.ql-formats': {
            paddingRight: '4px',
            paddingLeft: '4px',
            marginRight: '0px !important',
            borderRight: '2px solid #4a484c',
            '&:last-child': {
                borderRight: 'none',

            },
        },

        '.ql-container': {
            fontFamily: 'Ubuntu !important',
            border: 'none',
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px'
        },

        '.ql-snow.ql-toolbar button:hover .ql-stroke, .ql-snow .ql-toolbar button:hover .ql-stroke, .ql-snow.ql-toolbar button:focus .ql-stroke, .ql-snow .ql-toolbar button:focus .ql-stroke, .ql-snow.ql-toolbar button.ql-active .ql-stroke, .ql-snow .ql-toolbar button.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow.ql-toolbar button:hover .ql-stroke-miter, .ql-snow .ql-toolbar button:hover .ql-stroke-miter, .ql-snow.ql-toolbar button:focus .ql-stroke-miter, .ql-snow .ql-toolbar button:focus .ql-stroke-miter, .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter': {
            color: '#996ccc !important',
        },
        '.ql-snow.ql-toolbar button:hover .ql-stroke, .ql-snow .ql-toolbar button:hover .ql-stroke, .ql-snow.ql-toolbar button:focus .ql-stroke, .ql-snow .ql-toolbar button:focus .ql-stroke, .ql-snow.ql-toolbar button.ql-active .ql-stroke, .ql-snow .ql-toolbar button.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke, .ql-snow.ql-toolbar button:hover .ql-stroke-miter, .ql-snow .ql-toolbar button:hover .ql-stroke-miter, .ql-snow.ql-toolbar button:focus .ql-stroke-miter, .ql-snow .ql-toolbar button:focus .ql-stroke-miter, .ql-snow.ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar button.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke-miter, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke-miter ': {
            stroke: '#996ccc !important',
        },
        '.ql-snow.ql-toolbar button:hover .ql-fill, .ql-snow .ql-toolbar button:hover .ql-fill, .ql-snow.ql-toolbar button:focus .ql-fill, .ql-snow .ql-toolbar button:focus .ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-fill, .ql-snow.ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow .ql-toolbar button:focus .ql-stroke.ql-fill, .ql-snow.ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar button.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-label.ql-active .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item:hover .ql-stroke.ql-fill, .ql-snow.ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill, .ql-snow .ql-toolbar .ql-picker-item.ql-selected .ql-stroke.ql-fill': {
            fill: '#996ccc !important',

        },

        '.ql-fill': {
            fill: '#b8babd',
        },
        '.ql-stroke': {
            stroke: '#bcbdbe'
        },
        '.ql-picker': {
            color: '#bcbdbe'
        },
        '.ql-snow': {
            border: 'none'
        },
        '.ql-editor': {
            minHeight: '40px !important',
            borderRadius: '8px',
        }
    }),
    player: css({
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
    })
}


const ContentLoader = ({ type, content }: any) => {

    const [isVisable, setIsVisable] = useState(false)

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }


    const handleVisability = (isVisible: boolean) => {
        setIsVisable(isVisible)
    }

    if (type === 'text') return (
        <div className='quill css-16jn0ui-Editor'>
            <div className='ql-container ql-snow'>
                <div className='ql-container ql-snow'>
                    <div className='ql-editor'>
                        <ReactMarkdown
                            children={content} rehypePlugins={[rehypeRaw]}></ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    )

    try {
        if (typeof content === 'string') content = JSON.parse(content)
    } catch (error) { }


    // console.log(content)

    if (type === 'upload' && content.type === 'video') return (
        <div css={C.player} onClick={(e) => e.stopPropagation()}>
            <VisibilitySensor onChange={handleVisability}>
                <ReactPlayer controls url={content.source}
                    playing={isVisable}
                    muted={true}
                    loop={true}
                />
            </VisibilitySensor>
        </div>
    )

    else if (type === 'upload' && content.type === 'image' && content?.source?.length > 1) return (
        <Carousel images={content.source} />

    )

    else if (type === 'upload' && content.type === 'image' && content?.source?.length === 1) return (

        <div onClick={(e) => e.stopPropagation()}>
            <Viewer src={content.source[0]} open={open} onClose={handleClose} />

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
                    backgroundImage: `url(${content.source[0]})`
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
                    backgroundImage: `url(${content.source[0]})`,

                }} />
            </div>
        </div>

    )


    return <div> error </div>


}



export default memo(ContentLoader)





const Viewer = ({ src, open, onClose }: any) => {

    return (

        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                borderRadius: '0px',
                Backdrop: {
                    background: 'rgba(14,16,15,0.80)',
                }
            }}
        >
            <motion.img
                src={src}
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


