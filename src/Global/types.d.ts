// THEME

export interface theme {
    palette: {
        [key: string]: {
            default: string
            hover: string
            active: string
            contrast: string
        }
    }
    background: {
        pri: string
        sec: string
        tri: string
        qua: string
        pen: string
    }
}

// PROPS
export type palatte = 'pri' | 'sec' | 'error' | 'warn' | 'info' | 'pass'
export type font = 'pri' | 'sec' | 'tri'
export type background = 'pri' | 'sec' | 'tri' | 'qua' | 'pen'
export type elevation = 's' | 'm' | 'l' | 'x'
export type breakpoint = 's' | 'm' | 'l' | 'x'
export type radius = 's' | 'm' | 'l' | 'x'
export type margin = number
export type padding = number
