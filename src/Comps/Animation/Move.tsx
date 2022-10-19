import { cloneElement, forwardRef } from 'react'
import { animated, useTransition } from 'react-spring'

const Move = forwardRef((props: Props, ref: any) => {
    const refPass = cloneElement(props.children, {
        ref: (el: any) => (ref = el)
    })

    return props.active ? (
        <animated.div
            style={{
                transform: `translate3d(${props.x},0,0)`
            }}
        >
            {refPass}
        </animated.div>
    ) : (
        refPass
    )
})

export default Move

export interface Props {
    active?: boolean
    children?: any
    origin?: any
    x: string
    y: number
}
