
import { postList, postSync } from "@/state/sync";
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { socketRequest } from "./util/useSocket";
import Post from "@/components/chunks/Post/Post";
import ChunkError from "@/components/bits/ChunkError";
import { socketFlow } from "@/state/flow";

let end: boolean = false

const usePostList = (type: string, community_id: any, filter: any) => {

    const [components, setComponents]: any = useRecoilState(postList)
    const [cursor, setCursor] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const socket = useRecoilValue(socketFlow)

    useEffect(() => {
        end = false
        setIsLoading(true)
        setCursor(false)
        setComponents([])
    }, [community_id, filter])

    useEffect(() => {

        (async () => {
            try {
                if (end || isError || socket !== 'connected') return
                let req: any = await socketRequest('posts', { type: type, id: community_id, filter, cursor: cursor })
                if (req?.posts?.length < 10) end = true
                setList(req.posts)
            } catch (e) {
                setIsError(true)
                setIsLoading(false)
            }
        })()
    }, [community_id, cursor, filter, end, socket])

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

        else if (filter === 'BEST') return setCursor(last[last.length - 1].props.hot)
        else if (filter === 'NEW') return setCursor(last[last.length - 1].props.created_at)
        else if (filter === 'TOP') return setCursor(last[last.length - 1].props.karma)
        else if (filter === 'TOPY') return setCursor(last[last.length - 1].props.karma)
        else if (filter === 'TOPM') return setCursor(last[last.length - 1].props.karma)
        else if (filter === 'TOPD') return setCursor(last[last.length - 1].props.karma)
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