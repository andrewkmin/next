import NextLink from "next/link";
import { Box, Link } from "@chakra-ui/react";

const Navbar = () => {
  return (
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
  );
};

export default Navbar;
