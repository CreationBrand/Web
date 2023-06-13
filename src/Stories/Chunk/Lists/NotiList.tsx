/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo } from 'react'
import useCommunityFlow from 'Hooks/useCommunityFlow'
import useContentFlow from 'Hooks/useContentFlow'
import VirtuList from '../VirtualList/VirtuList'
import usePostList from 'Hooks/Pull/usePostList'
import useNotiList from 'Hooks/Pull/useNotiList'
import useClearNotif from 'Hooks/useClearNotif'

const C = {
    container: css({
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
    }),
}

const NotiList = ({ type }: any) => {

    const [isLoading, isError, components] = useNotiList()

    useClearNotif('noti')
    useContentFlow('noti')
    useCommunityFlow(null)

    return (
        <motion.div
            key={type}
            css={C.container}
            transition={{ duration: 0.5 }}
            initial={{ opacity: 0, }}
            animate={{ opacity: 1, }}
        >
            <VirtuList list={components} public_id={'noti'} />
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