/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'


import { useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, memo } from "react";

let formatter = Intl.NumberFormat('en', { notation: 'compact' });

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
            springValue.onChange((latest) => {
                if (ref.current) {
                    ref.current.textContent = latest.toFixed();
                }
            }),
        [springValue]
    );

    return <span style={{ color: color }} ref={ref}>0</span>;
}

export default memo(Ticker)
