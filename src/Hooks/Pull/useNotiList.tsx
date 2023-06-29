/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useEffect, useState } from "react"
import { useRecoilState, useRecoilTransaction_UNSTABLE } from "recoil";
import { socketRequest } from "Service/Socket";
import { resetAllAtoms } from "State/postAtoms";
import ChunkError from "Stories/Bits/ChunkError/ChunkError";
import TTLCache from '@isaacs/ttlcache';
import { notiList } from "State/notiAtoms";
import Noti from 'Stories/Chunk/Noti/Noti';


const cache = new TTLCache({ max: 10000, ttl: 60000 })

let end: boolean = false

const useNotiList = () => {

    const [components, setComponents]: any = useRecoilState(notiList)

    const [cursor, setCursor] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [resetState, setResetState] = useRecoilState(resetAllAtoms);

    useEffect(() => {
        end = false
        setCursor(false)
        setComponents([])
        setResetState({});

    }, [])

    useEffect(() => {
        (async () => {
            if (end) return
            let req: any = await socketRequest('notis', { cursor: cursor })
            console.log('%c [FETCH] ', 'font-weight: bold; color: #0F0', `(${req?.noti?.length}) Noti Cursor:${cursor}`);
            if (req?.noti?.length < 25) end = true
            setList(req.noti)
        })()
    }, [cursor])

    const setList = useRecoilTransaction_UNSTABLE(
        ({ set }) => (listItems: any) => {
            let temp: any = []
            for (let i = 0; i < listItems?.length; i++) {
                temp.push(<Noti {...listItems[i]} />)
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