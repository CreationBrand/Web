/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { motion } from 'framer-motion'

const C = {
    container: css({
        height: '80px',
        width: '80px',
        borderRadius: '8px',
    }),
}

const Icon = () => {
    return (
        <motion.div
            css={C.container}
            animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 180, 360],
            }}
            transition={{
                repeatDelay: 6,
                duration: 2,
                repeat: Infinity,
            }}
        >
            <svg
                width="100px"
                id="e0FOid4Nu8U1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 300 300"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
            >
                <rect
                    width="10"
                    height="100"
                    rx="0"
                    ry="0"
                    transform="matrix(.707107-.707107 0.707107 0.707107 106.534515 54.856552)"
                    fill="#fff"
                    stroke-width="0"
                />
                <rect
                    width="10"
                    height="100"
                    rx="0"
                    ry="0"
                    transform="matrix(.707107-.707107 0.707107 0.707107 106.563551 108.307983)"
                    fill="#fff"
                    stroke-width="0"
                />
                <rect
                    width="10"
                    height="100"
                    rx="0"
                    ry="0"
                    transform="matrix(.707107-.707107 0.707107 0.707107 42.982013 171.631626)"
                    fill="#fff"
                    stroke-width="0"
                />
                <rect
                    width="10"
                    height="100"
                    rx="0"
                    ry="0"
                    transform="matrix(.707107-.707107 0.707107 0.707107 42.982013 171.631626)"
                    fill="#fff"
                    stroke-width="0"
                />
                <rect
                    width="10"
                    height="100"
                    rx="0"
                    ry="0"
                    transform="matrix(.707107 0.707107-.707107 0.707107 177.274229 164.560558)"
                    fill="#fff"
                    stroke-width="0"
                />
                <rect
                    width="10"
                    height="100"
                    rx="0"
                    ry="0"
                    transform="matrix(.707107 0.707107-.707107 0.707107 113.692691 101.236914)"
                    fill="#fff"
                    stroke-width="0"
                />
                <rect
                    width="10"
                    height="100"
                    rx="0"
                    ry="0"
                    transform="matrix(.707107 0.707107-.707107 0.707107 177.274229 164.560558)"
                    fill="#fff"
                    stroke-width="0"
                />
                <rect
                    width="10"
                    height="100"
                    rx="0"
                    ry="0"
                    transform="matrix(.707107-.707107 0.707107 0.707107 42.952977 118.180195)"
                    fill="#fff"
                    stroke-width="0"
                />
                <rect
                    width="10"
                    height="100"
                    rx="0"
                    ry="0"
                    transform="matrix(.707107 0.707107-.707107 0.707107 113.663655 47.785484)"
                    fill="#fff"
                    stroke-width="0"
                />
                <rect
                    width="10"
                    height="100"
                    rx="0"
                    ry="0"
                    transform="matrix(.707107 0.707107-.707107 0.707107 177.245193 111.109127)"
                    fill="#fff"
                    stroke-width="0"
                />
                <rect
                    width="10"
                    height="5.91568"
                    rx="0"
                    ry="0"
                    transform="matrix(.708337 0.705874-3.579678 3.592168 163.095117 111.109127)"
                    fill="#fff"
                    stroke-width="0"
                />
                <rect
                    width="10"
                    height="5.91568"
                    rx="0"
                    ry="0"
                    transform="matrix(.708337 0.705874-3.579678 3.592168 77.826235 150.709805)"
                    fill="#fff"
                    stroke-width="0"
                />
                <rect
                    width="10"
                    height="5.91568"
                    rx="0"
                    ry="0"
                    transform="matrix(-4.738647 0.031428 0.033634 5.071156 434.501357 128.292063)"
                    fill="#d2dbed"
                    stroke-width="0"
                />
                <rect
                    width="10"
                    height="5.91568"
                    rx="0"
                    ry="0"
                    transform="matrix(.710214-.703985 3.570099 3.601688 56.687902 118.11155)"
                    fill="#fff"
                    stroke-width="0"
                />
                <rect
                    width="10"
                    height="5.91568"
                    rx="0"
                    ry="0"
                    transform="matrix(.713728-.700423 3.552032 3.619507 142.394991 157.322439)"
                    fill="#fff"
                    stroke-width="0"
                />
            </svg>
        </motion.div>
    )
}

export default Icon
