//@ts-nocheck


/** @jsxImportSource @emotion/react */

import { Global, css } from '@emotion/react'
import { useRef, useEffect, useState, useLayoutEffect } from 'react'
import theme from 'Global/Theme'
import { layoutSizeData } from 'State/Data'
import { useRecoilState, useSetRecoilState } from 'recoil'
import useWindow from 'Hooks/useWindow'
import { motion, useDragControls } from 'framer-motion'

import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { bindState } from 'State/atoms'

const Tri = (props: Props) => {

    const ref: any = useRef(null)
    const [layoutSize, setLayoutSize] = useRecoilState(layoutSizeData)
    const { width, height } = useWindow()
    const [position, setPosition] = useState(0)


    //runs on every size change (very inefficient)
    useLayoutEffect(() => {
        if (width < 800 && layoutSize !== 'mobile') setLayoutSize('mobile')
        if (width > 800 && layoutSize !== 'desktop') setLayoutSize('desktop')
    }, [width])


    if (layoutSize === 'mobile') return <Mobile {...props} />

    //@ts-ignore
    // const { x } = useSpring({ x: position * (240) })
    // const bind = useDrag(({ swipe: [swipeX] }) => {

    //     setPosition((p) => Math.min(Math.max(-1, p + swipeX), 1))
    // })

    const c = {
        left: css({
            height: height,

            padding: theme.spacing(2),
            paddingRight: '0px',
            boxSizing: 'border-box',
            width: layoutSize === 'mobile' ? '240px !important' : '240px',
            marginLeft: layoutSize !== 'mobile' ? (props.left ? '0px' : '-240px') : '',
            position: layoutSize === 'mobile' ? 'fixed' : 'relative',
            zIndex: layoutSize === 'mobile' ? (position === 1 ? 0 : 80) : '',
            opacity: layoutSize === 'mobile' ? (position === 1 ? 100 : 0) : '',
            transition: 'opacity 0.3s , margin-left 0.3s ease-in-out'
        }),
        right: css({
            height: height,
            padding: theme.spacing(2),
            paddingLeft: '0px',
            boxSizing: 'border-box',
            width: layoutSize === 'mobile' ? '240px !important' : '240px',
            marginRight: layoutSize !== 'mobile' ? (props.right ? '0px' : '-240px') : '',
            position: layoutSize === 'mobile' ? 'absolute' : 'relative',
            right: layoutSize === 'mobile' ? '0px' : '',
            zIndex: layoutSize === 'mobile' ? (position === -1 ? 0 : 80) : '',
            opacity: layoutSize === 'mobile' ? (position === -1 ? 100 : 0) : '',
            transition: 'opacity 0.3s , margin-right 0.3s ease-in-out'
        }),
        center: css({
            height: '100%',
            flexGrow: '1',
            boxSizing: 'border-box',
            width: layoutSize === 'mobile' ? '100% !important' : 'auto',
            padding: theme.spacing(2),
            touchAction: 'none',
            position: layoutSize === 'mobile' ? 'absolute' : 'relative',
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

    return (
        <div id="layout" ref={ref} css={c.layout}>

            <animated.div css={c.left}>{props.children[0]}</animated.div>
            <animated.div css={c.center}>
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



const C = {
    container: css({
        minHeight: '100vh',
        display: 'flex',
        position: 'fixed',
        top: 0,
        touchAction: 'none',
        userSelect: ' none',
    }),
    left: css({
        width: '240px',
        height: '100%',
        touchAction: 'none',
        userSelect: ' none',
        padding: 8,
        paddingRight: 0,
    }),
    right: css({

        width: '240px',
        height: '100%',
        touchAction: 'none',
        userSelect: ' none',
        padding: 8,

    }),
    center: css({
        width: '100%',
        height: '100%',
        touchAction: 'none',
        userSelect: ' none',

        padding: 8,

    }),
}


const Mobile = (props: Props) => {



    const { width, height } = useWindow()

    let offset = props.children.length === 2 ? 1 : 0

    let map: any = {
        0: -240,
        1: 0,
        2: 240
    }

    const [xPos, setXPos] = useState(1)
    const { x } = useSpring({ x: map[xPos] })
    const bind = useDrag(({ last, direction: [dx] }) => {

        if (last) {
            if (dx < 0) {
                if (xPos > 0 + offset) setXPos(xp => xp - 1)


            }

            else if (dx > 0) {
                console.log('right')
                if (xPos < 2) setXPos(xp => xp + 1)

            }
        }
    }, {
        target: window,
        eventOptions: { capture: true },
        axis: 'x',
        threshold: 160,
    })

    return (<div css={C.container} style={{ height: height, width: 480 + width, left: -240 }} >

        <animated.div css={C.left} style={{ x: x, height: height }}>{props.children[0]}</animated.div>
        <animated.div css={C.center} style={{
            width: width, height: height, x: x,
            transition: 'filter 0.3s ease-in-out',
            filter: xPos !== 1 ? 'brightness(50%)' : '',
        }}>{props.children[1]}</animated.div>
        <animated.div css={C.right} style={{ x: x, height: height }}>{props.children[2]}</animated.div>

    </div>)
}