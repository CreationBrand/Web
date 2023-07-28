/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { authFlow } from "@/state/flow";
import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";

import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { bg_1 } from '@/global/var';
import useWindow from '@/hooks/util/useWindow';

const C = {
    container: css({
        // minHeight: '100vh',
        display: 'flex',
        position: 'fixed',
        top: 48,
        touchAction: 'none',
        background: bg_1,
    }),
    left: css({
        width: '240px',
        minWidth: '240px',
        height: '100%',
        touchAction: 'none',
        padding: 8,
        paddingRight: 8,
    }),
    right: css({
        // width: '80%',
        height: '100%',
        touchAction: 'none',
        padding: 8,
        paddingLeft: 8,
    }),
    center: css({
        width: '100%',
        height: '100%',
        touchAction: 'none',
        // padding: 4,
    }),
}



export const Mobile = (props: any) => {
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

    const [{ x, }, api]: any = useSpring(() => ({ x: map[xPos] }))


    const bind = useDrag(({ movement: [x], down }: any) => {

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

    return (
        <>
            {props.children[3]}
            <div css={C.container} ref={ref} style={{ height: height - 48, width: `auto`, left: -side }}>


                <animated.div css={C.left} style={{ x: x, height: '100%', width: side }}>{props.children[0]}</animated.div>
                <animated.div css={C.center} style={{
                    width: width, height: '100%', x: x,
                    transition: 'filter 0.3s ease-in-out',
                    // filter: xPos !== 1 ? 'brightness(40%)' : '',
                    touchAction: xPos !== 1 ? 'pan-y' : 'all',
                    pointerEvents: xPos !== 1 ? 'none' : 'all',
                }}>{props.children[1]}</animated.div>
                <animated.div css={C.right} style={{ x: x, height: '100%', width: side }}>{props.children[2]}</animated.div>

            </div>
        </>)
}