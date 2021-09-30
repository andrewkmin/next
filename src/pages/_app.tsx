import theme from "../theme";
import type { AppProps } from "next/app";
import GlobalStyles from "../theme/GlobalStyles";
import SharedLayout from "../layouts/SharedLayout";
import { AuthProvider } from "../contexts/AuthContext";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

const Polygon = ({ Component, pageProps }: AppProps) => (
  <ChakraProvider theme={theme}>
    <GlobalStyles />
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <SharedLayout>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SharedLayout>
  </ChakraProvider>
);

export default Polygon;
