/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import useSocketRequest from 'Hooks/useSocketRequest'
import { useParams } from 'react-router-dom'
import {
    useGetRecoilValueInfo_UNSTABLE,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState
} from 'recoil'
import { socketFlow } from 'State/Flow'
import ControlBar from 'Stories/Objects/ControlBar/ControlBar'
import DynamicVirtual from 'Stories/Pure/DynamicVirtual/DynamicVirtual'
import { heading2, normal } from 'Stories/Bits/Text/Text'

import { contentFlow } from 'State/Flow'
import { useEffect, useState } from 'react'
import colorLog from 'Util/colorLog'
import { activeListData } from 'State/Data'
import { socketRequest } from 'Service/Socket'
import Post from 'Stories/Objects/Post/Post'

const C = {
    container: css({
        height: 'calc(100% - 50px)',
        position: 'relative',
        overflow: 'hidden'
    })
}

const Default = ({ type }: Props) => {
    // navagation
    let params = useParams()

    //state
    let [page, setPage] = useState(0)
    let [activeList, setActiveList]: any = useRecoilState(activeListData)
    let [contentState, setFlow] = useRecoilState(contentFlow)

    useEffect(() => {
        colorLog('[STATE] Setting Content Flow', 'info')
        setFlow({
            type: 'default',
            title: type,
            page: 0
        })
    }, [type])

    useEffect(() => {
        ;(async () => {
            let req: any = await socketRequest(`${type}-list`, {
                page: page
            })
            if (req.status === 'ok') {
                //create posts
                let posts = []
                for (var i in req.posts) {
                    posts.push(<Post data={req.posts[i]} />)
                }
                if (page === 0) {
                    await setActiveList([posts])
                } else {
                    await setActiveList([...activeList, posts])
                }
            }
        })()
    }, [page, params.public_id])

    const list = [...activeList]

    return (
        <div id="COMMUNITY" css={C.container}>
            <DynamicVirtual rows={list} />
            <ControlBar />
        </div>
    )
}

export default Default

interface Props {
    type: string
}
