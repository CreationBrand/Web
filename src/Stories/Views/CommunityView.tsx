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
import CommunityPane from 'Stories/Pane/CommunityPane'
import Icon from 'Stories/Bits/Icon/Icon'

const C = {
    container: css({
        height: 'calc(100% - 50px)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    }),
}

const CommunityView = () => {
    // navagation
    let params = useParams()

    //state
    let [contentState, setFlow] = useRecoilState(contentFlow)
    const [filter, setFilter] = useState('hot')

    const [error, loading, data] = useSocketRequest('community', {
        community_id: params.community_id,
    })

    // UPDATE CONTROL STATE
    useEffect(() => {
        if (data.status === 'ok') {
            colorLog('[STATE] Setting Content Flow', 'info')
            setFlow({
                type: 'community',
                title: data.community.title,
                public_id: data.community.public_id,
                roleSet: data.roleSet,
                roles: data.roles,
            })
        }
    }, [data])

    // UPDATE LIST STATE
    const list = usePullPosts(params.community_id, filter)

    if (loading) return <div></div>
    if (error) return <div>Error: {error}</div>

    return (
        <div id="VIEW" css={C.container}>
            <DynamicVirtual rows={[
            <CommunityPane data={data.community}></CommunityPane>
            , <FilterPane value={filter} onChange={setFilter} />, ...list]} />
            <PostControlBar />
        </div>
    )
}

export default CommunityView
