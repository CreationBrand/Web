/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE } from "recoil";
import { socketRequest, socketRequestNoCache } from '../util/useSocket';
import { notiList } from '@/state/sync';
import Noti from '@/components/chunks/Noti/Noti';
import ChunkError from '@/components/bits/ChunkError';




let end: boolean = false

const useNotiList = () => {

    const [components, setComponents]: any = useRecoilState(notiList)

    const [cursor, setCursor] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

    useEffect(() => {
        end = false
        setCursor(false)
        setComponents([])

    }, [])

    useEffect(() => {
        (async () => {
            if (end) return
            let req: any = await socketRequestNoCache('notis', { cursor: cursor })
            if (req?.noti?.length < 25) end = true
            setList(req.noti)
        })()
    }, [cursor])

    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            let temp: any = []
            for (let i = 0; i < listItems?.length; i++) {
                temp.push(<Noti {...listItems[i]} key={i} />)
            }
            set(notiList, (oldList: any) => [...oldList, temp])
        },
        []
    );

    const fetchNext = async () => {
        if (components?.length === 0) return
        try {
            let last: any = components[components.length - 1]
            return setCursor(last[last.length - 1].props.created_at)
        } catch (e) { }
    }

    return [isLoading, isError, components.concat(<ChunkError variant={!end ? 'loading' : 'end'} onLoad={fetchNext} />)]
}


export default useNotiList