/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { memo } from "react";
import 'react-quill/dist/quill.snow.css'

import Link from './Link';
import Carousel from './Carousel';
import Text from './Text';
import Image from './Image';
import Player from './Player';
import Walk from 'Stories/Bits/ChunkError/Walk';

const C = {
    container: css({
        width: '100%',
        borderRadius: '8px',
        display: 'flex',
    }),
    error: css({
        width: '100%',
        height: '80px',
        borderRadius: '12px',
        background: '#181820',
        overflow: 'hidden',

    }),
}
const proxy = "https://cors.creationbrand.workers.dev"


const ContentLoader = ({ type, content, public_id, view }: any) => {



    if (type === 'link') {
        let t1 = content.slice(-4)
        if (t1 === '.mp4') return <Player url={`${proxy}/${content}`} />
        else if (t1 === ".jpg") return <Image url={`${proxy}/${content}`} />
        else if (t1 === ".png") return <Image url={`${proxy}/${content}`} />
        else if (t1 === ".gif") return <Image url={`${proxy}/${content}`} />
        let t2 = content.slice(-5)
        if (t2 === ".jpeg") return <Image url={`${proxy}/${content}`} />
        else if (t2 === ".webp") return <Image url={`${proxy}/${content}`} />
        else if (t2 === ".webm") return <Player url={`${proxy}/${content}`} />

        return <Link url={content} />
    }

    else if (type === 'text') return <Text view={view} content={content} public_id={public_id} />

    try {
        if (typeof content === 'string') content = JSON.parse(content)
    } catch (e) { return <div css={C.error}><Walk variant='error' /></div> }

    if (type === 'upload' && content.type === 'video') return <Player url={content.source} />
    else if (type === 'upload' && content.type === 'image' && content?.source?.length > 1) return (<Carousel images={content.source} />)
    else if (type === 'upload' && content.type === 'image' && content?.source?.length === 1) return (<Image url={content.source[0]} />)

    return <div css={C.error}><Walk variant='error' /></div>

}



export default memo(ContentLoader)







