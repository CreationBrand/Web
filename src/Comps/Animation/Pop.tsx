//@ts-nocheck

import { cloneElement, forwardRef } from 'react'
import { animated, useTransition } from 'react-spring'

const Pop = forwardRef((props: Props, ref: any) => {
    const transition = useTransition(props.active, {
        from: {
            position: 'absolute',
            transform: 'scale(0.8)',
            transformOrigin: props.origin,
            width: '100px'
        },
        enter: {
            transform: 'scale(1)',
            transformOrigin: props.origin,
            width: '100px'
        },
        leave: {
            transform: 'scale(0.8)',
            transformOrigin: props.origin,
            width: '100px'
        }
    })

    //
    const refPass = cloneElement(props.children, {
        ref: (el: any) => (ref = el)
    })

    return transition((style, item): any =>
        item ? <animated.div style={style}>{refPass}</animated.div> : ''
    )
})

export default Pop

export interface Props {
    active: boolean
    children: any
    origin?: any
}
