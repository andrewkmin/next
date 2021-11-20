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
import {
  GLOBAL_META_TITLE,
  OPEN_GRAPH_GLOBAL_TYPE,
  GLOBAL_META_DESCRIPTION,
} from "../constants";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import axios from "../helpers/axios";
import Post from "../components/Post";
import { useVirtual } from "react-virtual";
import { ReactElement, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import PlatformLayout from "../layouts/PlatformLayout";
import { useInView } from "react-intersection-observer";

type Response = {
  data: any;
  next: string | null;
  prev: string | null;
};

const Index: NextPage = () => {
  const toast = useToast();
  const {
    isLoading,
    isFetching,
    hasNextPage,
    isPreviousData,
    isFetchingNextPage,

    data,
    fetchNextPage,
  } = useInfiniteQuery(
    "posts",
    async ({ pageParam = null }) => {
      // prettier-ignore
      const path = `/api/discover/posts/${pageParam ? `?cursor=${pageParam}` : ""}`;
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
  const flatPosts: any[] = [];
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

  // Intersection watcher for the `load more` button
  const [buttonViewportRef, _buttonInView] = useInView();

  return (
    <>
      <NextSeo
        title={GLOBAL_META_TITLE}
        description={GLOBAL_META_DESCRIPTION}
        openGraph={{
          title: GLOBAL_META_TITLE,
          type: OPEN_GRAPH_GLOBAL_TYPE,
          description: GLOBAL_META_DESCRIPTION,
        }}
      />

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

                <Button ref={buttonViewportRef} onClick={() => fetchNextPage()}>
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
