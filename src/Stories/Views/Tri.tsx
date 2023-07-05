//@ts-nocheck


/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { useRef, useState, useLayoutEffect } from 'react'
import theme from 'Global/Theme'
import { layoutSizeData } from 'State/Data'
import { useRecoilState, useRecoilValue } from 'recoil'
import useWindow from 'Hooks/useWindow'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { authFlow } from 'State/Flow'

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


    const c = {
        left: css({
            height: height,

            padding: theme.spacing(2),
            paddingRight: '0px',
            boxSizing: 'border-box',
            minWidth: '240px',
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
        background: '#0f0e10',
    }),
    left: css({
        width: '240px',
        minWidth: '240px',
        height: '100%',
        touchAction: 'none',
        userSelect: ' none',
        padding: 8,
        paddingRight: 8,
        background: '#000',

    }),
    right: css({

        // width: '80%',
        height: '100%',
        touchAction: 'none',
        userSelect: ' none',
        padding: 8,
        paddingLeft: 8,
        background: '#000',


    }),
    center: css({
        width: '100%',
        height: '100%',
        touchAction: 'none',
        userSelect: ' none',
        background: '#0f0e10',
        padding: 4,

    }),
}


const Mobile = (props: Props) => {
    const { width, height } = useWindow()
    const auth = useRecoilValue(authFlow)
    const ref = useRef(null)

    let side = width * 0.75;

    let map: any = {
        0: -side,
        1: 0,
        2: side
    }

    const [xPos, setXPos] = useState(1)
    // const [{ x }, api] = useSpring({ x: map[xPos] })

    const [{ x, }, api] = useSpring(() => ({ x: map[xPos] }))


    const bind = useDrag(({ last, direction: [dx], movement: [x, y], down, initial }) => {

        if (!down) {
            if (x < -200 && auth !== 'guest') {
                setXPos(2)
                return api.start({ x: -side })
            }
            if (x > 200) {
                setXPos(0)
                return api.start({ x: side })
            }
            else {
                setXPos(1)
                return api.start({ x: 0 })
            }
        }
        if (down) return api.start({ x: x, immmediate: down })
    }, {
        target: ref,
        axis: 'x',
        from: () => [x.get(), 0],
        threshold: 50,
        bounds: { left: auth === 'guest' ? 0 : -side, right: side },
        rubberband: false,
    })

    return (<div css={C.container} ref={ref} style={{ height: height, width: `auto`, left: -side }}>

        <animated.div css={C.left} style={{ x: x, height: height, width: side }}>{props.children[0]}</animated.div>
        <animated.div css={C.center} style={{
            width: width, height: height, x: x,
            transition: 'filter 0.3s ease-in-out',
            filter: xPos !== 1 ? 'brightness(40%)' : '',
            touchAction: xPos !== 1 ? 'pan-y' : 'all',
            pointerEvents: xPos !== 1 ? 'none' : 'all',
        }}>{props.children[1]}</animated.div>
        <animated.div css={C.right} style={{ x: x, height: height, width: side }}>{props.children[2]}</animated.div>

    </div>)
}