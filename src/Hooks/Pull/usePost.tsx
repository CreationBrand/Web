
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

const usePost = (post_id: any) => {

    const [components, setComponents]: any = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [resetState, setResetState] = useRecoilState(resetAllAtoms);

    useEffect(() => {
        end = false
        setComponents([])
    }, [post_id])

    useEffect(() => {
        (async () => {

            if (end) return
            if (cache.has(`post:${post_id}`)) {
                setComponents(<Post  {...cache.get(`post:${post_id}`)} />)
                setList(cache.get(`post:${post_id}`))
                return
            }

            let req: any = await socketRequest('post', { post_id: post_id })
            console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `Post: ${post_id}`);
            setComponents(<Post  {...req?.post} />)
            setList(req?.post)
            cache.set(`post:${post_id}`, req.post)
        })()
    }, [post_id])

    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            listItems.visibility = true
            set(postSync(listItems.public_id), listItems);
        },
        []
    );



    return [isLoading, isError, components]
}



export default usePost