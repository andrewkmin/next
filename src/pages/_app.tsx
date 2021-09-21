import type { AppContext, AppProps } from "next/app";
import { getUser } from "../contexts/AuthContext";

const Polygon = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

Polygon.getInitialProps = async (context: AppContext) => {
  const { user } = await getUser();

  return {
    props: {
      user,
    },
  };
};

export default Polygon;
