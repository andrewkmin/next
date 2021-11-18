import theme from "../theme";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import GlobalStyles from "../theme/GlobalStyles";
import SharedLayout from "../layouts/SharedLayout";
import { AuthProvider } from "../contexts/AuthContext";
import { UserProvider } from "../contexts/UserContext";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

/**
 * For supporting page layouts
 */
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

/**
 * `react-query` client
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
});

const Polygon = ({ Component, pageProps }: AppPropsWithLayout) => {
  // For having consistent layouts across pages
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ChakraProvider theme={theme}>
      <GlobalStyles />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <SharedLayout>
        <AuthProvider>
          <UserProvider>
            <QueryClientProvider client={queryClient}>
              {getLayout(<Component {...pageProps} />)}

              <ReactQueryDevtools
                initialIsOpen={false}
                position={"bottom-left"}
              />
            </QueryClientProvider>
          </UserProvider>
        </AuthProvider>
      </SharedLayout>
    </ChakraProvider>
  );
};

export default Polygon;
