
/** @jsxImportSource @emotion/react */
import { PostHolder } from '@/components/lists/PlaceHolders'
import { bg_list } from '@/global/var'
import useWindow from '@/hooks/util/useWindow'
import { layoutSize } from '@/state/layout'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'

import { memo, useEffect, useRef, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { useRecoilValue } from 'recoil'

const VirtuList = ({ list, public_id, overscan, header }: any) => {
    const { height } = useWindow()
    const layout = useRecoilValue(layoutSize)

    return (
        <Virtuoso
            increaseViewportBy={{ top: 2000, bottom: 300 }}
            // components={{ ScrollSeekPlaceholder: ScrollSeekPlaceholder }}
            // scrollSeekConfiguration={{
            //     enter: (velocity) => Math.abs(velocity) > 300,
            //     exit: (velocity) => {
            //         const shouldExit = Math.abs(velocity) < 300;
            //         return shouldExit;
            //     },
            // }}
            defaultItemHeight={100}


            css={{
                '&::-webkit-scrollbar': {
                    display: 'none',
                    scrollbarWidth: 'none',
                },
            }}

            style={{
                overflowX: 'hidden',
                maxWidth: '800px',
                width: '100%',
                overflowAnchor: 'none',
                height: layout === 'desktop' ? (height - 72) : (height - 48),
                marginBottom: 8,
                touchAction: 'pan-y',
            }}
            data={list}
            itemContent={(index, item) => {
                return item
            }}
        />
    )
}

export default memo(VirtuList)



const ScrollSeekPlaceholder = ({ height, index }: any) => (

    <PostHolder />
)

