import NextLink from "next/link";
import { useState } from "react";
import Router, { useRouter } from "next/router";
import { Box, Link, Progress, Text, Stack, Badge } from "@chakra-ui/react";

const Navbar = () => {
  const router = useRouter();
  // For providing smooth navigation experience throughout platform pages by showing a progress bar
  const [status, setStatus] = useState(0);

  Router.events.on("routeChangeStart", () => {
    if (router.pathname !== window.location.pathname) setStatus(100);
  });

  Router.events.on("routeChangeComplete", () => {
    if (router.pathname !== window.location.pathname) setStatus(0);
  });

  return (
    <Box role={"navigation"} as={"nav"} top={0} pos={"sticky"}>
      <Box bgColor={"gray.900"} p={2} pb={[4, 2]}>
        <Stack
          spacing={[-3, 0.5]}
          alignItems={"center"}
          direction={["column", "row", null]}
          justifyContent={["center", "flex-start"]}
        >
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
              <Text>Polygon</Text>
            </Link>
          </NextLink>

          <Box>
            <Badge mb={-1} colorScheme={"purple"}>
              Public Alpha
            </Badge>
          </Box>
        </Stack>
      </Box>

      {/* Progress bar */}
      <Progress
        max={1.0}
        size={"xs"}
        value={status}
        roundedBottom={"xl"}
        colorScheme={"purple"}
      />
    </Box>
  );
};

export default Navbar;
