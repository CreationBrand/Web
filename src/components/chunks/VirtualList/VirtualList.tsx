/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { memo, useRef } from 'react'

import { useVirtualizer } from '@tanstack/react-virtual';
import { useRecoilValue } from 'recoil';
import { layoutSize } from '@/state/layout';
import useWindow from '@/hooks/util/useWindow';

export const VirtualList = ({ list, offset, overscan, public_id }: any) => {

    const { height } = useWindow()
    const layout = useRecoilValue(layoutSize)
    const parentRef: any = useRef()

    let virtualizer = useVirtualizer({
        count: list?.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 516,
        overscan: overscan ? overscan : 1,
    })


    const items: any = virtualizer.getVirtualItems()

    if (!list || list.length === 0) return null
    if (!items || items.length === 0) return null

    return (
        <div
            css={{
                '&::-webkit-scrollbar': {
                    display: 'none',
                    scrollbarWidth: 'none',
                },
            }}
            id={'list'}
            ref={parentRef}
            className="List"
            style={{
                height: layout === 'desktop' ? (height - 72) : (height - 48),
                width: '100%',
                overflowY: 'auto',
                contain: 'strict',
                transform: `translate3d(0,0,0)`,
            }}
        >
            <div

                style={{
                    height: virtualizer.getTotalSize(),
                    width: '100%',
                    position: 'relative',
                    transform: `translate3d(0,0,0)`,

                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        touchAction: 'pan-y',
                        transform: `translate3d(0,${items[0].start}px,0)`,
                    }}
                >

                    {items.map((virtualRow: any) => (
                        <div
                            key={`${public_id}|${virtualRow.index}`}
                            data-index={virtualRow.index}
                            ref={virtualizer.measureElement}>
                            {list[virtualRow.index]}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}



export default memo(VirtualList)