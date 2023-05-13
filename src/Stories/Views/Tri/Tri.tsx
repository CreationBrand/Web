/** @jsxImportSource @emotion/react */

import { css, useTheme } from '@emotion/react'
import { useDrag, useGesture } from '@use-gesture/react'
import { useRef, useEffect, useState } from 'react'
import { animated, useSpring } from 'react-spring'
import theme from 'Global/Theme'
import { layoutSizeData } from 'State/Data'
import { useRecoilState } from 'recoil'
import useWindow from 'Hooks/useWindow'



const Tri = (props: Props) => {

    const ref: any = useRef(null)
    const [layoutSize, setLayoutSize] = useRecoilState(layoutSizeData)
    const {width, height} = useWindow()
    const [position, setPosition] = useState(0)


    //runs on every size change (very inefficient)
    useEffect(() => {
        if (width < 800 && layoutSize !== 'mobile') setLayoutSize('mobile')
        if (width > 800 && layoutSize !== 'desktop') setLayoutSize('desktop')
    }, [width])


    //@ts-ignore
    const { x } = useSpring({ x: position * (240) })
    const bind = useDrag(({ swipe: [swipeX] }) => {
        setPosition((p) => Math.min(Math.max(-1, p + swipeX), 1))
    })

    const c = {
        left: css({
            height: '100vh',
            padding: theme.spacing(2),
            paddingRight: '0px',
            boxSizing: 'border-box',
            width: layoutSize === 'mobile' ? '240px !important' : '240px',
            marginLeft: layoutSize !== 'mobile' ? (props.left ? '0px' : '-240px') : '',
            position: layoutSize === 'mobile' ? 'absolute' : 'relative',
            zIndex: layoutSize === 'mobile' ? (position === 1 ? 0 : 80) : '',
            opacity: layoutSize === 'mobile' ? (position === 1 ? 100 : 0) : '',
            transition: 'opacity 0.3s , margin-left 0.3s ease-in-out'
        }),
        right: css({
            height: '100%',
            padding: theme.spacing(2),
            paddingLeft: '0px',
            boxSizing: 'border-box',
            width: layoutSize === 'mobile' ? '240px !important' : '240px',
            // marginRight: props.right
            //     ? '0px'
            //     : layoutSize === 'mobile'
            //     ? '-80% !important'
            //     : '-240px',

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
            padding: (props.left || props.right) && theme.spacing(2),
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

    let condictionalBind = layoutSize === 'mobile' ? bind() : {}
    return (
        <div id="layout" ref={ref} css={c.layout} {...condictionalBind}>
            <animated.div css={c.left}>{props.children[0]}</animated.div>
            <animated.div css={c.center} style={layoutSize === 'mobile' ? { x } : {}}>
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
