import {
  Button,
  Box,
  Flex,
  Stack,
  Text,
  Icon,
  Heading,
  Tooltip,
  IconButton,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { format } from "date-fns";
import truncate from "../lib/truncate";
import { memo, useState } from "react";
import { User } from "../stores/useUser";
import { MdMoreHoriz } from "react-icons/md";
import { TiArrowUpThick } from "react-icons/ti";
import { IoMdChatbubbles } from "react-icons/io";

export interface Post {
  id: string;
  title: string;
  content?: string;
  upvoted: boolean;
  created_at: string;
  upvote_count: number;
  comment_count: number;
}

interface Props {
  data: Partial<Post> & { user: Partial<User> };
}

const Component = ({ data }: Props) => {
  const [state, setState] = useState(data);
  // Truncating post content
  const [content, contentTruncated] = truncate(state?.content!!, 150);

  return (
    <Box>
      <Box
        p={3}
        rounded={"xl"}
        border={"2px"}
        boxShadow={"xl"}
        borderColor={"gray.700"}
      >
        <Stack direction={"row"}>
          <Box>
            <Stack>
              <Box>
                <Stack>
                  <Heading fontSize={"2xl"} color={"gray.100"}>
                    {state?.title}
                  </Heading>

                  <Text
                    fontWeight={"semibold"}
                    color={"gray.200"}
                    fontSize={"sm"}
                  >
                    {content}
                  </Text>
                </Stack>
              </Box>

              <Box>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <Box>
                    <Tooltip label={String(data?.created_at!!)}>
                      <Text fontWeight={"semibold"} fontSize={"sm"}>
                        {format(new Date(data?.created_at!!), "d LLL yyyy")}
                      </Text>
                    </Tooltip>
                  </Box>

                  {contentTruncated && (
                    <Box>
                      <NextLink passHref href={`/posts/${state.id!!}`}>
                        <ChakraLink color={"blue.400"}>Read more</ChakraLink>
                      </NextLink>
                    </Box>
                  )}
                </Flex>
              </Box>
            </Stack>
          </Box>

          <Stack>
            <Button
              size={"sm"}
              rounded={"xl"}
              aria-label={"Upvote"}
              alignItems={"center"}
              leftIcon={<TiArrowUpThick />}
              colorScheme={state?.upvoted ? "red" : "gray"}
            >
              {state?.upvote_count}
            </Button>

            <Button
              size={"sm"}
              rounded={"xl"}
              bgColor={"gray.700"}
              alignItems={"center"}
              aria-label={"Comments"}
              leftIcon={<Icon as={IoMdChatbubbles} color={"blue.400"} />}
            >
              {state?.comment_count}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

// Exporting memoized component by default since,
// re-rendering a post multiple times with Chakra UI is expensive
export const Post = memo(Component);
