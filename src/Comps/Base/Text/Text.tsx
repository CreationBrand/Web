/** @jsxImportSource @emotion/react */

import { css, SerializedStyles } from '@emotion/react'
import theme from 'Global/theme'

export const Brand = css({
    color: '#f7f7f8',
    fontFamily: `'Libre Barcode 39 Text'`,
    fontWeight: '400',
    fontSize: '64px',
    textAlign: 'center',
    marginBottom: theme.spacing(2)
})

export const Title1 = css({
  color: '#f7f7f8',
  fontFamily: 'Roboto',
  fontWeight: '600',
  fontSize: '24px',
  textAlign: 'center',
  marginBottom: theme.spacing(2)
})


export const Label = css({
    color: '#f7f7f8',
    fontFamily: theme.typography.font.pri,
    fontWeight: '700',
    fontSize: '13px',
    marginBottom: theme.spacing(2)
})

export const buttonText = css({
    color: 'inherit',
    fontFamily: theme.typography.font.pri,
    fontWeight: '700',
    fontSize: '13px'
})

export const Link = css({
    color: '#bf94ff',
    fontFamily: theme.typography.font.pri,
    fontSize: '12px',
    fontWeight: 400,
    marginTop: theme.spacing(2),
    '&:hover': {
        textDecoration: 'underline'
    },
    cursor: 'pointer'
})

export const Muted = css({
    color: '#adadb8',
    fontFamily: theme.typography.font.pri,
    fontSize: '12px',
    fontWeight: 400,
    marginTop: theme.spacing(2)
})


export const Error = css({
    color: '#ff4763',
    fontFamily: theme.typography.font.pri,
    fontSize: '12px',
    fontWeight: 400,
    marginTop: theme.spacing(2)
})