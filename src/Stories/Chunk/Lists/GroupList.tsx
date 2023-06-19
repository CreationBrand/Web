/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo, } from 'react'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import VirtualList from '../VirtualList/VirtualList'
import { useParams } from 'react-router-dom'
import usePullGroups from 'Hooks/usePullGroups'
import useCommunityFlow from 'Hooks/useCommunityFlow'
import usePullGroup from 'Hooks/usePullGroup'

const C = {
    container: css({
        height: '100%',
        width: '100%',
        position: 'absolute',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 50,
    })
}

const GroupList = () => {

    const params = useParams()
    const [error1, group, data] = usePullGroup(params.group_id)
    // const [error, list] = usePullGroups(params.group_id, 'none', 'global')






    return (
        <motion.div
            key={params.group_id}
            css={C.container}
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
>
            <VirtualList public_id={params.group_id} list={[group]} />
        </motion.div>
    )
}


export default memo(GroupList)