import {
  Box,
  Link,
  Progress,
  Flex,
  Spacer,
  Stack,
  Badge,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import Router from "next/router";
import NProgress from "nprogress";

const Navbar = () => {
  // For providing smooth navigation experience throughout platform pages by showing a progress bar
  const [status, setStatus] = useState(0);

  // Toggling
  Router.events.on("routeChangeStart", () => {
    NProgress.set(0.5);
    setStatus(NProgress.status!!);
  });

  // Toggling
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
    setStatus(NProgress.status!!);
  });

  return (
    <Box as={"nav"} zIndex={9999} top={0} pos={"sticky"}>
      <Box bgColor={"gray.900"} p={2}>
        <Flex>
          <Box>
            <Stack spacing={0.5} alignItems={"center"} direction={"row"}>
              <NextLink href={"/"} passHref>
                <Link
                  p={2}
                  rounded={"lg"}
                  fontSize={"3xl"}
                  fontWeight={"bold"}
                  color={"purple.400"}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  Polygon
                </Link>
              </NextLink>

              <Box>
                <Badge mb={-1} colorScheme={"purple"}>
                  Public Alpha
                </Badge>
              </Box>
            </Stack>
          </Box>

          <Spacer />

          <Box>{/* TODO */}</Box>
        </Flex>
      </Box>

      {/* Progress bar */}
      <Progress
        max={1.0}
        isAnimated
        size={"xs"}
        value={status}
        roundedBottom={"xl"}
        colorScheme={"purple"}
      />
    </Box>
  );
};

export default Navbar;
