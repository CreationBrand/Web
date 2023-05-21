//@ts-nocheck

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import { animate } from "framer-motion";
import { useRef, useEffect } from "react";

let formatter = Intl.NumberFormat('en', { notation: 'compact' });

export function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

export default function Ticker({ value }: any) {

    const from = usePrevious(value);
    const ref = useRef();

    useEffect(() => {
        const controls = animate(from ? from : 0, value, {
            duration: 1,
            style: {

            },
            onUpdate(value) {
                ref.current.textContent = value.toFixed();
            }
        });
        return () => controls.stop();
    }, [value]);

    return <p ref={ref} />;
}