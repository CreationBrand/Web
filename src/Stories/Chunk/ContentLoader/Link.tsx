/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { getLinkPreview, } from "link-preview-js";
import { memo } from 'react'
import { useQuery } from '@tanstack/react-query';
import Walk from 'Stories/Bits/ChunkError/Walk';
import Player from './Player';
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
    loading: css({
        width: "100%",
        height: '400px',
        display: "flex",
        gap: "8px",
        background: '#181820 !important',
        padding: "8px",
        borderRadius: "8px",
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
        flexGrow: 1,
        // "display": "-webkit-box",
        // "overflow": "hidden",
        "textOverflow": "ellipsis",
        // "webkitLineClamp": "2",
        // "webkitBoxOrient": "vertical"
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
        e.preventDefault();
        e.stopPropagation();
        //@ts-ignore
        if (url) window.open(url, '_blank').focus();
    }


    // console.log('DATA', data)

    try {



        if (isLoading) return <div css={C.loading}><Walk variant='loading' /></div>

        else if (data?.siteName === 'YouTube') { }
        else if (data?.siteName === 'Twitch') { }
        else if (data?.siteName === 'Twitter') { }
        // IMAGE FIRST (FOR GIFS)
        else if (["GIPHY", "Tenor"].includes(data?.siteName)) {
            if (data?.images?.length) return <Image url={`${proxy}/${data?.images[0]}`} />
            else if (data?.videos?.length) {
                let video = data.videos[0].url
                if (video.includes('.gif')) return <Image url={`${proxy}/${video}`} />
                else return <Player url={`${proxy}/${video}`} />
            }
        }

        //VIDEO FIRST (FOR VIDEOS)
        else if (["GIPHY", "Tenor", "HARDGIF.COM", "EPORNER.COM", "RedGIFs", "Imgur", "Porn Giphy"].includes(data?.siteName)) {
            if (data?.videos?.length) {
                let video = data.videos[0].url
                let fallback = data?.images?.length ? data?.images[0] : null
                if (video.includes('.gif')) return <Image url={`${proxy}/${video}`} />
                else return <Player url={`${proxy}/${video}`} fallback={fallback} />
            }
            else if (data?.images?.length) return <Image url={`${proxy}/${data?.images[0]}`} />
        }

        else if (data?.contentType === "application/x-mpegurl") return <Player url={`${proxy}/${url}`} />
        else if (data?.videos.length && data?.videos[0]?.url) return <Player url={`${proxy}/${data?.videos[0]?.url}`} />

        if (!data.siteName || data?.title === 'title') return <div css={C.container}><Walk variant='error' /></div>


        return (<div css={C.container} onClick={handleClick}>
            {data?.images?.length && <img src={data?.images[0]} css={C.image} loading="lazy" />}
            <div css={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                {data?.title && <div css={C.title}>{data?.title}</div>}
                {data?.description && <div css={C.desc}>{data?.description}</div>}
            </div>
        </div>)

    } catch (e) {
        return <div css={C.container}> <Walk variant='error' /> </div>
    }


};



export default memo(Link);


