//@ts-nocheck

import { createTheme } from '@mui/material/styles';

const theme: any = createTheme({

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
                    fontFamily: "noto sans !important",
                    caretColor: 'transparent !important',
                    borderRadius: '8px',
                    border: '2px solid transparent',
                    background: '#181820',

                    '&:hover': {
                        border: `2px solid hsla(0,0%,100%,.1)`
                    },
                    "&.Mui-focused": {
                        border: '2px solid #996ccc',
                        background: '#0e0e10',
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
                    fontFamily: "noto sans !important",
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
                    background: '#0e0e10',
                    color: '#b9bbbe',
                    padding: '8px 12px 8px 12px',
                    fontSize: '13px',
                    fontFamily: "noto sans !important",
                    borderRadius: '8px',
                },
                arrow: {
                    color: '#0e0e10',
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


    background: {
        pri: '#0f0e10',
        sec: '#181820',
        tri: '#272732',
        qua: '#343442',
        pen: '#464649'
    },

    elevation: {
        s: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
        m: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
        l: '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
        x: '0px 8px 10px -5px rgb(0 0 0 / 40%), 0px 16px 24px 2px rgb(1 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 40%);'
    },

    radius: {
        s: '0.2rem',
        m: '0.4rem',
        l: '0.6rem',
        x: '100%'
    },

    palette: {
        mode: 'dark',

        primary: {
            main: '#6858f2',
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

    spacing: (factor: number) => `${0.25 * factor}rem`,

    typography: {
        // pri: 'Noto Sans',
        // sec: 'Noto Sans',
        tri: 'Roboto',
        quad: 'Ubuntu',
    },
});

export default theme;




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

