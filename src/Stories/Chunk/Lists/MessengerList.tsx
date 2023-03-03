/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import ControlBar from '../ControlBar/ControlBar'
import VirtualList from 'Stories/Chunk/VirtualList/VirtualList'
import usePullMessages from 'Hooks/usePullMessages'


const C = {
    container: css({
        height: '100%',
        padding: '20px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    })
}

const MessengerList = () => {

    const params = useParams()


    console.log(params)
    const [error, list] = usePullMessages(params.messenger_id)


    console.log(list)
    if (error) return <ChunkError />

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
                list={[list]}
            />

            <ControlBar />
        </motion.div>
    )
}


export default MessengerList