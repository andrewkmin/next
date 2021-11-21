import util from "util";
import { NextSeo } from "next-seo";
import { ReactElement } from "react";
import axios from "../../helpers/axios";
import { Post } from "../../components/Post";
import { GetServerSideProps, NextPage } from "next";
import PlatformLayout from "../../layouts/PlatformLayout";
import { Box, Text, Avatar, Stack, useClipboard } from "@chakra-ui/react";
import { USERS_META_DESCRIPTION, USERS_META_TITLE } from "../../constants";
import { User } from "../../stores/useUser";
import { useTokenStore } from "../../stores/useTokenStore";

type ProfileProps = {
  user: Partial<User>;
  followers: Partial<User>[];
  following: Partial<User>[];
  posts: Partial<Post & { user: Partial<User> }>[];
};

export const getServerSideProps: GetServerSideProps<ProfileProps> = async ({
  params,
}) => {
  // Getting the `username` from server-side props
  const { username } = params as { username: string };

  // Fetching the user and their posts
  const [user, posts] = await Promise.all([
    await axios.get(`/api/users/${username}`),
    await axios.get(`/api/posts/${username}`),
  ]);

  // If there are no issues with finding the user and their posts
  if (user.status === 200 && posts.status === 200) {
    // Only fetching relations if user a and their posts were found
    const [followers, following] = await Promise.all([
      await axios.get(`/api/relations/${user.data.id}/followers`),
      await axios.get(`/api/relations/${user.data.id}/following`),
    ]);

    // Only returning all props when everything was found
    if (followers.status === 200 && following.status === 200) {
      return {
        props: {
          user: user.data,
          posts: posts.data,
          followers: followers.data,
          following: following.data,
        },
      };
    }
  }

  // Redirecting to the main page in case of an error
  return {
    redirect: {
      permanent: true,
      destination: "/",
      statusCode: user.status || posts.status,
    },
    notFound: user.status === 404,
  };
};

const Profile: NextPage<ProfileProps> = ({
  user,
  posts,
  followers,
  following,
}) => {
  const token = useTokenStore((state) => state.accessToken);
  console.log(token);

  // Meta values
  const metaTitle = util.format(USERS_META_TITLE, user.username);
  const metaDescription = util.format(USERS_META_DESCRIPTION, user.username);
  // prettier-ignore
  const { onCopy: copyUsername, hasCopied: _ } = useClipboard(user.username!!);

  return (
    <>
      <NextSeo
        title={metaTitle}
        description={metaDescription}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
          profile: {
            username: user.username,
            lastName: user.last_name,
            firstName: user.first_name,
          },
        }}
      />

      <Box p={8}>
        <Box>
          <Stack spacing={8}>
            <Box>
              <Stack spacing={4} direction={"row"} alignItems={"center"}>
                <Avatar size={"xl"} name={user.username} />

                <Stack spacing={-1}>
                  <Text fontSize={"2xl"}>
                    {user.first_name} {user.last_name}
                  </Text>

                  <Stack direction={"row"} alignItems={"center"}>
                    <Text
                      cursor={"pointer"}
                      color={"gray.300"}
                      onClick={() => copyUsername()}
                    >
                      @{user.username}
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
            </Box>

            <Box>
              {(posts as any).data.map((post: any) => {
                return <Post key={post.id} data={post} />;
              })}
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

(Profile as any).getLayout = (page: ReactElement) => (
  <PlatformLayout>{page}</PlatformLayout>
);

export default Profile;
