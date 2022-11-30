/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import useSocketRequest from 'Hooks/useSocketRequest'

import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { contentFlow } from 'State/Flow'
import { useEffect, useState } from 'react'
import colorLog from 'Util/colorLog'

import ComPreview from 'Stories/Objects/ComPreview/ComPreview'
import PostControlBar from 'Stories/MOC/PostControlBar'

import Loading from 'Stories/Objects/Loading/Loading'
import FilterPane from 'Stories/Pane/FilterPane'
import DynamicVirtual from 'Stories/Pure/DynamicVirtual/DynamicVirtual'
import { usePullPosts } from 'Hooks/usePullList'

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

const DefaultView = ({ type }: any) => {
    // navagation
    let params = useParams()

    //state
    let [contentState, setFlow] = useRecoilState(contentFlow)

    // UPDATE CONTROL STATE
    useEffect(() => {
        // if (data.status === 'ok') {
        colorLog('[STATE] Setting Content Flow', 'info')
        setFlow({
            type: 'default',
            title: 'hot'
            // roleSet: data.roleSet,
            // roles: data.roles
        })
    }, [type])

    // UPDATE LIST STATE
    const list = usePullPosts(type, 'null')

    return (
        <div id="VIEW" css={C.container}>
            <DynamicVirtual rows={list} />
        </div>
    )
}

export default DefaultView
