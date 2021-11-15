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
import { FiExternalLink } from "react-icons/fi";
import { RiHeart2Fill, RiChat2Fill } from "react-icons/ri";

// TODO: Fix with proper typing
interface PostProps {
  data: any;
}

const Post = ({ data, ...rest }: PostProps) => {
  // Shortening post text
  const [isTruncated, body] = truncate(data?.body!!);

  return (
    <Box p={4} {...rest} rounded={"2xl"} boxShadow={"lg"} bgColor={"gray.900"}>
      <Stack spacing={3}>
        <Box>
          <Flex alignItems={"center"} justifyContent={"space-between"}>
            <Stack alignItems={"center"} direction={"row"} spacing={2.5}>
              <NextLink href={`/users/${data.user?.username!!}`} passHref>
                <Link rounded={"full"}>
                  <Avatar
                    rounded={"full"}
                    boxSize={"45px"}
                    src={data.user?.avatar}
                    name={data.user?.username!!}
                  />
                </Link>
              </NextLink>

              <NextLink passHref href={`/users/${data.user?.username!!}`}>
                <Link
                  p={1}
                  rounded={"lg"}
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
              <Text fontWeight={"bold"} fontSize={"xs"}>
                {formatDistanceToNow(new Date(data.created_at!!), {
                  addSuffix: true,
                  includeSeconds: true,
                })}
              </Text>
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
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
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
            </Stack>

            <Box>
              <NextLink href={`/posts/${data.id!!}`} passHref>
                <Link>
                  <Tooltip label={"Open post"}>
                    <IconButton
                      isRound
                      aria-label={"Open post"}
                      icon={<FiExternalLink />}
                    />
                  </Tooltip>
                </Link>
              </NextLink>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default Post;
