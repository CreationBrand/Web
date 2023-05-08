import { useEffect, useState } from "react"
import { socketRequest } from "Service/Socket";
import MainPost from "Stories/Chunk/Post/MainPost";
import Post from "Stories/Chunk/Post/Post";
import LoaderPane from "Stories/Pane/loaderPane";

var treeify = require('treeify');

const usePullPost = (post_id: any) => {

    // state
    const [data, setData]: any = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    // fetch posts
    useEffect(() => {

        if (!post_id) return

        const fetchMore = async () => {
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


    console.groupCollapsed('%c [DATA - post] ', 'background: #000; color: #5555da');
    console.log(treeify.asTree(data.post, true));
    console.groupEnd();


    return [error, <MainPost varient="post" {...data.post} />];
}

export default usePullPost