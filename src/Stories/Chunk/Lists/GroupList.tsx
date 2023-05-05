/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import usePullPosts from 'Hooks/usePullPosts'
import { memo, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { contentFlow, pageFlow } from 'State/Flow'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import VirtualList from '../VirtualList/VirtualList'
import { useParams } from 'react-router-dom'
import usePullGroups from 'Hooks/usePullGroups'
import { title } from 'process'
import usePullGroup from 'Hooks/usePullGroup'

const C = {
    container: css({
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    })
}

const GroupList = () => {

    const params = useParams()
    const [error1, group,data] = usePullGroup(params.group_id)
    const [error, list] = usePullGroups(params.group_id, 'none', 'global')




    const [contentState, setContentState] = useRecoilState(contentFlow)



    useEffect(() => {


        setContentState({
            public_id: params.group_id,
            roleSet: null,
            title: data?.group.title,
            type: 'group',
            link: 'g/' + params.group_id,
        })

    }, [data])



    if (error) return <ChunkError />




    return (
        <motion.div
            key={params.group_id}
            css={C.container}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <VirtualList list={[group, ...list]} />
        </motion.div>
    )
}


export default memo(GroupList)