/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { cloneElement, memo, useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRecoilValue } from 'recoil'
import { layoutSizeData } from 'State/Data'
import useWindow from 'Hooks/useWindow'

const VirtualList = ({ list }: any) => {

    const { height } = useWindow()
    const layoutSize = useRecoilValue(layoutSizeData)
    const parentRef: any = useRef()

    const virtualizer = useVirtualizer({
        count: list?.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 500,
        overscan: 6,
    })

    const items: any = virtualizer.getVirtualItems()

    if (!list || list.length === 0) return null
    if (!items || items.length === 0) return null
    return (
        <div>
            <div
                ref={parentRef}
                className="List"
                style={{
                    height: height - 56,
                    width: '100%',
                    overflowY: 'auto',
                    contain: 'strict',
                }}
            >
                <div
                    style={{
                        height: virtualizer.getTotalSize(),
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            transform: `translateY(${items[0].start}px)`,
                        }}
                    >
                        {items.map((virtualRow: any) => (
                            <div
                                key={virtualRow.key}
                                data-index={virtualRow.index}
                                ref={virtualizer.measureElement}
                            >

                                {list[virtualRow.index]}

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )


}






export default memo(VirtualList)