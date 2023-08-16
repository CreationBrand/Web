import { css } from "@emotion/react"
import { bg_1, bg_2, bg_3, bg_4, text_1, text_2, text_3, text_highlight, text_tert } from "./var"



export const header = css({
    fontWeight: '600',
    color: text_1,
    fontSize: '20px',
    lineHeight: '25px',
    letterSpacing: '1px',
    textRendering: 'optimizeLegibility',
    WebkitFontSmoothing: 'antialiased',
})

export const subheader = css({
    fontWeight: '400',
    color: '#b9bbb3',
    fontSize: '14px',
    lineHeight: '20px',
})


export const label = css({
    // fontFamily: 'noto sans',
    fontWeight: '700',
    color: "#dbdee1",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: ".02em",
    marginBottom: "8px"
})

export const roundButton = {
    background: bg_4,
    fontSize: '12px',
    fontWeight: '600',
    borderRadius: '20px',
    padding: '4px 12px',
}

export const section = css({
    padding: '16px 16px 0 16px'
})

export const time = css({
    fontSize: '12px',
    color: text_3,
    textDecoration: 'none !important',
    '$:hover': {
        textDecoration: 'underline !important',
    },
})


export const iconButton = css({
    ':hover': { color: text_highlight },
    cursor: 'pointer',
    height: '28px !important',
    width: '28px !important',
    minWidth: '28px !important',
    fontSize: '14px !important',
    color: text_3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
})


export const overList = css({
    height: '100%',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    zIndex: 100,
    background: bg_1,
})

export const baseList = css({
    height: '100%',
    width: '100%',
    position: 'absolute',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 50,
    gap: '12px',
    background: bg_1,

})


export const treeLabel = css({
    fontWeight: '700',
    // color: '#dbdee1',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '.02em',
    marginBottom: '8px',
    color: '#d7dadc',
    marginTop: '16px'
})

export const forumLabel = css({
    fontWeight: '700',
    // color: '#dbdee1',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '.04em',
    marginBottom: '8px',
    color: '#d7dadc',
    marginTop: '20px'
})