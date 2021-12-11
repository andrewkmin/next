import NextLink from "next/link";
import { NextSeo } from "next-seo";
import { GLOBAL_META_DESCRIPTION } from "../constants";
import { Box, Flex, Image, Link, Stack, Text } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <>
      <NextSeo
        noindex={true}
        nofollow={true}
        openGraph={{
          title: "Not Found - Polygon",
          description: GLOBAL_META_DESCRIPTION,
        }}
        disableGooglebot={true}
        title={"Not Found - Polygon"}
        description={GLOBAL_META_DESCRIPTION}
      />

      <Box h={"100vh"}>
        <Flex h={"100%"} alignItems={"center"} justifyContent={"center"}>
          <Box>
            <Stack spacing={8}>
              <Stack>
                <Text fontWeight={"bold"} fontSize={"3xl"}>
                  Nope, nothing in here.
                </Text>

                <Box>
                  <NextLink passHref href={"/"}>
                    <Link
                      fontSize={"xl"}
                      color={"purple.300"}
                      fontWeight={"semibold"}
                      textDecor={"underline dashed"}
                    >
                      go back to the main page
                    </Link>
                  </NextLink>
                </Box>
              </Stack>

              <Image
                maxH={"300px"}
                alt={"Elmo rage"}
                objectFit={"cover"}
                src={
                  "https://c.tenor.com/iy1RyURkrjgAAAAM/white-guy-blinking-drew-scanlon.gif"
                }
              />
            </Stack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default NotFound;
