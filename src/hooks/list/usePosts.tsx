
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import ChunkError from '@/components/bits/ChunkError';
import Post from '@/components/chunks/Post/Post';
import { postList, postSync } from '@/state/sync';
import { socketRequest } from '../util/useSocket';
import { socketFlow } from '@/state/flow';


const usePosts = (type: string, community_id: any, filter: any) => {

    const [isLoading, setIsLoading] = useState(true)
    const [components, setComponents]: any = useRecoilState(postList)
    const [cursor, setCursor]: any = useState(false)
    const socket = useRecoilValue(socketFlow)

    useEffect(() => {
        setCursor(false)
        setIsLoading(true)
        setComponents([])
    }, [community_id, filter, type])

    useEffect(() => {
        if (cursor === null || socket !== 'connected' || !community_id || !type) return

        (async () => {
            let req: any = await socketRequest('posts', { type: type, id: community_id, filter, cursor: cursor })
            if (req?.posts?.length < 10) setCursor(null)
            setList(req.posts)
            setIsLoading(false)
        })()

    }, [cursor, community_id, filter, type, socket])

    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            for (let i = 0; i < listItems?.length; i++) {
                listItems[i].visibility = true
                set(postSync(listItems[i].public_id), listItems[i]);
                set(postList, (oldList: any) => [...oldList, <Post view='list' key={i} {...listItems[i]} />])
            }
        },
        []
    );

    const fetchNext = async () => {
        if (components?.length === 0 || cursor === null) return
        else if (filter === 'BEST') return setCursor(components[components.length - 1].props.hot)
        else if (filter === 'NEW') return setCursor(components[components.length - 1].props.created_at)
        else if (filter === 'TOP') return setCursor(components[components.length - 1].props.karma)
        else if (filter === 'TOPY') return setCursor(components[components.length - 1].props.karma)
        else if (filter === 'TOPM') return setCursor(components[components.length - 1].props.karma)
        else if (filter === 'TOPD') return setCursor(components[components.length - 1].props.karma)
    }


    return [isLoading, false, components.concat(<ChunkError variant={cursor !== null ? 'loading' : 'end'} onLoad={fetchNext} />)]
}


export default usePosts
