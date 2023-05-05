/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import usePullCommunity from 'Hooks/usePullCommunity'
import usePullPosts from 'Hooks/usePullPosts'
import { memo, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import FilterPane from 'Stories/Pane/FilterPane'
import DynamicVirtual from 'Stories/Pure/DynamicVirtual/DynamicVirtual'
import ControlBar from '../ControlBar/ControlBar'

import VirtualList from 'Stories/Chunk/VirtualList/VirtualList'
import { useRecoilState } from 'recoil'
import { contentFlow } from 'State/Flow'


const C = {
    container: css({
        height: '100%',
        // padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    })
}

const CommunityList = () => {

    const params = useParams()
    const [filter, setFilter] = useState('HOT')

    const [contentState, setContent] = useRecoilState(contentFlow)

    const [error1, pane, data] = usePullCommunity(params.community_id)
    const [error, list] = usePullPosts(params.community_id, filter, 'community')


    useEffect(() => {
        // setContent(data)

        if(!data) return

        setContent({
            public_id: data.community?.public_id,
            roleSet: data.roleSet,
            role: data.roles,
            title: data.community.title,
            type: 'community',
            active: true,
        })



}, [data])

if (error || error1) return <ChunkError />



return (
    <motion.div
        key={params.community_id}
        css={C.container}
        transition={{ duration: 0.4 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <VirtualList
            list={[
                pane,
                <FilterPane value={filter} onChange={setFilter} />, ...list]}
        />
    </motion.div>
)
}


export default CommunityList