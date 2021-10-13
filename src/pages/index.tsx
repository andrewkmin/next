import {
  Box,
  Container,
  Stack,
  Heading,
  Center,
  Spinner,
  Button,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { NextPage } from "next";
import axios from "../helpers/axios";
import Post from "../components/Post";
import { useVirtual } from "react-virtual";
import { useInfiniteQuery } from "react-query";
import type { Post as PostType } from "../types/post";
import type { User as UserType } from "../types/user";
import PlatformLayout from "../layouts/PlatformLayout";
import { ReactElement, useCallback, useRef } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

type Response = {
  next: string | null;
  prev: string | null;
  data: Partial<PostType & { user: Partial<UserType> }>[];
};

const Index: NextPage = () => {
  const {
    data,
    isLoading,
    isFetching,
    hasNextPage,
    fetchNextPage,
    isPreviousData,
    isFetchingNextPage,
  } = useInfiniteQuery(
    "posts",
    async ({ pageParam = null }) => {
      const path = `/api/discover/posts${
        pageParam ? `/?cursor=${pageParam}` : ""
      }`;
      const { data } = await axios.get<Response>(path);
      return data;
    },
    {
      keepPreviousData: true,
      getNextPageParam: (lastPage) => lastPage.next ?? false,
      getPreviousPageParam: (firstPage) => firstPage.prev ?? false,
    }
  );

  const parentRef = useRef();
  const rowVirtualizer = useVirtual({
    parentRef,
    size: data?.pages.length!! + 1,
    estimateSize: useCallback(() => 100, [data?.pages]),
  });

  useBottomScrollListener(() => fetchNextPage());

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
              <Stack spacing={5}>
                {isLoading && (
                  <Box>
                    <Center>
                      <Spinner />
                    </Center>
                  </Box>
                )}

                <Stack spacing={4} ref={parentRef as any}>
                  {rowVirtualizer.virtualItems.map((virtualRow) => {
                    return data?.pages[virtualRow.index]?.data.map((post) => {
                      return <Post key={post.id} data={post!!} />;
                    });
                  })}
                </Stack>

                {isFetching || isFetchingNextPage ? (
                  <Box>
                    <Spinner />
                    <Text>Loading</Text>
                  </Box>
                ) : null}

                <Button
                  colorScheme={"purple"}
                  onClick={() => fetchNextPage()}
                  isDisabled={
                    (!hasNextPage && isPreviousData) ||
                    isFetchingNextPage ||
                    isFetching
                  }
                >
                  Load more
                </Button>
              </Stack>
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
