/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo } from 'react'
import VirtuList from '../VirtualList/VirtuList'
import useNotiList from 'Hooks/Pull/useNotiList'
import useClearNotif from 'Hooks/useClearNotif'
import { FilterHolder, PostHolder } from './PlaceHolders'
import { Outlet } from 'react-router-dom'

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
    }),
}

const NotiList = ({ type }: any) => {

    const [isLoading, isError, components] = useNotiList()

    useClearNotif('noti')

    return (
        <motion.div
            key={type}
            css={C.container}
            transition={{ duration: 0.1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <Outlet />


            <div css={{ maxWidth: '800px', width: '100%' }}>
                <VirtuList
                    list={
                        (isError || isLoading) ?
                            [<FilterHolder />, <PostHolder />, <PostHolder />, <PostHolder />, <PostHolder />] :
                            components
                    }
                />
            </div>

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