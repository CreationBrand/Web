import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import App from 'App/App'
import RecoilNexus from 'recoil-nexus'
import theme from 'Global/Theme'
import { ThemeProvider } from '@mui/material/styles';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-quill/dist/quill.snow.css'

const detectRobot = (userAgent: string): boolean => {
  const robots = new RegExp(([
    /bot/,/spider/,/crawl/,                               // GENERAL TERMS
    /APIs-Google/,/AdsBot/,/Googlebot/,                   // GOOGLE ROBOTS
    /mediapartners/,/Google Favicon/,
    /FeedFetcher/,/Google-Read-Aloud/,
    /DuplexWeb-Google/,/googleweblight/,
    /bing/,/yandex/,/baidu/,/duckduck/,/yahoo/,           // OTHER ENGINES
    /ecosia/,/ia_archiver/,
    /facebook/,/instagram/,/pinterest/,/reddit/,          // SOCIAL MEDIA
    /slack/,/twitter/,/whatsapp/,/youtube/,
    /semrush/,                                            // OTHER
  ] as RegExp[]).map((r) => r.source).join("|"),"i");     // BUILD REGEXP + "i" FLAG

  return robots.test(userAgent);
};


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
const userAgent = navigator.userAgent;
const isRobot = detectRobot(userAgent);

if (isRobot) {
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


