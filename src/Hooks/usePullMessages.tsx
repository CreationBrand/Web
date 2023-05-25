


import { useQuery } from "@tanstack/react-query";
import { te } from "date-fns/locale";
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue } from "recoil";
import { socketRequest } from "Service/Socket";
import { messageListData, postListData } from "State/Data";
import { socketFlow } from "State/Flow";
import Loading from "Stories/Bits/ChunkError/Loading";
import Message from "Stories/Chunk/Message/Message";

const usePullMessages = (messenger_id: any) => {
    // state
    const [socket, setSocket] = useRecoilState(socketFlow)
    const [last, setLast] = useState(null)
    const [cursor, setCursor]: any = useState(false)
    const [components, setComponents]: any = useRecoilState(messageListData)

    const [end, setEnd] = useState(false)

    const handleEnd = (asdf: any) => {
        console.log('handleEnd')
        setCursor(last)
    }


    const { isLoading, isError, data } = useQuery({
        enabled: socket === 'connected' || !end,
        queryKey: ['post-list', messenger_id, cursor],
        queryFn: async () => {

            let req: any = await socketRequest('messages', { messenger_id, cursor: cursor })
            if (req.messages.length < 25) {
                setEnd(true)
            }

            return req
        },
        onSuccess: (data) => {
            if (!data || data === undefined || data.messages.length === 0) return

            let temp = []
            for (var i in data.messages) {
                temp.push(<Message props={data.messages[i]} />)
            }
            console.log(data.messages[data.messages.length - 1].created_at)
            setLast(data.messages[data.messages.length - 1].created_at)

            setComponents([...components, ...temp])

        },

    })






    return [isLoading, isError, components.concat(<Loading onEnd={handleEnd} />)]
}


export default usePullMessages


