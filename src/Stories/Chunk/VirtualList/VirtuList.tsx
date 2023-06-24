
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo, useRef } from 'react'
import useWindow from 'Hooks/useWindow'
import { Virtuoso } from 'react-virtuoso'


const VirtuList = ({ list, public_id, overscan }: any) => {

    const { height } = useWindow()
    const ref: any = useRef(null)

    return (
        <Virtuoso
            overscan={overscan ? overscan : 1}
            ref={ref}

            style={{
                height: height - 72, marginBottom: 8, width: '100%',
                touchAction: 'pan-y'
            }}
            data={list}
            itemContent={(index, item) => {
                return (
                    <div key={`${index}|${public_id}`} style={{ minHeight: '1px' }}>
                        {item}
                    </div>

                )
            }}
        />
    )
}

export default memo(VirtuList)


