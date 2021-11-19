import {
  Box,
  Container,
  Stack,
  Heading,
  Spinner,
  Center,
  useToast,
  Button,
} from "@chakra-ui/react";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import axios from "../helpers/axios";
import Post from "../components/Post";
import { useVirtual } from "react-virtual";
import { ReactElement, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import PlatformLayout from "../layouts/PlatformLayout";
// import { useInView } from "react-intersection-observer";

type Response = {
  next: string | null;
  prev: string | null;
  data: any;
};

const Index: NextPage = () => {
  const toast = useToast();
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
      const path = `/api/discover/posts/${
        pageParam ? `?cursor=${pageParam}` : ""
      }`;

      const { data } = await axios.get<Response>(path);

      return data;
    },
    {
      retry: false,
      enabled: true,
      keepPreviousData: true,
      onError: (error) => {
        console.error(error);

        return toast({
          duration: 2000,
          status: "error",
          description: String(error),
          title: "There was an error",
        });
      },
      getNextPageParam: (lastPage) => lastPage.next ?? false,
      getPreviousPageParam: (firstPage) => firstPage.prev ?? false,
    }
  );

  // TODO: Fix typings
  const flatPosts: any = [];
  if (data?.pages) data?.pages?.map((page) => flatPosts.concat(page.data));

  // Initialize `react-virtual`
  const virtualParentRef = useRef<any>(null);
  const virtual = useVirtual({
    parentRef: virtualParentRef,
    size:
      hasNextPage && !isPreviousData
        ? data?.pages.length!! + 1
        : data?.pages.length!!,
  });

  // Intersection watcher
  // const [buttonViewportRef, buttonInView] = useInView();

  return (
    <>
      <NextSeo title={"Polygon"} />

      <Box>
        <Box p={8}>
          <Container>
            <Stack spacing={5}>
              <Heading>Timeline</Heading>

              <Stack spacing={4}>
                <Stack ref={virtualParentRef}>
                  {virtual.virtualItems.map((item) => {
                    return data?.pages[item?.index]?.data?.map((item: any) => {
                      return <Post key={item.id} data={item} />;
                    });
                  })}
                </Stack>

                {(isLoading || isFetching || isFetchingNextPage) && (
                  <Box>
                    <Center>
                      <Spinner />
                    </Center>
                  </Box>
                )}

                <Button
                  // ref={buttonViewportRef}
                  onClick={() => fetchNextPage()}
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
