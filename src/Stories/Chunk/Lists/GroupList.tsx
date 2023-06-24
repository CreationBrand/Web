/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo, useRef, } from 'react'
import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import { useParams } from 'react-router-dom'
import usePullGroup from 'Hooks/usePullGroup'
import usePostList from 'Hooks/Pull/usePostList'
import useSize from 'Hooks/useSize'
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter'
import VirtuList from '../VirtualList/VirtuList'

const C = {
    container: css({
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        zIndex: 100,
        background: '#0f0e10',
    })
}

const GroupList = ({ group_id }: any) => {

    const params = useParams()
    const ref: any = useRef()
    const size: any = useSize(ref)
    let width = size?.width


    const [isError1, group, data] = usePullGroup(params.group_id)
    const [isLoading, isError, components]: any = usePostList(group_id, 'group')


    if (isError1 || isError) return <ChunkError refa={ref} variant='error' />
    if (isLoading) return <ChunkError refa={ref} variant='loading' />


    return (
        <motion.div
            ref={ref}
            key={params.group_id}
            css={C.container}
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
        >
            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtuList
                    list={[
                        group,
                        ...components
                    ]}
                />
            </div>


            {width > 852 &&
                <div css={{ marginTop: '4px', height: 'min-content' }}>
                    <GlobalFilter />
                </div>}

        </motion.div>
    )
}


export default memo(GroupList)