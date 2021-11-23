import { memo } from "react";
import NextLink from "next/link";
import { useUser } from "../stores/useUser";
import { Flex, Box, Link, Text, Stack } from "@chakra-ui/react";

const Component = () => {
  const [user] = useUser(({ user }) => [user]);

  return (
    <NextLink passHref href={`/users/${user.id}`}>
      <Link
        style={{
          textDecoration: "none",
        }}
      >
        <Flex
          p={2}
          border={"2px"}
          borderRadius={"md"}
          alignItems={"center"}
          borderColor={"gray.600"}
        >
          <Box>
            <Stack spacing={-1}>
              <Box>
                <Text>
                  {user.first_name} {user.last_name}
                </Text>
              </Box>

              <Box>
                <Text color={"gray.400"} fontSize={"sm"}>
                  @{user.username}
                </Text>
              </Box>
            </Stack>
          </Box>
        </Flex>
      </Link>
    </NextLink>
  );
};

export const User = memo(Component);
