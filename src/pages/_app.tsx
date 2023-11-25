import 'src/styles/index.scss';
import type { AppProps } from 'next/app';
import { wrapper } from '@/redux/store';
import { Provider } from 'react-redux';
import Header from '@/components/Header';
import Head from "next/head";
import React from "react";

function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <Head>
        <title>HP</title>
        <link rel="icon" href="/hpLogo.svg" />
      </Head>
      <div className="background">
        <Header {...pageProps} />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}

export default App;
