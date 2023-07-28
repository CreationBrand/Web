
/** @jsxImportSource @emotion/react */
import useWindow from '@/hooks/util/useWindow'
import { css } from '@emotion/react'

import { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'

// const VirtualList = ({ list, offset }: any) => {

//     const { height } = useWindow()
//     const layoutSize = useRecoilValue(layoutSizeData)
//     const parentRef: any = useRef()
//     const virtualizerRef: any = useRef(null);
//     const count = list?.length

//     const reverseIndex = useCallback((index: any) => count - 1 - index, [count]);


//     const virtualizer = useVirtualizer({
//         getScrollElement: () => parentRef.current,
//         count,
//         estimateSize: () => 150,
//         getItemKey: useCallback(
//             (index: any) => list[reverseIndex(index)].id,
//             [list, reverseIndex]
//         ),
//         overscan: 5,
//         scrollMargin: 50,
//     })


//     useIsomorphicLayoutEffect(() => {
//         virtualizerRef.current = virtualizer;
//     });


//     if (
//         virtualizerRef.current &&
//         count !== virtualizerRef.current.options.count
//     ) {
//         const delta = count - virtualizerRef.current.options.count;
//         const nextOffset = virtualizerRef.current.scrollOffset + delta * 10;

//         virtualizerRef.current.scrollOffset = nextOffset;
//         virtualizerRef.current.scrollToOffset(nextOffset, { align: "start" });
//     }


//     const items: any = virtualizer.getVirtualItems()

//     if (!list || list.length === 0) return null
//     if (!items || items.length === 0) return null

//     const [paddingTop, paddingBottom] =
//         items.length > 0
//             ? [
//                 Math.max(0, items[0].start - virtualizer.options.scrollMargin),
//                 Math.max(0, virtualizer.getTotalSize() - items[items.length - 1].end),
//             ]
//             : [0, 0];



//     console.log('padding', paddingTop, paddingBottom)

//     return (
//         // <div
//         //     ref={parentRef}
//         //     className="List"
//         //     style={{
//         //         height: (height - 72) - (offset ? offset : 0),
//         //         width: '100%',
//         //         overflowY: 'auto',
//         //         contain: 'strict',


//         //     }}
//         // >
//         //     <div
//         //         style={{
//         //             height: virtualizer.getTotalSize(),
//         //             width: '100%',
//         //             position: 'relative',
//         //         }}
//         //     >
//         //         <div
//         //             style={{
//         //                 position: 'absolute',
//         //                 top: 0,
//         //                 left: 0,
//         //                 width: '100%',
//         //                 transform: `translateY(${items[0].start}px)`,
//         //             }}
//         //         >
//         //             {items.map((virtualRow: any) => (
//         //                 <div
//         //                     key={virtualRow.key}
//         //                     data-index={virtualRow.index}
//         //                     ref={virtualizer.measureElement}
//         //                 >

//         //                     {list[virtualRow.index]}

//         //                 </div>
//         //             ))}
//         //         </div>
//         //     </div>
//         // </div>


//         <div
//             ref={parentRef}
//             style={{
//                 height: (height - 72) - (offset ? offset : 0),
//                 width: '100%',
//                 overflowY: 'auto',
//                 contain: 'strict',
//                 border: "1px solid #ccc",
//             }}>

//             <div style={{
//                 overflowAnchor: "none",
//                 paddingTop,
//                 paddingBottom,
//             }} >

//                 {items.map((virtualRow: any) => {
//                     const index = reverseIndex(virtualRow.index);
//                     const item = list[index];

//                     return (
//                         <div
//                             key={virtualRow.key}
//                             data-index={virtualRow.index}

//                             ref={virtualizer.measureElement}
//                         >{item}</div>
//                     )
//                 })}
//             </div>
//         </div>
//     )


// }




const ReverseList = ({ list }: any) => {

    const { height } = useWindow()
    const virtuoso: any = useRef(null);

    const [firstItemIndex, setFirstItemIndex] = useState(99999)
    const [rows, setRows] = useState([])

    useEffect(() => {
        const delta = list.length - rows.length;
        const nextFirstItemIndex = firstItemIndex - delta;
        setFirstItemIndex(() => nextFirstItemIndex)
        let temp:any = [...list]
        temp.reverse()
        setRows(temp)
    }, [list])

    useEffect(() => {
        if (!virtuoso.current) return
        virtuoso.current.scrollToIndex({
            index: 1000000,
            align: "end",
            behavior: 'instant',
        });
    }, [virtuoso])


    // console.log('rows', rows)

    return (
        <Virtuoso
            ref={virtuoso}
      
            style={{ height: height - 124, marginBottom: 8 }}
            firstItemIndex={firstItemIndex}
            initialTopMostItemIndex={25}
            data={rows}
            // startReached={prependItems}
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

export default memo(ReverseList)





export const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;