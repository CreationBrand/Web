import theme from 'Global/theme'
let set = ['pri',  'sec' , 'error' , 'warn' ,'info' , 'pass', 'disabled']

//@ts-ignore
export const selectPalette = (state: any): color => {
    if (state.disabled) return theme.palette.disabled
    if (state.error) return theme.palette.error
    //@ts-ignore
    if (state.palette in set) return theme.palette[state.palette]
    return theme.palette.pri
}

type color = {
    default: string
    hover: string
    active: string
    contrast: string
}
