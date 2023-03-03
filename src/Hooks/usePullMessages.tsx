


import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil";
import { socketRequest } from "Service/Socket";
import { messageListData, postListData } from "State/Data";
import { colorLog } from "Util";
import Message from "Stories/Objects/Message/Message";

const usePullMessages = (messenger_id: any) => {
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

    return [error, list]
}


export default usePullMessages