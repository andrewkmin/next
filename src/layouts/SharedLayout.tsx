import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface SharedLayoutProps {
  children: ReactNode;
}

const SharedLayout = ({ children }: SharedLayoutProps) => {
  return (
    <Box h={"100%"} w={"100%"}>
      {children}
    </Box>
  );
};

export default SharedLayout;
