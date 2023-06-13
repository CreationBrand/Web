/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { getLinkPreview, } from "link-preview-js";
import { memo } from 'react'
import { useQuery } from '@tanstack/react-query';
import Walk from 'Stories/Bits/ChunkError/Walk';
import Player from './Player';


const proxy = "https://cors.creationbrand.workers.dev"


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


const Link = ({ url }: any) => {

    const { isLoading, isError, data }: any = useQuery({
        queryKey: [url],
        queryFn: async () => {
            let res = await getLinkPreview(`${proxy}/${url}`)
            return res
        },
    })


    const handleClick = (e: any) => {
        e.stopPropagation()
        //@ts-ignore
        if (url) window.open(url, '_blank').focus();
    }

    if (isLoading) return <div css={C.container}> <Walk /> </div>


    if (data.mediaType === "video.other" && data.siteName === 'Tenor') return <Player url={data.videos[0].url} />
    if (data.mediaType === "video.other" && data.siteName === 'YouTube') return <Player url={data.url} />
    if (data.mediaType === "video.other" && data.siteName === 'Twitch') return <Player url={data.url} />
    if (data.mediaType === "video" && data.siteName === 'RedGIFs') return <Player url={`https://cors.creationbrand.workers.dev/${data.videos[0].url}`} />

    return <div css={C.container} onClick={handleClick}>
        {data.images && <img src={data.images[0]} css={C.image} />}
        <div>
            {data.title && <div css={C.title}>{data.title}</div>}
            {data.description && <div css={C.desc}>{data.description}</div>}
        </div>
    </div>
};



export default memo(Link);


