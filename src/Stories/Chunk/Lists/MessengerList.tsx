/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import VirtualList from 'Stories/Chunk/VirtualList/VirtualList'
import usePullMessages from 'Hooks/usePullMessages'
import { memo, useEffect } from 'react'
import MessagePane from 'Stories/Pane/messagePane'
import useMessenger from 'Hooks/Pull/useMessenger'
import MessengerControl from 'Stories/Bits/MessengerFilter/MessengerControl'

const C = {
    container: css({
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        marginTop: '8px',
        padding: '0px 16px',
        borderRadius: '8px',
        flexDirection: 'column-reverse',
        backgroundColor: '#272732',
        transform: 'rotate(180deg)',
    })
}

const MessengerList = () => {

    const params = useParams()

    const [isLoading1, isError1, pane, status] = useMessenger(params.messenger_id)
    const [isLoading, isError, list] = usePullMessages(params.messenger_id)




    if (isError) return <ChunkError />

    return (
        <motion.div
            id="messenger-list"
            key={params.messenger_id}
            css={C.container}
            transition={{ duration: 0.8, type: 'spring' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {pane}
            <VirtualList
                list={list}
                offset={76}
                flip
            />

            {status === 'active' ?
                <MessagePane messenger_id={params.messenger_id} /> :
                <MessengerControl messenger_id={params.messenger_id} status={status} />}

        </motion.div>
    )
}


export default memo(MessengerList)