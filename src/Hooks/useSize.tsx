import useResizeObserver from "@react-hook/resize-observer"
import throttle from "Util/throttle"
import { useState, useLayoutEffect, useEffect } from "react"

const useSize = (target: any) => {
    const [size, setSize] = useState(1)

    useLayoutEffect(() => {
        // if (!target.current) return
        setSize(target.current.getBoundingClientRect())
    }, [target])

    
    useEffect(() => {
        // if (!target.current) return
        setSize(target.current.getBoundingClientRect())
    }, [target])

    // Where the magic happens
    useResizeObserver(target, (entry: any) => throttle(setSize(entry.contentRect), 500))
    return size
}


export default useSize