/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo } from 'react'
import usePostList from 'Hooks/Pull/usePostList'
import VirtualList from '../VirtualList/VirtualList'
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
    })
}

const GlobalList = ({ type }: any) => {

    const [isLoading, isError, components] = usePostList(type, 'none')

    return (
        <motion.div
            key={type}
            css={C.container}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <VirtuList list={components} public_id={type} />
        </motion.div>
    )
}


export default memo(GlobalList)