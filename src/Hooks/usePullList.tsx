import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { socketRequest } from 'Service/Socket'
import { commentListData, messageListData, postListData } from 'State/Data'
import Post from 'Stories/Objects/Post/Post'
import LoaderPane from 'Stories/Pane/loaderPane'
import { colorLog } from 'Util'
import Comment from 'Stories/Objects/Comment/Comment'
import Message from 'Stories/Objects/Message/Message'

export const usePullPosts = (community_id: any, filter: string) => {
    // state
    const [list, setList]: any = useRecoilState(postListData)
    const [page, setPage] = useState({ data: 0 })
    const [end, setEnd] = useState(false)
    const [error, setError] = useState(false)

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
            colorLog('[FETCH] Fetching Posts', 'green')

            let req: any = await socketRequest('posts', {
                community_id: community_id,
                filter: 'new',
                page: page.data,
            })

            if (req === false || req.status === 'error') setError(true)

            if (req.status === 'ok') {
                if (req.posts.length < 25) setEnd(true)
                let posts = []

                for (var i in req.posts) {
                    posts.push(<Post preview data={req.posts[i]} />)
                }

                if (page.data === 0) setList(posts)
                else await setList([...list, posts])
            }
        }

        if (end === false) fetchMore().catch((err) => console.log(err))
    }, [page])

    if (error) return [<div>Unable to fetch posts </div>]
    if (end === false) return [list, <LoaderPane />]

    return [list]
}

export const usePullComments = (post_id: any, filter: string) => {
    // state
    const [list, setList]: any = useRecoilState(commentListData)
    const [page, setPage] = useState({ data: 0 })
    const [end, setEnd] = useState(false)
    const [error, setError] = useState(false)

    // reset list on props change
    useEffect(() => {
        setList([])
        setPage({ data: 0 })
        setEnd(false)
        setError(false)
    }, [post_id, filter])

    // fetch posts
    useEffect(() => {
        if (!post_id || !filter) return

        const fetchMore = async () => {
            colorLog('[FETCH] Fetching Comments', 'green')

            let req: any = await socketRequest('comments', {
                post_id: post_id,
                filter: filter,
                page: page.data,
            })

            if (req === false || req.status === 'error') setError(true)

            if (req.status === 'ok') {
                if (req.comments.length < 25) setEnd(true)
                let posts = []

                for (var i in req.comments) {
                    posts.push(<Comment data={req.comments[i]} />)
                }

                if (page.data === 0) setList(posts)
                else await setList([...list, posts])
            }
        }

        if (end === false) fetchMore().catch((err) => console.log(err))
    }, [page])

    if (error) return [<div>Error</div>]
    if (end === false) return [list]

    return list
}

export const usePullMessages = (messenger_id: any) => {
    // state
    const [list, setList]: any = useRecoilState(messageListData)
    const [page, setPage] = useState({ data: 0 })
    const [end, setEnd] = useState(false)
    const [error, setError] = useState(false)

    // reset list on props change
    useEffect(() => {
        setList([])
        setPage({ data: 0 })
        setEnd(false)
        setError(false)
    }, [messenger_id])

    // fetch posts
    useEffect(() => {
        if (!messenger_id) return

        const fetchMore = async () => {
            colorLog('[FETCH] Fetching Messages', 'green')

            let req: any = await socketRequest('messages', {
                messenger_id: messenger_id,
                page: page.data,
            })

            if (req === false || req.status === 'error') setError(true)

            if (req.status === 'ok') {
                if (req.messages.length < 25) setEnd(true)
                let messages = []

                for (var i in req.messages) {
                    messages.push(<Message props={req.messages[i]} />)
                }

                if (page.data === 0) setList(messages)
                else await setList([...list, messages])
            }
        }

        if (end === false) fetchMore().catch((err) => console.log(err))
    }, [page])

    if (error) return [<div>Error</div>]
    if (end === false) return [list]

    return list
}
