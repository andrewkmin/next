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
import { User } from "../stores/useUser";
import { useVirtual } from "react-virtual";
import { ReactElement, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import PlatformLayout from "../layouts/PlatformLayout";
import { MemoizedPost, Post } from "../components/Post";

type Response = {
  next: string | null;
  prev: string | null;
  data: (Partial<Post> & { user: Partial<User> })[];
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

  // Create a ref for the virtual parent
  const virtualParentRef = useRef(null);
  // Initialize `react-virtual`
  const virtual = useVirtual({
    parentRef: virtualParentRef,
    size:
      hasNextPage && !isPreviousData
        ? data?.pages.length!! + 1
        : data?.pages.length!!,
  });

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
                <Stack spacing={4} ref={virtualParentRef}>
                  {virtual.virtualItems.map((item) => {
                    return data?.pages[item?.index]?.data?.map((item) => {
                      return <MemoizedPost key={item.id} data={item} />;
                    });
                  })}
                </Stack>

                {(isLoading || isFetching || isFetchingNextPage) &&
                  hasNextPage && (
                    <Box>
                      <Center>
                        <Spinner />
                      </Center>
                    </Box>
                  )}

                <Button
                  disabled={
                    isFetching ||
                    !hasNextPage ||
                    isPreviousData ||
                    isFetchingNextPage
                  }
                  onClick={() => hasNextPage && fetchNextPage()}
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
