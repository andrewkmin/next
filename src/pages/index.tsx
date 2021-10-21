import {
  Box,
  Container,
  Stack,
  Heading,
  Spinner,
  Button,
  Center,
} from "@chakra-ui/react";
import Head from "next/head";
import { NextPage } from "next";
import axios from "../helpers/axios";
import Post from "../components/Post";
import { useVirtual } from "react-virtual";
import { ReactElement, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import type { Post as PostType } from "../types/post";
import type { User as UserType } from "../types/user";
import PlatformLayout from "../layouts/PlatformLayout";

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

  const flatPosts: Partial<PostType & { user: Partial<UserType> }>[] = [];
  if (data?.pages) data?.pages?.map((page) => flatPosts.concat(page.data));

  const parentRef = useRef();
  const rowVirtualizer = useVirtual({
    parentRef,
    size: hasNextPage ? data?.pages.length!! + 1 : data?.pages.length!!,
  });

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

                <Box>
                  <Stack spacing={4} ref={parentRef as any}>
                    {rowVirtualizer.virtualItems.map((virtualRow) => {
                      return data?.pages[virtualRow.index]?.data.map((post) => {
                        return <Post key={post.id} data={post!!} />;
                      });
                    })}
                  </Stack>
                </Box>

                <Box>
                  <Center>
                    <Button
                      bgColor={"purple.400"}
                      colorScheme={"purple"}
                      onClick={() => fetchNextPage()}
                      isLoading={isFetching || isFetchingNextPage}
                      isDisabled={
                        (!hasNextPage && isPreviousData) ||
                        isFetchingNextPage ||
                        isFetching
                      }
                    >
                      Load more
                    </Button>
                  </Center>
                </Box>
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
