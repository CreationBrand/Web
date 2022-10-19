import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from '@emotion/react'
import theme from 'Global/theme'
import App from 'App/App'
import RecoilNexus from 'recoil-nexus'


ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
        <RecoilNexus />
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>,

    document.getElementById('root')
)
