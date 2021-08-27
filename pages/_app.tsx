import "styles/index.scss";

import { ApolloProvider } from "@apollo/client";
import {
  ChainId,
  Config,
  DAppProvider,
  MULTICALL_ADDRESSES,
} from "@usedapp/core";
import client from "apollo-client";
import { Layout } from "components";
import { readOnlyUrls } from "config";
import type { AppProps } from "next/app";
import Head from "next/head";
import { DefaultSeo } from "next-seo";

import SEO from "../next-seo.config";
// import { MulticallContract } from "artifacts/contracts";

const config: Config = {
  readOnlyUrls: { ...readOnlyUrls },
  supportedChains: [
    ChainId.Mainnet,
    ChainId.Kovan,
    ChainId.Rinkeby,
    ChainId.Ropsten,
    ChainId.Localhost,
    ChainId.Hardhat,
  ],
  multicallAddresses: {
    ...MULTICALL_ADDRESSES,
    // [ChainId.Hardhat]: MulticallContract,
    // [ChainId.Localhost]: MulticallContract,
  },
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <DAppProvider config={config}>
        <DefaultSeo {...SEO} />
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DAppProvider>
    </ApolloProvider>
  );
}

export default MyApp;
