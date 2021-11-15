import {
  Box,
  Container,
  Text,
  Avatar,
  Button,
  Stack,
  Flex,
  Heading,
  Divider,
  Center,
  Input,
} from "@chakra-ui/react";
// import Head from "next/head";
import { NextSeo } from "next-seo";
import { ReactElement } from "react";
import axios from "../../helpers/axios";
import { RiHeart2Fill } from "react-icons/ri";
import truncate from "../../helpers/truncate";
import { formatDistanceToNow } from "date-fns";
import { GetServerSideProps, NextPage } from "next";
import PlatformLayout from "../../layouts/PlatformLayout";

// TODO: Fix with proper typing
type PostPage = {
  post: any;
  comments: any;
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
        comments: comments.data,
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
      <NextSeo
        title={metaTitle}
        description={metaDescription}
        openGraph={{
          type: "article",
          title: metaTitle,
          description: metaDescription,
          article: {
            authors: [post.user.username],
            publishedTime: String(post.created_at),
          },
        }}
      />

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
                  <Stack spacing={4}>
                    <Heading>Comments</Heading>
                    <Divider />
                    <Stack direction={"row"}>
                      <Box w={"full"}>
                        <Input
                          placeholder={"What do you think about this post? 🤔"}
                        />
                      </Box>
                      <Button>Comment</Button>
                    </Stack>
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
