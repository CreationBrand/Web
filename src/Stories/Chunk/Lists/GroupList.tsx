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
import usePostList from 'Hooks/Pull/usePostList'

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

const GroupList = ({ group_id }:any) => {




    // const params = useParams()


    // const [isError1, group, data] = usePullGroup(params.group_id)
    const [isLoading, isError, components]: any = usePostList(group_id, 'group')


    // if (isError1 || isError) return <ChunkError variant='error' />
    // if (isLoading) return <ChunkError variant='loading' />

    // console.log('GroupList')
    // console.log(params)

    console.log('GroupList')

    return (
        <motion.div
            // key={params.group_id}
            css={C.container}
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
        >
            <VirtualList list={components} overscan={0} />
        </motion.div>
    )
}


export default memo(GroupList)