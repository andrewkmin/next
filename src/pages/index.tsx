// import crypto from "crypto";
// import Post from "../components/Post";
// import { Post as PostType } from "../types/post";
// import { User as UserType } from "../types/user";
import { Box, Container, Stack } from "@chakra-ui/react";

// const posts: Partial<PostType & { user: Partial<UserType> }>[] = [
//   {
//     user: {
//       username: "mike",
//       first_name: "Michael",
//       last_name: "Grigoryan",
//       cover: "https://picsum.photos/1920/1080",
//       avatar:
//         "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
//       id: crypto.randomBytes(12).toString("hex"),
//     },
//     is_private: false,
//     body: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit fugit illo voluptates tempore commodi harum eaque. Odio debitis voluptate inventore ab laboriosam libero, dolorum soluta ullam ipsum perspiciatis corrupti porro",
//     created_at: new Date(),
//     id: crypto.randomBytes(12).toString("hex"),
//     user_id: crypto.randomBytes(4).toString("hex"),
//   },
// ];

const Index = () => {
  return (
    <Box>
      <Box p={8}>
        <Container>
          <Stack spacing={5}>
            {/* {posts.map((post) => {
              return <Post key={post.id} data={post} />;
            })} */}
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Index;
