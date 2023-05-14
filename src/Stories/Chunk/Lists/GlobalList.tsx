/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import usePullPosts from 'Hooks/usePullPosts'
import { memo, useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { contentFlow, pageFlow } from 'State/Flow'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import VirtualList from '../VirtualList/VirtualList'
import { useLocation, useParams } from 'react-router-dom'

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

const GlobalList = ({ type }: any) => {

    const location = useLocation()

    const [contentState, setContentState] = useRecoilState(contentFlow)
    const [error, list] = usePullPosts(type, 'none', 'global')


    useEffect(() => {

        let title = null
        let path = location.pathname.split('/')[1]
        if (path === 'home') title = 'home'
        else if (path === 'trending') title = 'trending'

        setContentState({
            public_id: null,
            roleSet: null,
            title: title,
            type: 'global',
            link: title,
        })
    }, [])



    // if (error) return <ChunkError variant='error' />






    return (
        <motion.div
            key={`global`}
            css={C.container}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <VirtualList list={list} />
        </motion.div>
    )
}


export default memo(GlobalList)