import { css } from "@emotion/react"



// BACKGROUNDS
export const bgPrimary = '#1e1e1e'
export const bgSecondary = '#2e2e2e'
export const bgTertiary = '#3e3e3e'

// pri: '#0f0e10',
// sec: '#181820',
// tri: '#272732',
// qua: '#343442',
// pen: '#464649'

// FONTS
export const fontPrimary = '"Noto Sans"'
export const fontDisplay = '"Noto Sans"'
export const fontHeadline = '"Noto Serif"'


// FONT SIZE
type fontSize = keyof typeof fontSize;
export const fontSize = {
    t: '12px',
    s: '14px',
    m: '16px',
    l: '18px',
    x: '20px',
    g: '30px',
}

export const textBold = (size: fontSize) => css({
    fontFamily: fontPrimary,
    fontWeight: '600',
    color: '#f2f3f5',
    fontSize: fontSize[size],
})
export const textNormal = (size: fontSize) => css({
    fontFamily: fontPrimary,
    fontWeight: '400',
    color: '#f2f2f2',
    fontSize: fontSize[size],
})
export const textLight = (size: fontSize) => css({
    fontFamily: fontPrimary,
    fontWeight: '300',
    color: '#d7dadc',
    fontSize: fontSize[size],
})
export const textLabel = (size: fontSize) => css({
    fontFamily: fontPrimary,
    fontWeight: '700',
    color: '#dbdee1',
    fontSize: fontSize[size],
    textTransform: 'uppercase',
    letterSpacing: '.02em',
    marginBottom: '8px',


})

export const Mixins = {}




// BREAKPOINTS

export const full = '>'


// CONTS

export const header = css({
    fontFamily: 'noto sans',
    fontWeight: '600',
    color: '#f2f3f5',
    fontSize: '24px',
    lineHeight: '20px',

})


export const label = css({
    fontFamily: 'noto sans',
    fontWeight: '700',
    color: "#dbdee1",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: ".02em",
    marginBottom: "8px"
})

export const roundButton = {
    background: '#181820',
    marginLeft: '8px',
    fontSize: '13px',
    fontWeight: '600',
    borderRadius: '20px',
}

export const section = css({
    padding: '16px 16px 0 16px'
})

export const time = css({
    fontSize: '14px',
    color: '#b9bbb3',
    height: '17px',
    fontWeight: 600
})