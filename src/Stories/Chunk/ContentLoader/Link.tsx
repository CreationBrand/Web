/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { getLinkPreview, } from "link-preview-js";
import { memo } from 'react'
import { useQuery } from '@tanstack/react-query';
import Walk from 'Stories/Bits/ChunkError/Walk';
import Player from './Player';
import { ErrorBoundary } from "react-error-boundary";
import Image from './Image';

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
        "overflow": "hidden",
        "textOverflow": "ellipsis",
        "fallbacks": [
            {
                "display": "inline-block"
            }
        ],
        "webkitLineClamp": "2",
        "webkitBoxOrient": "vertical"

    }),
    title: css({
        minWidth: "0px",
        color: "#f2f2f2",
        "display": "-webkit-box",
        "overflow": "hidden",
        "textOverflow": "ellipsis",
        "webkitLineClamp": "2",
        "webkitBoxOrient": "vertical"
    }),
    desc: css({
        minWidth: "0px",
        fontSize: "12px",
        color: "#a8a5ab",

        "display": "-webkit-box",
        "overflow": "hidden",
        "textOverflow": "ellipsis",
        "webkitLineClamp": "2",
        "webkitBoxOrient": "vertical"

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
    console.log(data)


    try {


        if (isLoading) return <div css={C.container}><Walk /></div>

        else if (data?.siteName === 'EPORNER.COM' && data?.images?.length) return <Image url={`${proxy}/${data?.images[0]}`} />
        else if (data?.mediaType === "article") { }
        else if (url.slice(-4) === ".mp4") return <Player url={`${proxy}/${url}`} />
        else if (url.slice(-4) === ".gif") return <Image url={`${proxy}/${url}`} />
        else if (data?.mediaType === "video.other" && data?.siteName === 'Tenor') return <Player url={`${proxy}/${data?.videos[0]?.url}`} />
        else if (data?.mediaType === "video.other" && data?.siteName === 'YouTube') return <Player url={data?.url} />
        else if (data?.mediaType === "video.other" && data?.siteName === 'Twitch') return <Player url={`${proxy}/${data?.url}`} />
        else if (data?.mediaType === "video.other" && data?.siteName === 'Imgur') return <Player url={`${proxy}/${data?.videos[0]?.url}`} />
        else if (data?.mediaType === "video" && data.siteName === 'RedGIFs') return <Player url={`${proxy}/${data?.videos[0]?.url}`} />
        else if (data?.videos.length && data?.videos[0]?.url) return <Player url={`${proxy}/${data?.videos[0]?.url}`} />
        else if (data?.images?.length && data?.images[0]) return <Image url={`${proxy}/${data?.images[0]}`} />



        return (<div css={C.container} onClick={handleClick}>
            {data?.images?.length && <img src={data?.images[0]} css={C.image} />}
            <div css={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                {data?.title && <div css={C.title}>{data?.title}</div>}
                {data?.description && <div css={C.desc}>{data?.description}</div>}
            </div>
        </div>)

    } catch (e) {
        console.log(e)
        return <div css={C.container}> <Walk /> </div>
    }


};



export default memo(Link);


