/** @jsxImportSource @emotion/react */
//@ts-ignore

import theme from "Global/Theme"
import { css } from "@emotion/react"

var tinycolor = require("tinycolor2");


export const hoverable = (background:string) => {
    //@ts-ignore
    let bg = theme.background[background]
    return css({
        '&:hover': {
            background:tinycolor(bg).brighten(10).toString(),
        },
    })
}
export const activeable = (background:string) => {
    //@ts-ignore
    let bg = theme.background[background]
    return css({
        '&:active': {
            background:tinycolor(bg).brighten(15).toString(),
        },
    })
}


