import React from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';

import { Header } from '../components/Header';

import '../styles/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Header />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
