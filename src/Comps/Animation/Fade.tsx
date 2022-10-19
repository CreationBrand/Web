import { cloneElement, forwardRef } from 'react'
import { animated, useTransition } from 'react-spring'

const Fade = forwardRef((props: Props, ref: any) => {
    const transition = useTransition(props.active, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    })

    //
    const refPass = cloneElement(props.children, {
        ref: (el: any) => (ref = el)
    })

    return transition((style, item): any =>
        item ? <animated.div style={style}>{refPass}</animated.div> : ''
    )
})

export default Fade

export interface Props {
    active: boolean
    children: any
}
