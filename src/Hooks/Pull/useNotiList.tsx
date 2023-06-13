/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { socketRequest } from "Service/Socket";
import { postFilter } from "State/filterAtoms";
import { postList, postSync, resetAllAtoms } from "State/postAtoms";
import ChunkError from "Stories/Bits/ChunkError/ChunkError";
import Post from "Stories/Chunk/Post/Post";
import TTLCache from '@isaacs/ttlcache';
import { notiList } from "State/notiAtoms";
import Avatar from 'Stories/Bits/Avatar/Avatar';
import ContentLoader from 'Stories/Chunk/ContentLoader/ContentLoader';
import { useNavigate } from 'react-router-dom';
import CommunityTitle from 'Stories/Bits/Titles/CommunityTitle';
import Author from 'Stories/Bits/Titles/Author';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const cache = new TTLCache({ max: 10000, ttl: 60000 })

let end: boolean = false

const useNotiList = () => {

    const [components, setComponents]: any = useRecoilState(notiList)

    const [cursor, setCursor] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [resetState, setResetState] = useRecoilState(resetAllAtoms);

    useEffect(() => {
        end = false
        setCursor(false)
        setComponents([])
        setResetState({});

    }, [])

    useEffect(() => {
        (async () => {
            if (end) return
            // if (cache.has(`posts:${community_id}:${filter}:${cursor}`)) return setList(cache.get(`posts:${community_id}:${filter}:${cursor}`))

            let req: any = await socketRequest('notis', { cursor: cursor })
            console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `(${req?.noti?.length}) Noti Cursor:${cursor}`);

            if (req?.noti?.length < 25) end = true
            setList(req.noti)
            // cache.set(`posts:${community_id}:${filter}:${cursor}`, req.posts)
        })()
    }, [cursor])

    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            for (let i = 0; i < listItems?.length; i++) {
                // set(postSync(listItems[i].public_id), listItems[i]);

                set(notiList, (oldList: any) => [...oldList, <Noti {...listItems[i]} />])
            }
        },
        []
    );

    const fetchNext = async () => {
        if (components?.length === 0) return
        // if (filter === 'none') return setCursor(components[components.length - 1].props.hot)
        // else if (filter === 'HOT') return setCursor(components[components.length - 1].props.hot)
        // else if (filter === 'NEW') return setCursor(components[components.length - 1].props.created_at)
        // else if (filter === 'TOP') return setCursor(components[components.length - 1].props.karma)
    }

    return [isLoading, isError, components.concat(<ChunkError variant={!end ? 'loading' : 'end'} onLoad={fetchNext} />)]
}


const C = {
    container: css({
        width: '100%',
        display: 'flex',
        height: 'auto',
        alignItems: 'stretch',
        position: 'relative',
        marginTop: '16px',
    }),
    inner: css({
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        background: '#272732',
        padding: ' 8px',
        borderRadius: '8px',
        display: 'flex',
        cursor: 'pointer',

    }),
    left: css({
        marginRight: '8px',
    }),

    right: css({}),
    row: css({
        display: 'flex',
        gap: '4px',
        lineHeight: '20px',
        color: '#f2f3f5',
        alignItems: 'center',
    }),
}


const Noti = (props: any) => {
    let content = JSON.parse(props.content)

    const navigate = useNavigate()

    const handleClick = () => {
        if (props.type === 'comment-reply') navigate(`/c/${props?.community?.public_id}/p/${props?.post?.public_id}/c/${props?.comment?.public_id}`)
        if (props.type === 'post-reply') navigate(`/c/${props?.community?.public_id}/p/${props?.post?.public_id}/c/${content?.comment_id}`)

    }


    return <div css={C.container} onClick={handleClick}>
        <div css={C.inner}>


            <div css={C.left}>
                <Avatar public_id={props?.author?.public_id} size='medium' />
            </div>
            <div css={C.right}>
                <div css={C.row}>

                    <div>
                        {props?.author?.nickname}
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} />
                    {props?.type === 'post-reply' && <div>post</div>}
                    {props?.type === 'comment-reply' && <div>comment</div>}
                    <FontAwesomeIcon icon={faArrowRight} />
                    <div>
                        {props?.community?.title}
                    </div>

                </div>

                <ContentLoader type="text" content={content.content} />

            </div>
        </div>
    </div>
}


export default useNotiList