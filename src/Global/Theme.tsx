//@ts-nocheck

import { createTheme } from '@mui/material/styles';

// "& fieldset": {
//     border: 'none',

// },
// outline: '1px solid #464649',
// border: 'none',
// background: '#464649',
// height: '30px',
// '&:hover': {
//     outline: `2px solid hsla(0,0%,100%,.1)`
// },
// '&:focus': {
//     outline: '2px solid #9147ff',
//     background: 'red',
// }
const theme: any = createTheme({

    components: {
        MuiInput: {
            styleOverrides: {
                input: {
                    paddingLeft: '12px',
                    paddingRight: '12px',
                    cursor: 'text',
                    caretColor:'#fff !important',
                

                },
                root: {
                    caretColor:'transparent !important',
                    borderRadius: '8px',
                    // height: '30px',
                    border: '2px solid #464649',
                    background: '#423e47',
                    // paddingLeft: '4px',
                    // paddingRight: '4px',
                    '&:hover': {
                        border: `2px solid hsla(0,0%,100%,.1)`
                    },
                    "&.Mui-focused": {
                        border: '2px solid #9147ff',
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
                    background: '#202225',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily:'Roboto',
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
                },
                arrow: {
                    color: '#0e0e10',
                },
            },
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
            main: '#9147ff',
        },
        secondary: {
            main: '#b9bbbe',
        },
        tri:{
            main: '#414052',
            contrastText:'#fff',
        },
        background: {
            default: '#0e0e10',
            paper: '#2f3136',
        },
    },

    spacing: (factor: number) => `${0.25 * factor}rem`,

    typography: {
        pri: 'Inter',
        sec: 'Noto Sans',
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

