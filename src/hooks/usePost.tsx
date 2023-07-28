
import Post from "@/components/chunks/Post/Post";
import { postSync } from "@/state/sync";
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE, useRecoilValue, } from "recoil";
import { socketRequest } from "./util/useSocket";
import { socketFlow } from "@/state/flow";



let end: boolean = false

const usePost = (post_id: any) => {

    const [components, setComponents]: any = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [inSync, setSync] = useRecoilState(postSync(post_id))
    const socket = useRecoilValue(socketFlow)

    // useEffect(() => {
    //     end = false
    //     setIsLoading(true)
    //     setIsError(false)
    //     setComponents([])
    // }, [])

    useEffect(() => {
        if (!post_id || socket !== 'connected') return

        (async () => {
            if (inSync?.public_id) {
                setComponents(<Post key='post' view='post' {...inSync} />)
                setIsLoading(false)
                return
            }

            try {
                if (end || isError) return

                let req: any = await socketRequest('post', { post_id: post_id })
                console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `Post: ${post_id}`);
                req.post.visibility = true
                setComponents(<Post key='post' view='post' {...req?.post} />)
                setList(req?.post)
                setIsLoading(false)

            } catch (e) { setIsError(true) }
        })()
    }, [post_id, socket])

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