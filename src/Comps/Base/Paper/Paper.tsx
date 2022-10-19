/** @jsxImportSource @emotion/react */

import { css, useTheme } from '@emotion/react'
import { elevation, margin, background, padding, radius } from 'Global/types'
import { forwardRef } from 'react'

const Paper = forwardRef(
    (
        {
            so,
            width,
            height,
            background,
            margin,
            padding,
            radius,
            elevation,
            children
        }: Props,
        ref: any
    ) => {
        const theme: any = useTheme()
        const s = css(so, {
            width: width,
            height: height,
            background: background
                ? theme.background[background]
                : theme.background.pri,
            margin: margin && theme.spacing(margin),
            padding: padding && theme.spacing(padding),
            boxShadow: elevation && theme.elevation[elevation],
            borderRadius: radius && theme.radius[radius]
        })

        return (
            <div ref={ref} css={s}>
                {children}
            </div>
        )
    }
)

export default Paper

export interface Props {
    so?: any
    width?: string
    height?: string
    children?: any
    background?: background
    margin?: margin
    padding?: padding
    radius?: radius
    elevation?: elevation
}
