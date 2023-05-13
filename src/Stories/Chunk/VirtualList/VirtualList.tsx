/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRecoilValue } from 'recoil'
import { layoutSizeData } from 'State/Data'





const VirtualList = ({ list }: any) => {


    const layoutSize = useRecoilValue(layoutSizeData)
    const parentRef: any = useRef()

    const virtualizer = useVirtualizer({
        count: list.length,
        overscan: 4,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 0,
    })

    const items = virtualizer.getVirtualItems()

    const C = {
        container: css({
            height: "calc(100% - 56px)",
            overflowY: 'scroll',
            overflowX: 'hidden',
            position: 'relative',
            boxSizing: 'border-box',
            scrollbarGutter: layoutSize === 'mobile' ? 'unset' : 'stable both-edges',
            '::-webkit-scrollbar': {
                width: layoutSize === 'mobile' ? '0px' : '14px',
            },
        }),
    }



    return (
        <div
            ref={parentRef}
            css={C.container}>

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