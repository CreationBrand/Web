/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { useCallback, useEffect, useRef } from 'react'
import { defaultRangeExtractor, useVirtualizer } from '@tanstack/react-virtual'
import useWindow from 'Hooks/useWindow'
import throttle from 'Util/throttle';
import { useRecoilValue } from 'recoil';
import { bindState } from 'State/atoms';

const pool: any = {}

const VirtualList = ({ list, offset, overscan, public_id }: any) => {

    const { height } = useWindow()
    const parentRef: any = useRef()
    const rangeRef = useRef(null);

    const throttled = useCallback(
        throttle((value: any) => {
            let temp = value.calculateRange()
            if (temp.startIndex === 0) return
            pool[public_id] = temp.startIndex
        }, 600), [],
    );

    let virtualizer = useVirtualizer({

        rangeExtractor: useCallback((range: any) => {
            rangeRef.current = range;
            return defaultRangeExtractor(range);
        }, []),

        count: list?.length,
        onChange: (virtualItems: any) => throttled(virtualItems),
        getScrollElement: () => parentRef.current,
        estimateSize: () => 516,
        overscan: overscan ? overscan : 10,
    })


    const scrollToIndex = (index: any, ...args: any) => {
        virtualizer.scrollToIndex(index, ...args);
    };

    useEffect(() => {
        if (!public_id) return

        try {
            if (pool[public_id]) {
                scrollToIndex(pool[public_id], { align: "start" })
            }
        } catch (e) { }
    }, [public_id])


    const items: any = virtualizer.getVirtualItems()

    if (!list || list.length === 0) return null
    if (!items || items.length === 0) return null

    return (
        <div
            id={'list'}
            ref={parentRef}
            className="List"
            style={{
                height: (height - 72) - (offset ? offset : 0),
                width: '100%',
                overflowY: 'auto',
                contain: 'strict',
                touchAction:'none',
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
                        touchAction:'none',

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
    )
}






export default VirtualList