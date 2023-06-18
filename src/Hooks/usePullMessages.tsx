


import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { socketRequest } from "Service/Socket";
import { messageListData, notificationStateFamily } from "State/Data";
import { socketFlow } from "State/Flow";
import Message from "Stories/Chunk/Message/Message";
import { socket as socketC } from "Service/Socket";
import useClearNotif from "./useClearNotif";
import ChunkError from "Stories/Bits/ChunkError/ChunkError";

let end = false

const usePullMessages = (messenger_id: any) => {
    // state
    const [socket, setSocket] = useRecoilState(socketFlow)
    const [last, setLast] = useState(null)
    const [cursor, setCursor]: any = useState(false)
    const [components, setComponents]: any = useRecoilState(messageListData)
    const queryClient = useQueryClient()
    useClearNotif(messenger_id)

    const notifs = useRecoilValue(notificationStateFamily(messenger_id))
    const set = useSetRecoilState(notificationStateFamily(messenger_id))

    const fetch = async ({ pageParam = false }: any) => {
        let req: any = await socketRequest('messages', { messenger_id, cursor: pageParam })
        return req.messages
    }


    useEffect(() => {
        end = false
        setComponents([])
        setCursor(false)
    }, [messenger_id])


    useEffect(() => {
        if (notifs && notifs > 0) {
            set(0)
            socketRequest('notif-clear', { notif_id: messenger_id })
        }
    }, [notifs])


    useEffect(() => {
        if (!messenger_id) return

        function deltaEvent(data: any) {
            //@ts-ignore
            if (!data?.type === 'message' || data.messenger_id !== messenger_id) return
            setComponents((currentState: any) => [
                <Message props={data.message} />,
                ...currentState,
            ]);
        }
        socketC.on('notif', deltaEvent);
        return () => {
            socketC.off('notif', deltaEvent);
        };
    }, []);


    const {
        data,
        isError,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        enabled: socket === 'connected' || !end,
        queryKey: ['message-list', messenger_id, cursor],
        queryFn: fetch,
        getNextPageParam: (lastPage, pages) => {
            if (!lastPage) return
            if (lastPage.length < 25) {
                end = true
                return undefined
            }
            return lastPage[lastPage.length - 1].created_at
        },

        onSuccess: (data: any) => {
            if (!data || data === undefined || data.pages.length === 0) return
            if (!data || data === undefined || data.pages.length === 0) return

            const temp = []
            for (let i in data.pages) {
                for (let j in data.pages[i]) {
                    temp.push(<Message props={data.pages[i][j]} />)
                }
            }
            setComponents(temp)
        },
    })






    return [isLoading, isError, components.concat(<ChunkError variant={hasNextPage ? 'loading' : 'end'} onLoad={fetchNextPage} />)]
}


export default usePullMessages


