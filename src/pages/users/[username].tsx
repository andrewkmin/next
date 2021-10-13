import {
  Box,
  Text,
  Avatar,
  Stack,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import axios from "../../helpers/axios";
import Post from "../../components/Post";
import { GetServerSideProps, NextPage } from "next";
import { Post as PostType } from "../../types/post";
import { User as UserType } from "../../types/user";
import PlatformLayout from "../../layouts/PlatformLayout";

type ProfileProps = {
  user: Partial<UserType>;
  posts: Partial<PostType>[];
  followers: Partial<UserType>[];
  following: Partial<UserType>[];
};

// const DEFAULT_BACKGROUND_URL =
// "https://images.unsplash.com/photo-1603118675111-239b194fb8d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=100";

export const getServerSideProps: GetServerSideProps<ProfileProps> = async ({
  params,
}) => {
  const { username } = params as any;
  const [posts, user] = await Promise.all([
    await axios.get(`/api/posts/${username}`),
    await axios.get(`/api/accounts/${username}`),
  ]);

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
  const toast = useToast({
    duration: 2000,
    isClosable: true,
    variant: "subtle",
    position: "bottom-start",
  });

  const { onCopy: onUsernameCopy, hasCopied: usernameWasCopied } = useClipboard(
    user.username!!
  );

  const copyUsername = () => {
    // Copying the username
    onUsernameCopy();

    return toast({
      status: "info",
      title: "Copied the username to the clipboard",
    });
  };

  return (
    <Box p={8}>
      <Box>
        <Stack spacing={8}>
          <Box>
            <Stack spacing={4} direction={"row"} alignItems={"center"}>
              <Avatar size={"xl"} src={user.cover} name={user.username!!} />

              <Stack spacing={-1}>
                <Text fontSize={"2xl"}>
                  {user.first_name} {user.last_name}
                </Text>

                <Stack direction={"row"} alignItems={"center"}>
                  <Text
                    cursor={"pointer"}
                    color={"gray.300"}
                    onClick={copyUsername}
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
  );
};

(Profile as any).getLayout = (page: ReactElement) => (
  <PlatformLayout>{page}</PlatformLayout>
);

export default Profile;
