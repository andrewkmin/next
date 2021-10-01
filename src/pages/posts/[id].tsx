import {
  Box,
  Container,
  Text,
  Avatar,
  Button,
  // IconButton,
  Stack,
  Flex,
  // Tooltip,
  Heading,
  Divider,
  Center,
} from "@chakra-ui/react";
import Head from "next/head";
import axios from "../../helpers/axios";
import truncate from "../../helpers/truncate";
import { formatDistanceToNow } from "date-fns";
import { GetServerSideProps, NextPage } from "next";
import type { Post as PostType } from "../../types/post";
import type { User as UserType } from "../../types/user";
import type { Comment as CommentType } from "../../types/comment";
import {
  RiHeart2Fill,
  // RiShareForwardFill
} from "react-icons/ri";
import { ReactElement } from "react";
import PlatformLayout from "../../layouts/PlatformLayout";

type PostPage = {
  post: Partial<PostType & { user: Partial<UserType> }>;
  comments: Partial<CommentType & { user: Partial<UserType> }>[];
};

// Fetching all post information on server-side
export const getServerSideProps: GetServerSideProps<PostPage> = async ({
  params,
}) => {
  // Getting post id from params
  const { id } = params as any;

  // Fetching post data and the comments associated with it
  const [post, comments] = await Promise.all([
    await axios.get(`/api/posts/only/${id}`),
    await axios.get(`/api/comments/${id}`),
  ]);

  // If everything is fine
  if (post.status === 200 && comments.status === 200) {
    return {
      props: {
        post: post.data,
        comments: comments.data.data,
      },
    };
  }

  // If there are issues such as blocked account or non-existent post, redirect
  return {
    redirect: {
      permanent: true,
      destination: "/",
    },
  };
};

const Post: NextPage<PostPage> = ({ post, comments }) => {
  const metaTitle = `${post.user?.username}'s post`;
  const [_, metaDescription] = truncate(post.body!!)[1];

  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta name={"title"} content={metaTitle} />
        <meta name={"description"} content={metaDescription} />

        <meta
          property={"article:published_time"}
          content={String(post.created_at!!)}
        />
        <meta property={"og:type"} content={"article"} />
        <meta property={"og:title"} content={metaTitle} />
        <meta property={"og:description"} content={metaDescription} />
        <meta property={"article:author"} content={post.user?.username} />
      </Head>

      <Box>
        <Stack spacing={6}>
          <Box mt={5}>
            <Container>
              <Box boxShadow={"2xl"} p={4} rounded={"2xl"} bgColor={"gray.900"}>
                <Stack spacing={4}>
                  <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Stack alignItems={"center"} direction={"row"}>
                      <Avatar
                        name={post.user?.username!!}
                        src={post.user?.avatar}
                      />
                      <Text fontWeight={"semibold"}>
                        @{post.user?.username!!}
                      </Text>
                    </Stack>

                    <Box>
                      <Text fontWeight={"semibold"} fontSize={"sm"}>
                        {formatDistanceToNow(new Date(post.created_at!!), {
                          addSuffix: true,
                          includeSeconds: true,
                        })}
                      </Text>
                    </Box>
                  </Flex>

                  <Box>
                    <Text>{post.body!!}</Text>
                  </Box>

                  <Box>
                    <Stack direction={"row"}>
                      <Button leftIcon={<RiHeart2Fill />} rounded={"full"}>
                        Heart
                      </Button>

                      {/* <Tooltip label={"Share"}>
                        <IconButton
                          isRound
                          aria-label={"Share"}
                          icon={<RiShareForwardFill />}
                        />
                      </Tooltip> */}
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Container>
          </Box>

          <Box>
            <Container>
              <Box>
                <Stack spacing={8}>
                  <Stack>
                    <Heading>Comments</Heading>
                    <Divider />
                  </Stack>

                  {comments.length === 0 && (
                    <Center>
                      <Text fontSize={"lg"}>There are no comments yet</Text>
                    </Center>
                  )}
                </Stack>
              </Box>
            </Container>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

(Post as any).getLayout = (page: ReactElement) => (
  <PlatformLayout>{page}</PlatformLayout>
);

export default Post;
