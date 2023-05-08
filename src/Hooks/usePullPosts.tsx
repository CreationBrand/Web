import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil";
import { socketRequest } from "Service/Socket";
import { postListData } from "State/Data";
import MainPost from "Stories/Chunk/Post/MainPost";
import Post from "Stories/Chunk/Post/Post";
import LoaderPane from "Stories/Pane/loaderPane";


const usePullPosts = (community_id: any, filter: string, varient: string) => {


    // state
    const [list, setList]: any = useRecoilState(postListData)
    const [page, setPage] = useState({ data: 0 })
    const [end, setEnd] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    // reset list on props change
    useEffect(() => {
        setList([])
        setPage({ data: 0 })
        setEnd(false)
        setError(false)
    }, [community_id, filter])


    // fetch posts
    useEffect(() => {
        if (!community_id || !filter) return

        const fetchMore = async () => {

            let req: any = await socketRequest('posts', {
                community_id: community_id,
                filter: filter,
                page: page.data,
            })

            if (req === false || req.status === 'error') setError(true)

            if (req.status === 'ok') {
                if (req.posts.length < 25) setEnd(true)
                let posts = []

                for (var i in req.posts) {
                    posts.push(<MainPost {...req.posts[i]} />)
                }

                if (page.data === 0) setList(posts)
                else await setList([...list, posts])
            }
        }
        if (end === false) fetchMore().catch((err) => console.log(err))
    }, [page])

    if (end === false) return [error, []]
    return [error, list] as const;
}

export default usePullPosts