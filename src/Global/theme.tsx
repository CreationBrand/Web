const palette = {
    pri: {
        default: '#9147ff',
        hover: '#772ce8',
        active: '#5c16c5',
        contrast: '#fff'
    },
    sec: {
        default: '#3a3a3d',
        hover: '#27272c',
        active: '#2e2e34',
        contrast: '#fff'
    },
    error: {
        default: '#ff4763',
        hover: '#ffffff33',
        active: '#ffffff40',
        contrast: '#fff'
    },
    warn: {
        default: '#ffffff26',
        hover: '#ffffff33',
        active: '#ffffff40',
        contrast: '#fff'
    },
    info: {
        default: '#ffffff26',
        hover: '#ffffff33',
        active: '#ffffff40',
        contrast: '#fff'
    },
    pass: {
        default: '#ffffff26',
        hover: '#ffffff33',
        active: '#ffffff40',
        contrast: '#fff'
    },
    disabled: {
        default: '#ffffff26',
        hover: '#ffffff33',
        active: '#ffffff40',
        contrast: '#fff'
    }
}
const background = {
    pri: '#0e0e10',
    sec: '#202225',
    tri: '#2f3136',
    qua: '#36393f',
    pen: '#464649'
}
const typography = {
    font: {
        pri: 'Inter',
        sec: 'Noto Sans',
        tri: 'Roboto'
    },
    defaultSize: '16px'
}
const breakpoint = {
    s: '@media only screen and (max-width: 600px)',
    m: '@media (min-width:600px) and (max-width:900px) ',
    l: '@media (min-width:600px) and (max-width:900px) ',
    x: '@media only screen and (min-width: 600px)'
}
const spacing = (factor: number) => `${0.25 * factor}rem`
const tabFocus = {
    outline: '2px solid white',
    boxShadow: '0 0 5px rgba(81, 203, 238, 1)'
}
const elevation = {
    s: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    m: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
    l: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
    x: '0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)'
}
const radius = {
    s: '0.2rem',
    m: '0.4rem',
    l: '0.6rem',
    x: '100%'
}
const theme = {
    palette,
    background,
    typography,
    breakpoint,
    spacing,
    tabFocus,
    elevation,
    radius
}

export default theme
