import type { GetStaticProps, NextPage } from "next";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

const Home: NextPage = () => {
  return <div></div>;
};

export default Home;
