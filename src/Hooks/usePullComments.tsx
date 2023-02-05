


import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil";
import { socketRequest } from "Service/Socket";
import { postListData } from "State/Data";
import Post from "Stories/Chunk/Post/Post";
import LoaderPane from "Stories/Pane/loaderPane";
import { colorLog } from "Util";
import Comment from "Stories/Chunk/Comment/Comment";

const usePullComments = (comment_id: any, filter: string, varient: string) => {

    // state
    const [list, setList]: any = useRecoilState(postListData)
    const [page, setPage] = useState({ data: 0 })
    const [end, setEnd] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    // reset list on props change
    useEffect(() => {
        colorLog('[hook] Resetting List State', 'green')
        setList([])
        setPage({ data: 0 })
        setEnd(false)
        setError(false)
    }, [comment_id, filter])


    // fetch posts
    useEffect(() => {
        if (!comment_id || !filter) return

        const fetchMore = async () => {
            colorLog('[hook] Fetching comments', 'green')

            let req: any = await socketRequest('comments', {
                post_id: comment_id,
                filter: filter,
                page: page.data,
            })


            if (req === false || req.status === 'error') setError(true)

            if (req.status === 'ok') {

                if (req.comments.length < 25) setEnd(true)
                let comments: any = []


                for (var i in req.comments) {
                    comments.push(<Comment varient={'post'} {...req.comments[i]} />)
                }


                if (page.data === 0) setList(comments)
                else await setList([...list, comments])
            }
        }
        if (end === false) fetchMore().catch((err) => console.log(err))
    }, [page])


    if (end === false) return [error, list.concat(<LoaderPane />)]
    return [error, list]
}

export default usePullComments


