
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { memo, useEffect, useRef, } from 'react'
import useWindow from 'Hooks/useWindow'
import { Virtuoso } from 'react-virtuoso'



function debounce(func: any, timeout = 300) {
    let timer: any;
    return (...args: any) => {
        clearTimeout(timer);
        //@ts-ignore
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}


const VirtuList = ({ list, public_id }: any) => {

    const { height } = useWindow()
    const ref: any = useRef(null)

    const setScroll = (e: any) => {
        //@ts-ignore
        sessionStorage.setItem(public_id, (e.startIndex))
    }

    const processChange = debounce((e: any) => setScroll(e));

    return (
        <Virtuoso
            ref={ref}
            // increaseViewportBy={1000}
            rangeChanged={processChange}
            initialTopMostItemIndex={{
                align: 'center',
                index: Number(sessionStorage.getItem(public_id))
            }}
            style={{ height: height - 72, marginBottom: 8, width: '100%' }}
            data={list}
            itemContent={(index, item) => {
                return (
                    <div key={index}>
                        {item}
                    </div>
                )
            }}
        />
    )
}

export default memo(VirtuList)


