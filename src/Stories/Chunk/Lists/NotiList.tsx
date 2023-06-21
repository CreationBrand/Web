/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo } from 'react'
import useCommunityFlow from 'Hooks/useCommunityFlow'
import VirtuList from '../VirtualList/VirtuList'
import useNotiList from 'Hooks/Pull/useNotiList'
import useClearNotif from 'Hooks/useClearNotif'

const C = {
    container: css({
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        zIndex: 100,
        background: '#0f0e10',
    }),
}

const NotiList = ({ type }: any) => {

    const [isLoading, isError, components] = useNotiList()

    useClearNotif('noti')
    useCommunityFlow(null)

    return (
        <motion.div
            key={type}
            css={C.container}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <VirtuList list={components} />
        </motion.div>
    )
}


export default memo(NotiList)




/*



    {

    TYPE
    P
    }

 */