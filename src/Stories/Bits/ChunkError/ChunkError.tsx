/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { textBold, textLight, textNormal } from 'Global/Mixins'
import { motion } from 'framer-motion'

const C = {
    container: css({
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: '100px',
    }),
    float: css({
        width: '180px',
        height: '180px',
        position: 'relative',
        display: 'flex',
    }),
}

const ChunkError = ({ variant }: any) => {

    let colors:any = {
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
            <svg className="snurra" width="180" height="180" viewBox="0 0 200 200">
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
            <svg className="skugga" width="180" height="180" viewBox="0 0 200 200">

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
