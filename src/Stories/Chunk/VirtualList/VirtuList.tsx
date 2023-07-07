
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo } from 'react'
import { Virtuoso } from 'react-virtuoso'

const VirtuList = ({ list, public_id, overscan }: any) => {

    return (
        <Virtuoso
            defaultItemHeight={535}
            overscan={overscan ? overscan : 1}
            css={{
                '&::-webkit-scrollbar': {
                    display: 'none',
                    scrollbarWidth: 'none',
                },
            }}

            style={{
                height: 'calc(100% - 56px)',
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


