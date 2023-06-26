/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { socketRequest } from "Service/Socket";

import ChunkError from "Stories/Bits/ChunkError/ChunkError";
import Comment from "Stories/Chunk/Comment/Comment";
import TTLCache from '@isaacs/ttlcache';
import { commentList, commentSync } from "State/commentAtoms";
const cache = new TTLCache({ max: 10000, ttl: 60000 })

let end: boolean = false

const usePostList = (post_id: any) => {

    const [components, setComponents]: any = useRecoilState(commentList)

    const [cursor, setCursor] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const filter = 'HOT'
    // const [resetState, setResetState] = useRecoilState(resetAllAtoms);

    useEffect(() => {
        end = false
        setCursor(false)
        setComponents([])
        // setResetState({});
        console.log('%c [RESET] ', 'font-weight: bold; color: #F00', 'CommentList');
    }, [post_id])

    useEffect(() => {
        (async () => {
            try {
                if (end || isError) return
                if (cache.has(`comments:${post_id}:${filter}:${cursor}`)) {
                    console.log('%c [CACHE] ', 'font-weight: bold; color: #FF0', `Comments Cursor:${cursor}`);
                    return setList(cache.get(`comments:${post_id}:${filter}:${cursor}`))
                }
                let req: any = await socketRequest('comments', { post_id, filter, cursor: cursor })
                console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `(${req?.comments?.length}) Comments Cursor:${cursor}`);
                if (req?.comments?.length < 25) end = true
                setList(req.comments)
                cache.set(`comments:${post_id}:${filter}:${cursor}`, req.comments)
            } catch (e) {
                setIsError(true)
            }
        })()
    }, [post_id, cursor, filter])

    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {

            for (let i = 0; i < listItems?.length; i++) {
                try {
                    let parts = listItems[i].path.split('.')
                    listItems[i].id = parts[listItems[i].depth - 1]
                    listItems[i].visibility = true
                    listItems[i].active = false
                    if (2 === listItems[i + 1].depth) {
                        listItems[i].last = true
                    }
                } catch (e) { listItems[i].last = true }

                try {
                    listItems[i].hasChildren = listItems[i + 1].depth > listItems[i].depth
                } catch (e) { listItems[i].hasChildren = false }

                set(commentSync(listItems[i].public_id), listItems[i]);
                set(commentList, (oldList: any) => [...oldList, <Comment {...listItems[i]} />])

            }


        }, []
    );

    const fetchNext = async () => {
        if (end || isError) return
        if (components?.length === 0) return
        let last: any = components[components.length - 1]
        if (!last[last.length - 1]) return
        if (last.length === 0) return
        else if (filter === 'HOT') return setCursor(last[last.length - 1].props.hot)
        else if (filter === 'NEW') return setCursor(last[last.length - 1].props.created_at)
        else if (filter === 'TOP') return setCursor(last[last.length - 1].props.karma)
    }

    let temp = components.length > 0 ? [<div
        css={{
            width: '100%',
            background: '#272732',
            borderTopRightRadius: '8px',
            borderTopLeftRadius: '8px',
            height: '8px',
            marginTop: '8px',
        }}
    />, ...components, <div
        css={{
            width: '100%',
            background: '#272732',
            borderBottomRightRadius: '8px',
            borderBottomLeftRadius: '8px',
            height: '16px',
        }}
    />] : []


    return [isLoading, isError, temp.concat(<ChunkError variant={end ? 'end' : 'loading'} onLoad={fetchNext} />)]
}



export default usePostList