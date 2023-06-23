import useResizeObserver from "@react-hook/resize-observer"
import { useState, useLayoutEffect } from "react"

const useSize = (target: any) => {
    const [size, setSize] = useState()

    useLayoutEffect(() => {
        // if (!target.current) return
        setSize(target.current.getBoundingClientRect())
    }, [target])

    // Where the magic happens
    useResizeObserver(target, (entry: any) => setSize(entry.contentRect))
    return size
}


export default useSize