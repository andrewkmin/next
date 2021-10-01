import Head from "next/head";
import axios from "../helpers/axios";
import Post from "../components/Post";
import type { User as UserType } from "../types/user";
import type { Post as PostType } from "../types/post";
import PlatformLayout from "../layouts/PlatformLayout";
import { Box, Container, Stack } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";

type IndexProps = {
  posts: Partial<PostType & { user: Partial<UserType> }>[];
};

const Index = () => {
  const [next, setNext] = useState("");
  const [posts, setPosts] = useState<IndexProps["posts"]>([]);

  const fetchPosts = async (cursor?: string) => {
    const { data, status } = await axios.get(
      `/api/discover/posts${cursor !== "" ? `?cursor=${cursor}` : ""}`
    );
    setNext(data.next);
    status === 200 && setPosts(posts.concat(data.data));
  };

  useEffect(() => {
    fetchPosts(next);

    return () => {
      setPosts([]);
    };
  }, []);

  return (
    <>
      <Head>
        <title></title>
      </Head>

      <Box>
        <Box p={8}>
          <Container>
            <Stack spacing={5}>
              {posts?.map((post) => {
                return <Post key={post.id} data={post} />;
              })}
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
