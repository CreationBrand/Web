/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { textBold, textLight, textNormal } from 'Global/Mixins'
import { motion } from 'framer-motion'

const C = {
    container: css({
        height: '120px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overFlow:'hidden',
   
    }),
    float: css({
        position: 'relative',
        display: 'flex',
    }),

    ".gegga": { width: "0", transition: "all 2s ease-in" },
    ".snurra": { filter: "url(#gegga)", transition: "all 2s ease-in" },
    ".stopp1": { stopColor: "#4b77fb", transition: "all 2s ease-in" },
    ".stopp2": { stopColor: "#8e58f2", transition: "all 2s ease-in" },
    ".halvan": {
        transition: "all 2s ease-in",
        animation: "Snurra1 10s infinite linear",
        strokeDasharray: "180 800",
        fill: "none",
        stroke: "url(#gradient)",
        strokeWidth: 23,
        strokeLinecap: "round"
    },
    ".strecken": {
        animation: "Snurra1 3s infinite linear",
        strokeDasharray: "26 54",
        fill: "none",
        stroke: "url(#gradient)",
        strokeWidth: 23,
        strokeLinecap: "round"
    },
    ".skugga": {
        filter: "blur(5px)",
        opacity: 0.4,
        position: "absolute",
        transform: "translate(3px, 3px)"
    },
    "@keyframes Snurra1": {
        "0%": { strokeDashoffset: 0 },
        "100%": { strokeDashoffset: "-403px" }
    }

}

const ChunkError = ({ variant }: any) => {

    let colors: any = {
        error: '#fb4b4b',
        loading: '#4b77fb',
        end: '#fbb24b',
    }

    return (
        <div css={C.container} key={'error'}>

            <div css={C.float}>
                <svg className="gegga">
                    <defs>
                        <filter id="gegga">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
                            <feColorMatrix
                                in="blur"
                                mode="matrix"
                                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"
                                result="inreGegga"
                            />
                            <feComposite in="SourceGraphic" in2="inreGegga" operator="atop" />
                        </filter>
                    </defs>
                </svg>
                <svg className="snurra" width="120" height="120" viewBox="0 0 200 200">
                    <defs>
                        <linearGradient id="linjärGradient">
                            <stop className="stopp1" css={variant ? { stopColor: colors[variant] } : null} offset="0" />
                            <stop className="stopp2" offset="1" />
                        </linearGradient>
                        <linearGradient
                            y2="160"
                            x2="160"
                            y1="40"
                            x1="40"
                            gradientUnits="userSpaceOnUse"
                            id="gradient"
                            xlinkHref="#linjärGradient"
                        />
                    </defs>
                    <path
                        className="halvan"
                        d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"
                    />
                    <circle className="strecken" cx="100" cy="100" r="64" />
                </svg>
                <svg className="skugga" width="120" height="120" viewBox="0 0 200 200">

                    <path
                        className="halvan"
                        d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"
                    />
                    <circle className="strecken" cx="100" cy="100" r="64" />
                </svg>
            </div>




            <div css={[textNormal('t'), { fontWeight: '400', letterSpacing: '1px', }]}>

                {variant === 'error' && 'Something went wrong...'}
                {variant === 'loading' && 'Loading...'}
                {variant === 'end' && 'Nothing else to load...'}
            </div>

        </div>
    )
}

export default ChunkError
