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



const c = {
    left: css({
        height: '100%',
        padding: theme.spacing(2),
        paddingRight: '0px',
        boxSizing: 'border-box',
        minWidth: '240px',
        width: '240px',
        marginLeft: '',
        position: 'relative',
        zIndex: '',
        opacity: '',
        transition: 'opacity 0.3s , margin-left 0.3s ease-in-out'
    }),
    right: css({
        height: '100%',
        padding: theme.spacing(2),
        paddingLeft: '0px',
        boxSizing: 'border-box',
        width: '240px',
        position: 'relative',
        right: '',
        zIndex: '',
        opacity: '',
        transition: 'opacity 0.3s , margin-right 0.3s ease-in-out'
    }),
    center: css({
        height: '100%',
        flexGrow: '1',
        boxSizing: 'border-box',
        width: 'auto',
        padding: theme.spacing(2),
        touchAction: 'none',
        position: 'relative',
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



const Tri = (props: Props) => {

    const ref: any = useRef(null)

    return (
        <div id="layout" ref={ref} css={c.layout}>
            <div style={{ marginLeft: (props.left ? '0px' : '-240px') }} css={c.left}>
                {props.children[0]}
            </div>
            <div css={c.center}>
                {props.children[1]}
            </div>
            <div style={{ marginRight: (props.right ? '0px' : '-240px') }} css={c.right}>
                {props.children[2]}
            </div>
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


export const Mobile = (props: Props) => {
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