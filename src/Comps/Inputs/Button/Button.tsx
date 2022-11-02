/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react'
import { palatte } from 'Global/types'
import { rgba } from 'Util/colorShift'
import { buttonText } from 'Comps/Base/Text/Text'
import theme from 'Global/Theme'

const Button = (props: Props) => {
    const hover = {
        // text: rgba(theme.palette[props.palette].default, 0.1),
        // fill: theme.palette[props.palette].hover,
        // outline: rgba(theme.palette[props.palette].default, 0.1)
    }

    const active = {
        // text: rgba(theme.palette[props.palette].default, 0.2),
        // fill: theme.palette[props.palette].active,
        // outline: rgba(theme.palette[props.palette].default, 0.2)
    }

    // const s = css(props.so, {
    //     height: '30px',
    //     paddingLeft: '1rem',
    //     paddingRight: '1rem',
    //     background:
    //         // props.varient === 'fill'
    //             // ? theme.palette[props.palette].default
    //             // : 'none',
    //     borderRadius: '0.4rem',
    //     outline: 'none',
    //     cursor: 'pointer',
    //     width: props.autoWidth ? '100%' : '',
    //     border: props.varient === 'outline' ? '1px solid' : 'none',
    //     // borderColor: theme.palette[props.palette].default,
    //     color:
    //         props.varient === 'fill'
    //             // ? theme.palette[props.palette].contrast
    //             // : theme.palette[props.palette].default,
    //     '&:hover': {
    //         // background: hover[props.varient]
    //     },
    //     '&:active': {
    //         // background: active[props.varient]
    //     }
    // })

    return (
        <button  onClick={props.onClick}>
            <div css={buttonText}>{props.label}</div>
        </button>
    )
}

export default Button

export interface Props {
    so?: any
    palette: palatte
    varient: 'text' | 'fill' | 'outline'
    label?: string
    autoWidth?: boolean
    onClick?: () => void
}
