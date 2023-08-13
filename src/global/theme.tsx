//@ts-nocheck

import { createTheme } from '@mui/material/styles';
import { accent, bg_1, bg_2 } from './var';

export const theme: any = createTheme({

    components: {
        MuiInput: {
            styleOverrides: {
                input: {
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    cursor: 'text',
                    caretColor: '#fff !important',
                },
                root: {
                    // fontFamily: "noto sans !important",
                    caretColor: 'transparent !important',
                    borderRadius: '8px',
                    border: '2px solid transparent',
                    background: bg_2,

                    '&:hover': {
                        // border: `2px solid hsla(0,0%,100%,.1)`
                    },
                    "&.Mui-focused": {
                        border: `2px solid ${accent}`,
                        // background: bg_1,
                    },
                    '&.Mui-error': {
                        border: '2px solid red',
                    }
                },

            },
        },
        MuiDialog: {
            styleOverrides: {
                paper: {
                    background: 'transparent',

                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    // fontFamily: "noto sans !important",
                    textTransform: 'none',

                },
                label: {
                    textTransform: 'none',
                },
            },
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    boxShadow: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
                    background: bg_1,
                    color: '#b9bbbe',
                    padding: '8px 12px 8px 12px',
                    fontSize: '13px',
                    // fontFamily: "noto sans !important",
                    borderRadius: '8px',
                },
                arrow: {
                    color: bg_1,
                },
            },
        },
        MuiMenu: {

            background: '#0e0e10',

            MuiPaper: {
                styleOverrides: {
                    background: '#0e0e10',

                },
            },
            styleOverrides: {
                root: {

                },
                paper: {
                    background: '#0e0e10',

                },
            },
        },
        MenuList: {
            root: {
                background: '#0e0e10',

                styleOverrides: {
                    background: '#0e0e10',

                },
            }

        },
    },

    palette: {
        mode: 'dark',

        primary: {
            main: accent,
        },
        secondary: {
            main: '#b9bbbe',
        },
        tri: {
            main: '#414052',
            contrastText: '#fff',
        },
        background: {
            default: '#0e0e10',
            paper: '#2f3136',
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
});





declare module '@mui/material/styles' {
    interface Palette {
        tri: Palette['primary'];
    }

    // allow configuration using `createTheme`
    interface PaletteOptions {
        tri?: PaletteOptions['primary'];
    }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        tri: true;
    }

}

