import {
  Tooltip,
  Button,
  IconButton,
  Box,
  Flex,
  Link,
  Stack,
  Text,
  Avatar,
} from "@chakra-ui/react";
import NextLink from "next/link";
import truncate from "../../helpers/truncate";
import { formatDistanceToNow } from "date-fns";
import { User as UserType } from "../../types/user";
import { Post as PostType } from "../../types/post";
import { RiHeart2Fill, RiShareForwardFill, RiChat2Fill } from "react-icons/ri";

interface PostProps {
  data: Partial<PostType & { user: Partial<UserType> }>;
}

const Post = ({ data }: PostProps) => {
  const [isTruncated, body] = truncate(data?.body!!);

  return (
    <Box p={4} rounded={"2xl"} boxShadow={"lg"} bgColor={"gray.900"}>
      <Stack spacing={3}>
        <Box>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Stack alignItems={"center"} direction={"row"} spacing={2.5}>
              <Avatar
                rounded={"full"}
                boxSize={"45px"}
                src={data.user?.avatar}
                name={data.user?.username!!}
              />

              <NextLink passHref href={`/users/${data.user?.username!!}`}>
                <Link
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Tooltip label={`${data.user?.username!!}'s profile`}>
                    <Text userSelect={"none"} fontWeight={"bold"}>
                      @{data.user?.username}
                    </Text>
                  </Tooltip>
                </Link>
              </NextLink>
            </Stack>

            <Stack userSelect={"none"} alignItems={"center"}>
              {/* <Tooltip label={data.created_at?.toString()}> */}
              <Text fontSize={"sm"}>
                {formatDistanceToNow(data.created_at!!, {
                  addSuffix: true,
                  includeSeconds: true,
                })}
              </Text>
              {/* </Tooltip> */}
            </Stack>
          </Flex>
        </Box>

        <Box>
          <Text>
            {body}{" "}
            {isTruncated && (
              <NextLink passHref href={`/posts/${data.id!!}`}>
                <Link color={"purple.500"}>Read more</Link>
              </NextLink>
            )}
          </Text>
        </Box>

        <Box>
          <Stack direction={"row"}>
            <Button rounded={"full"} leftIcon={<RiHeart2Fill />}>
              Heart
            </Button>

            <Tooltip label={"Comments"}>
              <IconButton
                isRound
                icon={<RiChat2Fill />}
                aria-label={"Comments"}
              />
            </Tooltip>

            <Tooltip label={"Share"}>
              <IconButton
                isRound
                icon={<RiShareForwardFill />}
                aria-label={"Share"}
              />
            </Tooltip>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Post;
