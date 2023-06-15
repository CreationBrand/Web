/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import 'react-quill/dist/quill.snow.css'
import ReactPlayer from 'react-player'
import { useState, memo } from "react";
import { motion } from "framer-motion";
import { Dialog } from '@mui/material';
import VisibilitySensor from 'react-visibility-sensor';
//@ts-ignore

import Link from './Link';
import Carousel from './Carousel';
import Text from './Text';
import Image from './Image';
import Player from './Player';


const C = {
    container: css({
        width: '100%',
        borderRadius: '8px',
        display: 'flex',
        'white-space': 'normal !important',
    }),
}


const ContentLoader = ({ type, content, public_id }: any) => {

    if (type === 'text') return <Text content={content} public_id={public_id} />

    try {
        if (typeof content === 'string') content = JSON.parse(content)
    } catch (error) { }


    if (type === 'upload' && content.type === 'video') return <Player url={content.source} />

    else if (type === 'upload' && content.type === 'image' && content?.source?.length > 1) return (<Carousel images={content.source} />)
    else if (type === 'upload' && content.type === 'image' && content?.source?.length === 1) return (<Image url={content.source[0]} />)
    else if (type === 'link') return (<Link url={content} />)

    return <div> error </div>

}



export default memo(ContentLoader)







