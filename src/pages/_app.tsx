import 'src/styles/index.scss';
import type { AppProps } from 'next/app';
import wrapper from '@/redux/store';
import Header from '@/components/Header';
import Head from 'next/head';
import React from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';

const errorMessage = <p className="fallback">Something went wrong</p>;

export function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>HP</title>
        <link rel="icon" href="/hpLogo.svg" />
      </Head>
      <div className="background">
        <ErrorBoundary fallback={errorMessage}>
          <Header {...pageProps} />
          <Component {...pageProps} />
        </ErrorBoundary>
      </div>
      ;
    </>
  );
}

export default wrapper.withRedux(App);
