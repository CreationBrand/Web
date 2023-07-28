
/** @jsxImportSource @emotion/react */
import useWindow from '@/hooks/util/useWindow'
import { layoutSize } from '@/state/layout'
import { css } from '@emotion/react'

import { memo } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { useRecoilValue } from 'recoil'

const VirtuList = ({ list, public_id, overscan }: any) => {
    const { height } = useWindow()
    const layout = useRecoilValue(layoutSize)

    return (
        <Virtuoso
            defaultItemHeight={535}
            increaseViewportBy={{
                top: 0,
                bottom: 400,
            }}

            css={{
                '&::-webkit-scrollbar': {
                    display: 'none',
                    scrollbarWidth: 'none',
                },
            }}

            style={{
                height: layout === 'desktop' ? (height - 72) : (height - 48),
                marginBottom: 8,
                width: '100%',
                touchAction: 'pan-y'
            }}
            data={list}
            itemContent={(index, item) => {
                return item
            }}
        />
    )
}

export default memo(VirtuList)


