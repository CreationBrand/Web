/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import VirtualList from 'Stories/Chunk/VirtualList/VirtualList'
import usePullMessages from 'Hooks/usePullMessages'
import { memo, useEffect } from 'react'
import useMessenger from 'Hooks/Pull/useMessenger'
import MessengerControl from 'Stories/Bits/MessengerFilter/MessengerControl'
import useClearNotif from 'Hooks/useClearNotif'
import ReverseList from '../VirtualList/ReverseList'
import MessagePane from 'Stories/Bits/Filter/messagePane'

const C = {
    container: css({
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 100,
        background: '#0f0e10',
    })
}

const MessengerList = () => {

    const params = useParams()

    useClearNotif(params.messenger_id)
    const [isLoading1, isError1, pane, data, status] = useMessenger(params.messenger_id)
    const [isLoading, isError, list] = usePullMessages(params.messenger_id)


    if (isError) return <ChunkError />

    return (
        <motion.div
            id="messenger-list"
            key={params.messenger_id}
            css={C.container}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >

            <ReverseList
                list={list}
                offset={76}

            />
            {pane}
            {status === 'active' || status === 'owner' ?
                <MessagePane messenger_id={params.messenger_id} /> :
                <MessengerControl messenger_id={params.messenger_id} status={status} />}

        </motion.div>
    )
}


export default memo(MessengerList)