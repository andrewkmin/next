import Head from "next/head";
import { NextPage } from "next";
import { ReactElement } from "react";
// import type { Post as PostType } from "../types/post";
import PlatformLayout from "../layouts/PlatformLayout";
import { Box, Container, Stack, Heading } from "@chakra-ui/react";

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Polygon</title>
      </Head>

      <Box>
        <Box p={8}>
          <Container>
            <Stack spacing={5}>
              <Heading>Timeline</Heading>
              <Stack spacing={5}></Stack>
            </Stack>
          </Container>
        </Box>
      </Box>
    </>
  );
};

(Index as any).getLayout = (page: ReactElement) => (
  <PlatformLayout>{page}</PlatformLayout>
);

export default Index;
