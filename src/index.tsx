import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from 'App/App'
import RecoilNexus from 'recoil-nexus'
import theme from 'Global/Theme'
import { ThemeProvider } from '@mui/material/styles';

import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { createRoot } from 'react-dom/client';

const domNode: any = document.getElementById('root');
const root = createRoot(domNode);

root.render(
    <RecoilRoot>
        <RecoilNexus />
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </BrowserRouter>
    </RecoilRoot>
);
