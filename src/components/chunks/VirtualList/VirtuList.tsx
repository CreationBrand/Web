
/** @jsxImportSource @emotion/react */
import { PostHolder } from '@/components/lists/PlaceHolders'
import useWindow from '@/hooks/util/useWindow'
import { navOffset } from '@/state/data'
import { layoutSize } from '@/state/layout'


import { memo, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { useRecoilState, useRecoilValue } from 'recoil'

const VirtuList = ({ list, public_id, overscan, header }: any) => {
    const { height } = useWindow()
    const layout = useRecoilValue(layoutSize)

    const [lastScroll, setLastScroll] = useState(0)
    const [offset, setOffset] = useRecoilState(navOffset)

    return (
        <Virtuoso
            defaultItemHeight={100}
            // increaseViewportBy={{ top: 2000, bottom: 1000 }}


            onScroll={(e: any) => {

                let delta = offset - (lastScroll - e.target.scrollTop)

                if (delta > 0) {
                    setOffset(delta > 48 ? 48 : delta)
                }
                else {
                    setOffset(delta < 0 ? 0 : delta)
                }

                setLastScroll(e.target.scrollTop)
            }}


            css={{
                '&::-webkit-scrollbar': {
                    // display: 'none',
                    // scrollbarWidth: 'none',
                },
            }}

            style={{
                overflowX: 'hidden',
                width: '100%',
                overflowAnchor: 'none',
                height: height,
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


