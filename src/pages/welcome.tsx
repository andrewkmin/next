import {
  Alert,
  Box,
  Center,
  chakra,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  GLOBAL_META_TITLE,
  OPEN_GRAPH_GLOBAL_TYPE,
  WELCOME_META_DESCRIPTION,
} from "../constants";
import { NextPage } from "next";
import { NextSeo } from "next-seo";
import Auth from "../components/welcome/auth";

// The welcome/authentication page
const Welcome: NextPage = () => {
  return (
    <>
      <NextSeo
        title={GLOBAL_META_TITLE}
        description={WELCOME_META_DESCRIPTION}
        openGraph={{
          title: GLOBAL_META_TITLE,
          type: OPEN_GRAPH_GLOBAL_TYPE,
          description: WELCOME_META_DESCRIPTION,
        }}
      />

      <Box minH={"100vh"}>
        <Alert colorScheme={"purple"} pos={"absolute"}>
          <Text>
            We{`'`}re still launching. If you are experiencing any issues with
            our platform please contact our support team at{" "}
            <chakra.a
              textDecor={"underline"}
              href={"mailto:support@polygon.am"}
            >
              support@polygon.am
            </chakra.a>
          </Text>
        </Alert>

        <Flex
          w={"100vw"}
          minH={"100vh"}
          alignItems={"center"}
          justifyContent={"space-between"}
          direction={["column-reverse", null, null, "row"]}
        >
          <Flex
            w={"full"}
            flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Image
              w={"100%"}
              zIndex={-1}
              border={"none"}
              alt={"Cover image"}
              objectFit={"cover"}
              bgColor={"purple.400"}
              filter={"brightness(60%)"}
              borderColor={"transparent"}
              h={["50vh", null, null, "100vh"]}
              // prettier-ignore
              src={"https://images.unsplash.com/photo-1603118675111-239b194fb8d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=100"}
            />
          </Flex>

          <Flex
            p={10}
            w={"full"}
            maxH={"100%"}
            minH={"50vh"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Box h={"100%"}>
              <Center>
                <Stack mt={16} spacing={5} px={[9, null, null, 0]}>
                  <Stack>
                    <Center>
                      <Heading fontWeight={"bold"} fontSize={"5xl"}>
                        Polygon
                      </Heading>
                    </Center>

                    <Center>
                      <Text fontSize={["xl", "2xl"]} fontWeight={"semibold"}>
                        Private gate to global network
                      </Text>
                    </Center>
                  </Stack>

                  <Auth />
                </Stack>
              </Center>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default Welcome;
