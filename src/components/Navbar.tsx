import {
  Box,
  Link,
  Flex,
  Progress,
  Text,
  Stack,
  Badge,
} from "@chakra-ui/react";
import { memo } from "react";
import { User } from "./User";
import NextLink from "next/link";

const Component = () => {
  return (
    <Box zIndex={"tooltip"} role={"navigation"} as={"nav"} top={0} pos={"sticky"}>
      <Box bgColor={"gray.900"} p={2} pb={[4, 2]}>
        <Flex justify={"space-between"}>
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

          <User />
        </Flex>
      </Box>

      {/* Progress bar */}
      <Progress
        max={1.0}
        size={"xs"}
        roundedBottom={"xl"}
        colorScheme={"purple"}
      />
    </Box>
  );
};

// Memoizing the navbar to improve the performance
export const Navbar = memo(Component);
