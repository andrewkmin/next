import NextLink from "next/link";
import { useState } from "react";
import Router from "next/router";
import { Box, Link, Progress, Flex, Spacer } from "@chakra-ui/react";

const Navbar = () => {
  // For providing smooth navigation experience throughout platform pages by showing a progress bar
  const [loading, setLoading] = useState(false);

  // Toggling
  Router.events.on("routeChangeStart", () => setLoading(true));
  // Toggling
  Router.events.on("routeChangeComplete", () => setLoading(false));

  return (
    <Box as={"nav"} zIndex={9999} top={0} pos={"sticky"}>
      <Flex>
        <Box bgColor={"gray.900"} p={4}>
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
        </Box>

        <Spacer />

        <Box>{/* TODO */}</Box>
      </Flex>

      {/* Progress bar */}
      <Progress
        size={"xs"}
        roundedBottom={"xl"}
        colorScheme={"purple"}
        isIndeterminate={loading}
        transition={"250ms ease-in-out"}
      />
    </Box>
  );
};

export default Navbar;
