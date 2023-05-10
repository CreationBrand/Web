/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'


const C = {
    container: css({
        height: "calc(100% - 56px)",
        overflowY: 'scroll',
        overflowX: 'hidden',
        scrollbarGutter: 'stable both-edges',
        position: 'relative',
        boxSizing: 'border-box',
    }),
}


const VirtualList = ({ list }: any) => {

    const parentRef: any = useRef()

    const virtualizer = useVirtualizer({
        count: list.length,
        overscan: 10,
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
    )


}





export default VirtualList