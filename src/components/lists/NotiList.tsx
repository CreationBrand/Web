/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { memo } from 'react'

import { FilterHolder, PostHolder } from './PlaceHolders'
import { overList } from '@/global/mixins'
import VirtuList from '../chunks/VirtualList/VirtuList'
import useNotiList from '@/hooks/list/useNotiList'
import useClearNotif from '@/hooks/useClearNotif'


const NotiList = ({ type }: any) => {

    const [isLoading, isError, components] = useNotiList()
    useClearNotif('noti')

    return (
        <motion.div
            key={type}
            css={overList}
            transition={{ duration: 0.2 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >



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
