import theme from "../theme";
import { NextPage } from "next";
import Router from "next/router";
import NProgress from "nprogress";
import type { AppProps } from "next/app";
import GlobalStyles from "../theme/GlobalStyles";
import SharedLayout from "../layouts/SharedLayout";
import { AuthProvider } from "../contexts/AuthContext";
import { ReactElement, ReactNode, useState } from "react";
import { ChakraProvider, ColorModeScript, Progress } from "@chakra-ui/react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Polygon = ({ Component, pageProps }: AppPropsWithLayout) => {
  // For having consistent layouts across pages
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ChakraProvider theme={theme}>
      <GlobalStyles />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <SharedLayout>
        <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
      </SharedLayout>
    </ChakraProvider>
  );
};

export default Polygon;
