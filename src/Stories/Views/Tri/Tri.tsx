/** @jsxImportSource @emotion/react */
//@ts-nocheck

import { css, useTheme } from '@emotion/react'
import { useDrag, useGesture } from '@use-gesture/react'
import { useRef, useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import theme from 'Global/Theme'

const Tri = (props: Props) => {
    const ref: any = useRef(null)
    const size = 'l'

    const [cWidth, setCW] = useState(false)

    useEffect(() => {
        setCW(ref.current.clientWidth)
    }, [ref.current])

    const [position, setPosition] = useState(0)
    //@ts-ignore
    const { x } = useSpring({ x: position * ((cWidth / 100) * 80) })
    const bind = useDrag(({ swipe: [swipeX] }) => {
        setPosition((p) => Math.min(Math.max(-1, p + swipeX), 1))
    })

    const c = {
        left: css({
            height: '100vh',
            padding: theme.spacing(2),
            paddingRight: '0px',
            boxSizing: 'border-box',
            width: size === 's' ? '80% !important' : '240px',
            marginLeft: size !== 's' ? (props.left ? '0px' : '-240px') : '',
            position: size === 's' ? 'absolute' : 'relative',
            zIndex: size === 's' ? (position === 1 ? 0 : 80) : '',
            opacity: size === 's' ? (position === 1 ? 100 : 0) : '',
            transition: 'opacity 0.3s , margin-left 0.3s ease-in-out'
        }),
        right: css({
            height: '100%',
            padding: theme.spacing(2),
            paddingLeft: '0px',
            boxSizing: 'border-box',
            width: size === 's' ? '80% !important' : '240px',
            // marginRight: props.right
            //     ? '0px'
            //     : size === 's'
            //     ? '-80% !important'
            //     : '-240px',
            
            marginRight: size !== 's' ? (props.right ? '0px' : '-240px') : '',

            position: size === 's' ? 'absolute' : 'relative',
            right: size === 's' ? '0px' : '',
            zIndex: size === 's' ? (position === -1 ? 0 : 80) : '',
            opacity: size === 's' ? (position === -1 ? 100 : 0) : '',
            transition: 'opacity 0.3s , margin-right 0.3s ease-in-out'
        }),
        center: css({
            height: '100%',
            flexGrow: '1',
            boxSizing: 'border-box',
            width: size === 's' ? '100% !important' : 'auto',
            padding: (props.left || props.right) && theme.spacing(2),
            touchAction: 'none',
            position: size === 's' ? 'absolute' : 'relative',
            zIndex: 100
        }),
        layout: css({
            display: 'flex',
            overflow: 'hidden',
            height: '100vh',
            background: theme.background.pri,
            boxSizing: 'border-box',
            touchAction: 'none'
        })
    }

    let condictionalBind = size === 's' ? bind() : {}
    return (
        <div id="layout" ref={ref} css={c.layout} {...condictionalBind}>
            <animated.div css={c.left}>{props.children[0]}</animated.div>
            <animated.div css={c.center} style={size === 's' ? { x } : {}}>
                {props.children[1]}
            </animated.div>
            <animated.div css={c.right}>{props.children[2]}</animated.div>
        </div>
    )
}

export default Tri

export interface Props {
    children?: any
    left?: boolean
    right?: boolean
}
