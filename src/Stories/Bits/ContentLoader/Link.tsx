/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'

import { useEffect, useState } from "react";
import { getLinkPreview, } from "link-preview-js";
import { memo } from 'react'
import Walk from '../ChunkError/Walk';


const C = {
    container: css({
        width: "100%",
        display: "flex",
        gap: "8px",
        background: '#181820 !important',
        padding: "8px",
        borderRadius: "8px",
        height: "96px",
        overflow: "hidden",
        textOverflow: "ellipsis",
    }),
    title: css({
        color: "#f2f2f2",
    }),
    desc: css({
        fontSize: "12px",
        color: "#a8a5ab",
    }),
    image: css({
        width: "100px",
        height: "80px",
        objectFit: "cover",
        borderRadius: "8px",
    }),
}


const proxy = "https://cors.creationbrand.workers.dev"

const Link = ({ url }: any) => {

    const [loading, setLoading] = useState(true)
    const [data, setData]: any = useState({
        contentType: false,
        description: false,
        favicons: false,
        images: false,
        mediaType: false,
        siteName: false,
        title: false,
        url: false,
        videos: false,
    })


    const handleClick = (e: any) => {
        e.stopPropagation()
        //@ts-ignore
        if (url) window.open(url, '_blank').focus();
    }


    useEffect(() => {
        (async () => {
            let data = await getLinkPreview(`${proxy}/${url}`)
            setData(data)
            setLoading(false)
        })()
    }, [url])


    if (loading) return <div css={C.container}>
        <Walk />
    </div>


    return <div css={C.container} onClick={handleClick}>

        {data.images && <img src={data.images[0]} css={C.image} />}

        <div>
            {data.title && <div css={C.title}>{data.title}</div>}
            {data.description && <div css={C.desc}>{data.description}</div>}
        </div>

    </div>
};



export default memo(Link);


