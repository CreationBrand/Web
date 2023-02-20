/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


import React, { cloneElement, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

import { useVirtualizer } from '@tanstack/react-virtual'
import { AnimatePresence } from 'framer-motion'


const C = {
    container: css({
        overflowY: 'hidden',
        overflowX: 'hidden',
        height: "calc(100% - 50px)",
    }),
}


const VirtualList = ({ list }: any) => {


    const parentRef: any = useRef()

    const virtualizer = useVirtualizer({
        count: list.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 0,
    })

    const items = virtualizer.getVirtualItems()

    return (
        <div
            ref={parentRef}
            css={C.container}
        >
            <div
                style={{
                    height: virtualizer.getTotalSize(),
                    width: '100%',
                    position: 'relative',
                    boxSizing: 'border-box',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        boxSizing: 'border-box',

                        top: 0,
                        left: 0,
                        width: '100%',
                        transform: `translateY(${items[0].start}px)`,
                    }}
                >
                    {items.map((virtualRow) => (
                        <div
                            key={virtualRow.key}
                            data-index={virtualRow.index}
                            ref={virtualizer.measureElement}
                        >
                            <div>{list[virtualRow.index]}</div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )


}





export default VirtualList