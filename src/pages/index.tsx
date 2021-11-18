import {
  Box,
  Container,
  Stack,
  Heading,
  Spinner,
  Button,
  Center,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import axios from "../helpers/axios";
import Post from "../components/Post";
import { useVirtual } from "react-virtual";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "react-query";
import PlatformLayout from "../layouts/PlatformLayout";

type Response = {
  next: string | null;
  prev: string | null;
  data: any;
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

  // TODO: Fix typings
  const flatPosts: any = [];
  if (data?.pages) data?.pages?.map((page) => flatPosts.concat(page.data));

  const parentRef = useRef();
  const rowVirtualizer = useVirtual({
    parentRef,
    size: hasNextPage ? data?.pages.length!! + 1 : data?.pages.length!!,
  });

  useEffect(() => {
    const listener = window.addEventListener("scroll", (_) => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 2000 >
        document.documentElement.offsetHeight
      ) {
        fetchNextPage();
      }
    });

    return () => {
      window.removeEventListener("scroll", listener as any);
    };
  }, []);

  return (
    <>
      <NextSeo title={"Polygon"} />

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
                  <Stack spacing={4}>
                    {data?.pages.map((page) => {
                      return page.data.map((post: any) => {
                        return (
                          <>
                            {JSON.stringify({ post }, null, 2)}
                            <br />
                          </>
                        );
                      });
                    })}
                  </Stack>
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
