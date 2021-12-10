import { Box } from "@chakra-ui/react";
import { memo, ReactNode } from "react";

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

export default memo(SharedLayout);
