
import { startTransition, useEffect, useState } from "react"
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
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    // const [resetState, setResetState] = useRecoilState(resetAllAtoms);

    useEffect(() => {
        end = false
        setIsLoading(true)
        setCursor(false)
        setComponents([])
        // setResetState({});
    }, [community_id, filter])

    useEffect(() => {

            (async () => {
                try {
                    if (end || isError) return
                    if (cache.has(`posts:${community_id}:${filter}:${cursor}`)) {
                        return setList(cache.get(`posts:${community_id}:${filter}:${cursor}`))
                    }

                    let req: any = await socketRequest('posts', { community_id, filter, cursor: cursor })
                    console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `(${req?.posts?.length}) Posts Cursor:${cursor}`);

                    if (req?.posts?.length < 10) end = true
                    setList(req.posts)
                    cache.set(`posts:${community_id}:${filter}:${cursor}`, req.posts)
                } catch (e) {
                    setIsError(true)
                    setIsLoading(false)
                }
            })()
    }, [community_id, cursor, filter, end])

    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {

            let batch: any = []
            for (let i = 0; i < listItems?.length; i++) {
                listItems[i].visibility = true
                set(postSync(listItems[i].public_id), listItems[i]);
                batch.push(<Post key={i} view='list' {...listItems[i]} />)
            }
            set(postList, (oldList: any) => [...oldList, batch])
            setIsLoading(false)
        },
        []
    );

    const fetchNext = async () => {

        if (end || isError) return
        if (components?.length === 0) return


        let last: any = components[components.length - 1]
        if (!last[last.length - 1]) return
        if (last.length === 0) return
        if (filter === 'none') return setCursor(last[last.length - 1].props.hot)
        if (filter === 'group') return setCursor(last[last.length - 1].props.hot)
        else if (filter === 'HOT') return setCursor(last[last.length - 1].props.hot)
        else if (filter === 'NEW') return setCursor(last[last.length - 1].props.created_at)
        else if (filter === 'TOP') return setCursor(last[last.length - 1].props.karma)
    }

    const onReset = () => {
        try {
            let last: any = components[components.length - 1]
            if (filter === 'none') return setCursor(last[last.length - 1].props.hot)
            if (filter === 'group') return setCursor(last[last.length - 1].props.hot)
            else if (filter === 'HOT') return setCursor(last[last.length - 1].props.hot)
            else if (filter === 'NEW') return setCursor(last[last.length - 1].props.created_at)
            else if (filter === 'TOP') return setCursor(last[last.length - 1].props.karma)
        }
        catch (e) {
            console.log(e)
        }

    }


    return [isLoading, isError, components.concat(<ChunkError variant={end ? 'end' : 'loading'} onLoad={fetchNext} reset={onReset} />)]
}



export default usePostList