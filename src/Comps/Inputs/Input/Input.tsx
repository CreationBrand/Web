/** @jsxImportSource @emotion/react */
import { css} from '@emotion/react'
import { forwardRef, useState } from 'react'
import { Muted, Error } from 'Comps/Base/Text/Text'
import { useTheme } from '@mui/material/styles';

const Input = forwardRef((props: Props, ref: any) => {

    const theme:any = useTheme()

    let colors = theme.palette.primary;

    const s = css(props.so, {
        background: theme.background.pen,
        border: '2px solid',
        borderColor: props.error ? colors.main : theme.background.pen,
        color: colors.contrastText,
        height: '30px',
        borderRadius: theme.radius.m,
        width: '100%',
        padding: '0.5rem 1rem !important',
        transition: 'border 100ms ease-in,background-color 100ms ease-in',
        outline: 'none',
        '&:hover': {
            border: `2px solid hsla(0,0%,100%,.1)`
        },
        '&:focus': {
            border: `2px solid ${colors.main}`,
            background: theme.background.pri
        }
    })

    const container = css(props.so, {
        display: 'flex',
        flexDirection: 'column'
    })

    return (
        <div css={{ container }}>
            <input {...props.control} css={s} placeholder={props.placeholder} />
            {props.error ? (
                <div css={Error}>{props.errorMessage}</div>
            ) : props.hint ? (
                <div css={Muted}>{props.hint}</div>
            ) : null}
        </div>
    )
})

export default Input

export interface Props {
    so?: any
    control?: any
    error?: boolean
    disabled?: boolean
    placeholder?: string
    hint?: any
    errorMessage?: any
}
