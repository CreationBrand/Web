import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil";
import { socketRequest } from "Service/Socket";
import { postListData } from "State/Data";
import Post from "Stories/Chunk/Post/Post";
import LoaderPane from "Stories/Pane/loaderPane";


const usePullGroups = (group_id: any, filter: string, varient: string) => {

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
    }, [group_id, filter])


    // fetch posts
    useEffect(() => {
        if (!group_id || !filter) return

        const fetchMore = async () => {

            let req: any = await socketRequest('post-group', {
                group_id: group_id,
                filter: filter,
                page: page.data,
            })

            console.log(req)

            if (req === false || req.status === 'error') setError(true)

            if (req.status === 'ok') {
                if (req.posts.length < 25) setEnd(true)
                let posts = []

                for (var i in req.posts) {
                    posts.push(<Post varient={varient} {...req.posts[i]} />)
                }

                if (page.data === 0) setList(posts)
                else await setList([...list, posts])
            }
        }
        if (end === false) fetchMore().catch((err) => console.log(err))
    }, [page])

    if (end === false) return [error, list.concat(<LoaderPane />)]
    return [error, list] as const;
}

export default usePullGroups