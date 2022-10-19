/** @jsxImportSource @emotion/react */
import { useVirtualizer } from '@tanstack/react-virtual'

import { css } from '@emotion/react'
import { useDrag, useGesture } from '@use-gesture/react'
import { Key, useRef, useState } from 'react'
import { useSprings, animated, to, TransitionFrom } from 'react-spring'

const testData = [
    {
        index: 1,
        id: '@communitys',
        title: 'communitys',
        count: 10,
        active: true,
        type: 'tray',
        children: [
            {
                index: 1,
                id: 123,
                title: 'com1',
                type: 'item'
            },
            {
                index: 2,
                id: 123,
                title: 'com2',
                type: 'item'
            },
            {
                index: 3,
                id: 123,
                title: 'com3',
                type: 'item'
            },
            {
                index: 4,
                id: 123,
                title: 'com4',
                type: 'item'
            },
            {
                index: 5,
                id: 123,
                title: 'com5',
                type: 'item'
            }
        ]
    },
    {
        index: 1,
        id: '@communitys',
        title: 'communitys',
        count: 10,
        active: true,
        children: [
            {
                index: 1,
                id: 123,
                title: 'com1',
                type: 'item'
            },
            {
                index: 2,
                id: 123,
                title: 'com2',
                type: 'item'
            },
            {
                index: 3,
                id: 123,
                title: 'com3',
                type: 'item'
            },
            {
                index: 4,
                id: 123,
                title: 'com4',
                type: 'item'
            },
            {
                index: 5,
                id: 123,
                title: 'com5',
                type: 'item'
            }
        ]
    },
    {
        index: 1,
        id: '@communitys',
        title: 'People',
        count: 10,
        active: false,
        children: [
            {
                index: 1,
                id: 123,
                title: 'com1',
                type: 'item'
            },
            {
                index: 2,
                id: 123,
                title: 'com2',
                type: 'item'
            },
            {
                index: 3,
                id: 123,
                title: 'com3',
                type: 'item'
            },
            {
                index: 4,
                id: 123,
                title: 'com4',
                type: 'item'
            },
            {
                index: 5,
                id: 123,
                title: 'com5',
                type: 'item'
            }
        ]
    }
]

// Returns fitting styles for dragged/idle items
//@ts-ignore
const fn = (order, down, originalIndex, curIndex, y) => (index) =>
    down && index === originalIndex
        ? {
              y: curIndex - 100 + y,
              scale: 1.1,
              zIndex: '1',
              shadow: 15,
              immediate: (n: any) => n === 'y' || n === 'zIndex'
          }
        : {
              y: order.indexOf(index) * 100,
              scale: 1,
              zIndex: '0',
              shadow: 1,
              immediate: false
          }

const parseData = (data: any) => {
    let items = []
    for (var i in data) {
        items.push(data[i])
        if (data[i].active) {
            for (var j in data[i].children) {
                items.push(data[i].children[j])
            }
        }
    }

    items.map((element: any, index: any) => {
        element['virtualIndex'] = index
        return element
    })

    return items
}

const InteractiveList = ({ children }: Props) => {
    let data = parseData(testData)
    let [order, setOrder] = useState(data)

    const parentRef = useRef(null)

    // The virtualizer
    const rowVirtualizer = useVirtualizer({
        count: data.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 100
    })

    const items = data
    //@ts-ignore
    const [springs, setSprings]: any = useSprings(
        items.length,
        //@ts-ignore
        fn(order)
    ) // Create springs, each corresponds to an item, controlling its transform, scale, etc.

    //@ts-ignore
    const bind = useDrag((state) => {
        const find = (element: any) => element.virtualIndex === state.args[0]
        const curIndex = order.findIndex(find)

        const curRow = clamp(
            Math.round((curIndex * 100 + state.movement[1]) / 100),
            0,
            items.length - 1
        )

        console.log(curIndex, curRow)

        const copy = move(order, curIndex, curRow)

        console.log(copy)
        setSprings(
            fn(copy, state.down, state.args[0], curIndex, state.movement[1])
        )

        if (!state.down) {
            // order = copy
        }
    })

    const c = {
        item: css({
            position: 'absolute',
            width: '50px',
            height: '90px',
            overflow: 'visible',
            // transformOrigin: '50% 50% 0px',
            background: 'lightblue',
            zIndex: 100,
            touchAction: 'none'
        }),
        container: css({
            // position: 'relative',
            // width: '200px'
        })
    }

    return (
        <div>
            List
            <div
                id="virtual-container"
                ref={parentRef}
                css={c.container}
                style={{
                    height: `600px`,
                    width: '100px',
                    overflow: 'auto',
                    touchAction: 'none'
                }}
            >
                <div
                    id="virtual-internal"
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                        touchAction: 'none'
                    }}
                >
                    {/* Only the visible items in the virtualizer, manually positioned to be in view */}
                    {rowVirtualizer
                        .getVirtualItems()
                        .map((virtualItem: any) => (
                            <animated.div
                                id="virtual-row"
                                key={virtualItem.key}
                                {...bind(virtualItem.key)}
                                css={c.item}
                                style={{
                                    position: 'absolute',
                                    top: `${virtualItem.start}px`,
                                    left: 0,
                                    width: '100%',
                                    height: `${virtualItem.size}px`,
                                    // transform: `translateY(${virtualItem.start}px)`,
                                    transform: to(
                                        [
                                            springs[virtualItem.index].y,
                                            springs[virtualItem.index].scale
                                        ],
                                        (y, s) =>
                                            `translate3d(0,${y}px,0) scale(${s})`
                                    ),
                                    //@ts-ignore
                                    boxShadow: springs[
                                        virtualItem.index
                                    ].shadow.to(
                                        (s: number) =>
                                            `rgba(0, 0, 0, 0.15) 0px ${s}px ${
                                                2 * s
                                            }px 0px`
                                    ),
                                    zIndex: springs[virtualItem.index].zIndex
                                }}
                                // style={{
                                //     zIndex: springs[virtualItem.index]
                                //         .zIndex,
                                // boxShadow: springs[
                                //     virtualItem.index
                                // ].shadow.to(
                                //     (s: number) =>
                                //         `rgba(0, 0, 0, 0.15) 0px ${s}px ${
                                //             2 * s
                                //         }px 0px`
                                // ),
                                //     transform: to(
                                //         [
                                //             springs[virtualItem.index].y,
                                //             springs[virtualItem.index].scale
                                //         ],
                                //         (y, s) =>
                                //             `translate3d(0,${y}px,0) scale(${s})`
                                //     )
                                // }}
                                children={
                                    <div>{data[virtualItem.index].id}</div>
                                }
                            />
                        ))}

                    {/* {springs.map(({ zIndex, shadow, y, scale }: any, i: any) => (
                    <animated.div
                        css={c.item}
                        {...bind(i)}
                        key={i}
                        style={{
                            zIndex,
                            boxShadow: shadow.to(
                                (s: number) =>
                                    `rgba(0, 0, 0, 0.15) 0px ${s}px ${
                                        2 * s
                                    }px 0px`
                            ),
                            transform: to(
                                [y, scale],
                                (y, s) => `translate3d(0,${y}px,0) scale(${s})`
                            )
                        }}
                        children={<div>{data[i].id}</div>}
                    />
                ))} */}
                </div>
            </div>
        </div>
    )
}

export default InteractiveList

export interface Props {
    items?: any
    children?: any
}

interface InteractiveListData {
    [key: string]: {
        id: string
        rank: number
        children: {
            [key: string]: {
                id: string
                rank: number
            }
        }
    }
}
const clamp = (num: number, a: number, b: number) =>
    Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b))

const swap = (arr: any, index1: number, index2: number) => {
    let copy = [...arr]
    ;[copy[index1], copy[index2]] = [copy[index2], copy[index1]]
    return copy
}

const move = (array: any[], moveIndex: number, toIndex: number) => {
    const item = array[moveIndex]
    const length = array.length
    const diff = moveIndex - toIndex

    if (diff > 0) {
        // move left
        return [
            ...array.slice(0, toIndex),
            item,
            ...array.slice(toIndex, moveIndex),
            ...array.slice(moveIndex + 1, length)
        ]
    } else if (diff < 0) {
        // move right
        const targetIndex = toIndex + 1
        return [
            ...array.slice(0, moveIndex),
            ...array.slice(moveIndex + 1, targetIndex),
            item,
            ...array.slice(targetIndex, length)
        ]
    }
    return array
}
