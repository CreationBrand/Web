import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from 'App/App'
import RecoilNexus from 'recoil-nexus'
import theme from 'Global/Theme'
import { ThemeProvider } from '@mui/material/styles';


ReactDOM.render(
        <RecoilRoot>
        <RecoilNexus />
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </RecoilRoot>
 ,

    document.getElementById('root')
)
