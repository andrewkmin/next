import {
  Box,
  Container,
  Text,
  Avatar,
  Image,
  Stack,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import axios from "../../helpers/axios";
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

const DEFAULT_BACKGROUND_URL =
  "https://images.unsplash.com/photo-1603118675111-239b194fb8d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=100";

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

  return {
    redirect: {
      permanent: true,
      destination: "/",
    },
  };
};

const Profile: NextPage<ProfileProps> = ({
  user,
  posts,
  followers,
  following,
}) => {
  return (
    <Box p={8}>
      <Container maxW={"container.md"}>
        <Stack>
          <Box>
            <Avatar size={"xl"} src={user.cover} name={user.username!!} />
          </Box>

          <Box>
            <Stack spacing={1}>
              <Text fontSize={"2xl"}>
                {user.first_name} {user.last_name}
              </Text>
              <Text color={"gray.300"}>@{user.username}</Text>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

(Profile as any).getLayout = (page: ReactElement) => (
  <PlatformLayout>{page}</PlatformLayout>
);

export default Profile;
