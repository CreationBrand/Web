
import ChunkError from "@/components/bits/ChunkError";
import Post from "@/components/chunks/Post/Post";
import { postList, postSync } from "@/state/sync";
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { socketRequest } from "../util/useSocket";
import { socketFlow } from "@/state/flow";

let end: boolean = false

const useCommunitySearch = (community_id: any, query: any) => {

    const [components, setComponents]: any = useRecoilState(postList)
    const socket = useRecoilValue(socketFlow)

    const [cursor, setCursor] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        end = false
        setCursor(false)
        setComponents([])
    }, [community_id, query])

    useEffect(() => {
        (async () => {
            if (socket !== 'connected') return
            let req: any = await socketRequest('search-community', { community_id, query, cursor: cursor })
            if (req?.posts?.length < 25) end = true
            setList(req.posts)
        })()
    }, [community_id, cursor, socket])

    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            for (let i = 0; i < listItems?.length; i++) {
                listItems[i].visibility = true
                set(postSync(listItems[i].public_id), listItems[i]);
                set(postList, (oldList: any) => [...oldList, <Post view='community' {...listItems[i]} />])
            }
        },
        []
    );



    return [isLoading, isError, components.concat(<ChunkError variant={!end ? 'loading' : 'end'} />)]
}



export default useCommunitySearch