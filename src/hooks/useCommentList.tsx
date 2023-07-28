/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


import ChunkError from '@/components/bits/ChunkError';
import { commentList, commentSync } from '@/state/sync';
import { cache } from 'joi';

import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { socketRequest } from './util/useSocket';
import Comment from '@/components/chunks/Comment/Comment';
import { socketFlow } from '@/state/flow';
import { bg_3 } from '@/global/var';

let end: boolean = false

const usePostList = (post_id: any) => {

    const socket = useRecoilValue(socketFlow)
    const [components, setComponents]: any = useRecoilState(commentList)
    const [cursor, setCursor] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const filter = 'HOT'

    useEffect(() => {
        end = false
        setCursor(false)
        setComponents([])
        setIsLoading(true)
    }, [post_id])

    useEffect(() => {
        if (!post_id || socket !== 'connected') return

        (async () => {
            try {
                if (end || isError) return

                let req: any = await socketRequest('comments', { post_id, filter, cursor: cursor })
                // console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `(${req?.comments?.length}) Comments Cursor:${cursor}`);
                if (req?.comments?.length < 25) end = true
                setList(req.comments)
            } catch (e) {
                setIsError(true)
            }
        })()
    }, [cursor, socket])

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
                set(commentList, (oldList: any) => [...oldList, <Comment {...listItems[i]} key={i} />])

            }

            setIsLoading(false)

        }, []
    );

    const fetchNext = async () => {
        if (end || isError) return
        if (components?.length === 0) return
        let last: any = components[components.length - 1]
        return setCursor(last.props.sort_path)
    }

    let temp = components.length > 0 ? [<div
        css={{
            width: '100%',
            background: bg_3,
            borderTopRightRadius: '8px',
            borderTopLeftRadius: '8px',
            height: '8px',
            marginTop: '8px',
        }}
    />, ...components, <div
        css={{
            width: '100%',
            background: bg_3,
            borderBottomRightRadius: '8px',
            borderBottomLeftRadius: '8px',
            height: '16px',
        }}
    />] : []




    return [isLoading, isError, temp.concat(<ChunkError key='error' variant={end ? 'end' : 'loading'} onLoad={fetchNext} onReset={fetchNext} />)]
}



export default usePostList