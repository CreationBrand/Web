
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { socketRequest } from "Service/Socket";
import { postFilter } from "State/filterAtoms";
import { postList, postSync, resetAllAtoms } from "State/postAtoms";
import ChunkError from "Stories/Bits/ChunkError/ChunkError";
import Post from "Stories/Chunk/Post/Post";

import TTLCache from '@isaacs/ttlcache';
const cache = new TTLCache({ max: 10000, ttl: 60000 })

let end: boolean = false

const usePostList = (community_id: any, filter: any) => {

    const [components, setComponents]: any = useRecoilState(postList)

    const [cursor, setCursor] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [resetState, setResetState] = useRecoilState(resetAllAtoms);

    useEffect(() => {
        end = false
        setCursor(false)
        setComponents([])
        setResetState({});

    }, [community_id, filter])

    useEffect(() => {
        (async () => {
            if (end) return
            if (cache.has(`posts:${community_id}:${filter}:${cursor}`)) return setList(cache.get(`posts:${community_id}:${filter}:${cursor}`))

            let req: any = await socketRequest('posts', { community_id, filter, cursor: cursor })
            console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `(${req?.posts?.length}) Posts Cursor:${cursor}`);

            if (req?.posts?.length < 25) end = true
            setList(req.posts)
            cache.set(`posts:${community_id}:${filter}:${cursor}`, req.posts)
        })()
    }, [community_id, cursor])

    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            for (let i = 0; i < listItems?.length; i++) {
                set(postSync(listItems[i].public_id), listItems[i]);
                set(postList, (oldList: any) => [...oldList, <Post {...listItems[i]} />])
            }
        },
        []
    );

    const fetchNext = async () => {
        if (components?.length === 0) return
        if (filter === 'none') return setCursor(components[components.length - 1].props.hot)
        else if (filter === 'HOT') return setCursor(components[components.length - 1].props.hot)
        else if (filter === 'NEW') return setCursor(components[components.length - 1].props.created_at)
        else if (filter === 'TOP') return setCursor(components[components.length - 1].props.karma)
    }

    return [isLoading, isError, components.concat(<ChunkError variant={!end ? 'loading' : 'end'} onLoad={fetchNext} />)]
}



export default usePostList