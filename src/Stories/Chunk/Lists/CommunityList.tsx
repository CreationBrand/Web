/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useParams } from 'react-router-dom'

import ChunkError from 'Stories/Bits/ChunkError/ChunkError'
import FilterPane from 'Stories/Bits/Filter/CommunityFilter'

import { useRecoilValue } from 'recoil'
import { postFilter } from 'State/filterAtoms'
import usePostList from 'Hooks/Pull/usePostList'
import GlobalFilter from 'Stories/Bits/Filter/GlobalFilter'
import useSize from 'Hooks/useSize'
import usePullCommunity from 'Hooks/usePullCommunity'
import VirtuList from '../VirtualList/VirtuList'


const C = {
    container: css({
        height: '100%',
        width: '100%',
        position: 'absolute',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 50,
        gap: '12px',
    })
}

const CommunityList = () => {

    const params = useParams()
    const filter = useRecoilValue(postFilter)

    const ref: any = useRef()
    const size: any = useSize(ref)
    let width = size?.width

    const [isLoading1, isError1, component, data] = usePullCommunity(params.community_id)
    const [isLoading, isError, components]: any = usePostList(params.community_id, filter)

    // if (isLoading1 || isLoading) return <ChunkError refa={ref} variant='loading' />
    // if (isError1 || isError) return <ChunkError refa={ref} variant='error' />

    return (

        <motion.div
            ref={ref}
            css={C.container}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >

            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtuList
                    list={[
                        component,
                        <FilterPane />,
                        ...components]}
                />
            </div>

            {width > 852 &&
                <div css={{ height: 'min-content', overflow: 'hidden' }}>
                    <GlobalFilter />
                </div>}

        </motion.div>
    )
}


export default CommunityList