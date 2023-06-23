import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from 'App/App'
import RecoilNexus from 'recoil-nexus'
import theme from 'Global/Theme'
import { ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-quill/dist/quill.snow.css'

const domNode: any = document.getElementById('root');
const root = createRoot(domNode);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

// CRA WORKAROUND 1
var isGoogleCrawler = /Googlebot/.test(navigator.userAgent);
if (isGoogleCrawler) {
  (async () => {
    let preview: any = await fetch(`${process.env.REACT_APP_REST}${window.location.pathname}`)
    let previewHtml = await preview.text()
    document.open();
    window.document.write(previewHtml)
    document.close();
  })();
}
else {
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
}
