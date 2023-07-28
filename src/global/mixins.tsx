import { css } from "@emotion/react"
import { bg_1, bg_2, bg_4, text_2, text_highlight } from "./var"



export const header = css({
    fontWeight: 'bold',
    color: '#f2f3f5',
    fontSize: '20px',
    lineHeight: '20px',
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
    fontWeight: 500,
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
    color: text_2,
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
    marginTop: '18px'
})