import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import '../styles/globals.css';
import type { AppContext, AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { customTheme, darkTheme, lightTheme } from '../themes';
import { CssBaseline } from '@mui/material';
import Router from 'next/router';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

Router.events.on('routeChangeStart', () => nprogress.start());
Router.events.on('routeChangeComplete', () => nprogress.done());
Router.events.on('routeChangeError', () => nprogress.done());

interface Props extends AppProps {
  theme: string;
}

function MyApp({ Component, pageProps }: Props) {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  const theme = Cookies.get('theme') || 'light';

  useEffect(() => {
    setCurrentTheme(
      theme === 'light'
        ? lightTheme
        : theme === 'dark'
        ? darkTheme
        : customTheme
    );
  }, [theme]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

// MyApp.getInitialProps = async (ctx: AppContext) => {
//   const { theme } = ctx.ctx.req
//     ? (ctx.ctx.req as any).cookies
//     : { theme: 'light' };

//   const validTheme = ['light', 'dark', 'custom'];
//   return { theme: validTheme.includes(theme) ? theme : 'light' };
// };

export default MyApp;
