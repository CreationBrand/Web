//@ts-nocheck

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const C = {
    container: css({
        width: '100%',
        height: '100%',
        fontFamily: 'noto sans',
    }),
    ticker: css({
        display: "flex",
        justifyContent: "flex-end",
        overflow: "hidden",
        position: "relative",
    }),
    column: css({
        position: "absolute",
        width: 'min-content',
        zIndex: 1000000,
        bottom: '0',


    }),
    digit: css({
        width: '8px',

        height: '20px',
    }),
}

let formatter = Intl.NumberFormat('en', { notation: 'compact' });

function formatForDisplay(number = 0) {
    return formatter.format(number).toString().split("");
}

function NumberColumn({ digit }: any) {

    const columnContainer: any = useRef();

    const setColumnToNumber = (number: any) => {
        switch (number) {
            case '0':
                return '80px';
            case '1':
                return '100px';
            case '2':
                return '120px';
            case '3':
                return '140px';
            case '4':
                return '160px';
            case '5':
                return '180px';
            case '6':
                return '200px';
            case '7':
                return '220px';
            case '8':
                return '240px';
            case '9':
                return '260px';
            case '.':
                return '60px';
            case '-':
                return '40px';
            case 'K':
                return '20px';
            case 'M':
                return '0px';
        }
    };

    let temp = setColumnToNumber(digit)

    return (
        <div css={C.container} ref={columnContainer}>
            <motion.div
                animate={{ y: temp }}
                css={C.column}
            >
                {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0, '.', '-', 'k', 'm'].map((num) => (
                    <div key={num} css={C.digit}>
                        <span>{num}</span>
                    </div>
                ))}
            </motion.div>
            <span className="number-placeholder">0</span>
        </div>
    );
}

export default function Ticker({ value }: any) {

    const numArray = formatForDisplay(value);
    const previousNumber = usePrevious(value);

    let delta: any = null;
    if (value > previousNumber) delta = "increase";
    if (value < previousNumber) delta = "decrease";

    return (
        <motion.div

            layout css={C.ticker}>
            {numArray.map((number, index) => <NumberColumn key={index} digit={number} delta={delta} />)}
        </motion.div>
    );
}



export function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}
