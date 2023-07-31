
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useEffect, useState } from "react"
import { useRecoilValue } from "recoil";
import { socketRequest } from '../util/useSocket';
import { socketFlow } from '@/state/flow';



const useAllCommunitys = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [components, setComponents]: any = useState([])
    const [cursor, setCursor]: any = useState(false)
    const socket = useRecoilValue(socketFlow)

    useEffect(() => {
        setCursor(false)
        setIsLoading(true)
        setComponents([])
    }, [])

    useEffect(() => {
        if (cursor === null || socket !== 'connected') return

        (async () => {
            let req: any = await socketRequest('community-all', { cursor: cursor })
            if (req?.communities?.length < 35) setCursor(null)
            const batch = []

            for (var i in req?.communities) {
                batch.push(req?.communities[i])
            }

            setComponents(components.concat(batch))

            setIsLoading(false)
        })()

    }, [cursor, socket])


    const fetchNext = async () => {
        if (components?.length === 0 || cursor === null) return
        setCursor(components[components.length - 1].props.subscribers)

    }


    return [isLoading, false, components]
}


export default useAllCommunitys


