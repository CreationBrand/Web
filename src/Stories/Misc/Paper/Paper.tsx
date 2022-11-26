/** @jsxImportSource @emotion/react */

import { css, useTheme } from '@emotion/react'
import theme from 'Global/Theme'
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
        const s = css(so, {
            width: width,
            height: height,
            background: background && theme.background[background],
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
    background?: any,
    margin?: any,
    padding?: any,
    radius?: any,
    elevation?: any,
}
