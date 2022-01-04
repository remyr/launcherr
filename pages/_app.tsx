import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import { Header } from '../components/Header';
import { hydrateStore } from '../lib/store';

import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  hydrateStore({ ...pageProps.initialState });

  return (
    <ThemeProvider attribute="class">
      <>
        <Header />
        <Component {...pageProps} />
      </>
    </ThemeProvider>
  );
}

export default MyApp;
