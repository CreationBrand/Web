/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


import { useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, memo } from "react";


export function usePrevious(value: any) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

function Ticker({ value, color }: any) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue);

    useEffect(() => {
        motionValue.set(value);
    }, [motionValue, value]);

    useEffect(
        () =>
            springValue.on('change', (latest) => {
                if (ref.current) {
                    ref.current.textContent = latest.toFixed();
                }
            }),
        [springValue]
    );

    return <span style={{
        color: color,

        fontSize: '14px',
        lineHeight: '30px',
        fontWeight: 'bold',
    }} ref={ref}>{value}</span>;
}

export default memo(Ticker)
