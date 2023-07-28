


export let accent = '#996ccc'
export let bg_1 = '#0f0e10'
export let bg_2 = '#181820'
export let bg_3 = '#272732'
export let bg_4 = '#3f3f54'

export let bg_hover = '#282835'
export let bg_active = '#2f2f3d'

export let text_1 = '#f2f3f5'
export let text_2 = '#b9bbb3'
export let text_3 = '#b9bbb3'

export let text_highlight = '#fff'
export let shadow_1 = '0px 1px 2px rgba(0, 0, 0, 0.9)'
const theme = localStorage.getItem("theme");

if (theme === 'reddit') {
    accent = '#538a9c'
    bg_1 = '#0b1416'
    bg_2 = '#131f23'
    bg_3 = '#1a282d'
    bg_4 = '#2d454e'
    bg_active = '#21353b'
    bg_hover = '#1a292e'
    text_1 = '#f2f4f5'
    text_2 = '#b8c7c9'
    text_3 = '#313338'
    text_highlight = '#fff'
    shadow_1 = '0px 1px 2px rgba(0, 0, 0, 0.9)'
}

if (theme === 'discord') {
    accent = '#5865f2'
    bg_1 = '#1a1b1d'
    bg_2 = '#28292d'
    bg_3 = '#313338'
    bg_4 = '#464952'
    bg_active = '#404249'
    bg_hover = '#323439'

    text_1 = '#fff'
    text_2 = '#d7dadc'
    text_3 = '#313338'

    text_highlight = '#fff'
    shadow_1 = 'rgba(2, 2, 2, 0.2) 0px 1px 0px 0px, rgba(6, 6, 7, 0.05) 0px 1.5px 0px 0px, rgba(2, 2, 2, 0.05) 0px 2px 0px 0px'
}


// export const shadow_1 = '0px 1px 2px rgba(227, 229, 232, 0.9)'