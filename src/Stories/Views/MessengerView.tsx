/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import useSocketRequest from 'Hooks/useSocketRequest'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { contentFlow } from 'State/Flow'
import { useEffect, useState } from 'react'
import colorLog from 'Util/colorLog'
import PostControlBar from 'Stories/MOC/PostControlBar'
import Loading from 'Stories/Objects/Loading/Loading'
import FilterPane from 'Stories/Pane/FilterPane'
import DynamicVirtual from 'Stories/Pure/DynamicVirtual/DynamicVirtual'
import { usePullComments, usePullMessages } from 'Hooks/usePullList'
import Post from 'Stories/Objects/Post/Post'
import { Button } from '@mui/material'
import { socketRequest } from 'Service/Socket'

const C = {
    container: css({
        height: 'calc(100% - 50px)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    })
}

const MessengerView = () => {
    // navagation
    let params = useParams()

    //state
    let [contentState, setFlow] = useRecoilState(contentFlow)


    const [error, loading, data] = [false, false, []]
    // const [error, loading, data] = useSocketRequest('post', {
    //     community_id: params.community_id,
    //     post_id: params.post_id
    // })

    // UPDATE CONTROL STATE
    // useEffect(() => {
    //     if (data.status === 'ok') {
    //         colorLog('[STATE] Setting Content Flow', 'info')
    //         setFlow({
    //             type: 'post'
    //             // title: data.community.title,
    //             // public_id: data.community.public_id,
    //             // roleSet: data.roleSet,
    //             // roles: data.roles
    //         })
    //     }
    // }, [data])

    // UPDATE LIST STATE
    // const list = usePullMessages(params.messenger_id)

    if (loading) return <Loading />
    if (error) return <div>Error: {error}</div>
    // if (data.status !== 'ok') return <div>Something went wrong</div>

    return (
        <div id="VIEW" css={C.container}>

            <Button onClick={()=>{
                console.log('requesting')
 let req = socketRequest('test', {})




            }}>asdfasdf</Button>
            {/* <DynamicVirtual rows={[...list]} /> */}
        </div>
    )
}

export default MessengerView
