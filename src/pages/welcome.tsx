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
import Auth from "../components/welcome/auth";
import { GetServerSideProps, NextPage } from "next";

type WelcomeProps = {
  photoURL: string;
};

export const getServerSideProps: GetServerSideProps<WelcomeProps> = async (
  ctx
) => {
  /**
   * Image options:
   * 1. https://images.unsplash.com/photo-1621347924118-ac0aa8d40b59?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTh8fHB1cnBsZXxlbnwwfDF8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=100
   * 2. https://images.unsplash.com/photo-1603118675111-239b194fb8d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=100 (preferred)
   * 3. https://cdn.pixabay.com/photo/2017/07/08/11/45/purple-2484167_960_720.jpg
   * 4. https://images.unsplash.com/photo-1535478044878-3ed83d5456ef?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=769&q=1080
   */

  return {
    props: {
      photoURL:
        "https://images.unsplash.com/photo-1603118675111-239b194fb8d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1080&q=100",
    },
  };
};

// The welcome/authentication page
const Welcome: NextPage<WelcomeProps> = ({ photoURL }) => {
  return (
    <Box minH={"100vh"}>
      <Alert colorScheme={"purple"} pos={"absolute"}>
        <Text>
          We're still launching. If you are experiencing any issues with our
          platform please contact our support team at{" "}
          <chakra.a textDecor={"underline"} href={"mailto:hi@polygon.am"}>
            hi@polygon.am
          </chakra.a>
        </Text>
      </Alert>

      {/* {isFirstTime !== false && typeof window !== "undefined" && <Greeting />} */}

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
            src={photoURL}
            border={"none"}
            objectFit={"cover"}
            bgColor={"purple.400"}
            filter={"brightness(60%)"}
            borderColor={"transparent"}
            h={["50vh", null, null, "100vh"]}
          />
          {/* <Box
            w={"100%"}
            zIndex={-1}
            // src={photo}
            border={"none"}
            objectFit={"fill"}
            bgColor={"purple.400"}
            filter={"brightness(60%)"}
            borderColor={"transparent"}
            h={["50vh", null, null, "100vh"]}
          >
            <video
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              loop
              autoPlay
              src={"/assets/polygon-welcome-loop.mp4"}
            ></video>
          </Box> */}

          {/* <Image
            w={"15%"}
            zIndex={1}
            pos={"absolute"}
            filter={"brightness(0) invert(1)"}
          /> */}
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
                {/* {!verification ? <Auth /> : <Verification sid={verification} />} */}
              </Stack>
            </Center>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Welcome;
