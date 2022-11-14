/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import theme from "Global/Theme";


export const heading2 = css({
    color: '#f7f7f8',
    fontFamily: theme.typography.pri,
    fontWeight: '700',
    fontSize: '25px',
    lineHeight: '30px',
})


export const heading3 = css({
    color: '#f7f7f8',
    fontFamily: theme.typography.quad,
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '24px',
    letterSpacing: '0.5px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

})


export const mutedBold = css({
    color: '#b9bbbe',
    fontFamily: theme.typography.quad,
    fontWeight: '700',
    fontSize: '13px',
    lineHeight: '16px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
})


export const normal = css({
    color: '#bcbdbe',
    fontFamily: theme.typography.sec,
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '18px',
})


export const bold = css({
    fontFamily: theme.typography.quad,
    color: '#fff',
    fontSize: '16px',
    // lineHeight: '16px',
    height: 'min-content',
    fontWeight: '600',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
})


export const smBold = css({
    color: '#f7f7f8',
    fontFamily: theme.typography.pri,
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '14px',

})

export const xsMuted = css({
    color: '#b9bbbe',
    fontFamily: theme.typography.tri,
    fontWeight: '400',
    fontSize: '8px',
    lineHeight: '10px',
})

export const smMuted = css({
    color: '#b9bbbe',
    fontFamily: theme.typography.pri,
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '15px',
})


export const xsLabel = css({
    color: '#b9bbbe',
    fontFamily: theme.typography.pri,
    fontWeight: '600',
    fontSize: '8px',
    lineHeight: '10px',
})