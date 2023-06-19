/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo } from 'react'
import useCommunityFlow from 'Hooks/useCommunityFlow'
import VirtuList from '../VirtualList/VirtuList'
import usePostList from 'Hooks/Pull/usePostList'
import VirtualList from '../VirtualList/VirtualList'
import { useRecoilValue } from 'recoil'
import { bindState } from 'State/atoms'

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

const GlobalList = ({ type }: any) => {



    const [isLoading, isError, components] = usePostList(type, 'none')

    useCommunityFlow(null)

    return (
        <motion.div
            key={type}
            css={C.container}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <VirtualList list={components} public_id={type} />
        </motion.div>
    )
}


export default memo(GlobalList)