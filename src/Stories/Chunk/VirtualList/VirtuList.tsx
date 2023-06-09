
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo, useRef, } from 'react'
import useWindow from 'Hooks/useWindow'
import { Virtuoso } from 'react-virtuoso'


const VirtuList = ({ list, public_id }: any) => {

    const { height } = useWindow()
    const ref: any = useRef(null)

    const setScroll = (e: any) => {
        sessionStorage.setItem(public_id, e?.startIndex)
    }


    return (
        <Virtuoso
            ref={ref}

            rangeChanged={setScroll}
            initialTopMostItemIndex={Number(sessionStorage.getItem(public_id))}
            style={{ height: height - 72, marginBottom: 8, width: '100%' }}
            data={list}
            itemContent={(index, item) => {
                return (
                    <div>
                        {item}
                    </div>
                )
            }}
        />
    )
}

export default memo(VirtuList)


