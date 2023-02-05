import { useEffect, useState } from "react"
import { socketRequest } from "Service/Socket";
import Post from "Stories/Chunk/Post/Post";
import LoaderPane from "Stories/Pane/loaderPane";
import { colorLog } from "Util";


const usePullPost = (post_id: any) => {

    // state
    const [data, setData]: any = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    // fetch posts
    useEffect(() => {

        if (!post_id) return

        const fetchMore = async () => {
            colorLog('[hook] Fetching Post', 'green')
            let req: any = await socketRequest('post', {
                post_id: post_id,
            })

            if (req === false || req.status === 'error') setError(true)

            if (req.status === 'ok') {
                setData(req)
                setLoading(false)
            }
        }

        fetchMore();
    }, [post_id])

    if (loading === true) return [error, <LoaderPane />];
    return [error, <Post varient="post" {...data.post} />];
}

export default usePullPost