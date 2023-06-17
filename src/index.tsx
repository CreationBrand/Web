// @ts-nocheck

import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from 'App/App'
import RecoilNexus from 'recoil-nexus'
import theme from 'Global/Theme'
import { ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)

// {formatDistanceStrict(parseISO(created_at), new Date(), { addSuffix: true })}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})


const domNode: any = document.getElementById('root');
const root = createRoot(domNode);



root.render(
  <RecoilRoot>
    <RecoilNexus />
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  </RecoilRoot>
);


window.addEventListener('indexDb', (e) => {
  console.log(e)
})



const dbs = await window.indexedDB.databases()
dbs.forEach(db => { window.indexedDB.deleteDatabase(db.name) })


if (window.top !== window.self) {
  // We are in an iframe, prevent access to session storage or IndexedDB
  delete window.sessionStorage;
  delete window.indexedDB;
}

window.addEventListener('drag', ev => {

}, { passive: false });