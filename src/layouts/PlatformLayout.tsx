import { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

interface PlatformLayoutProps {
  children: ReactElement;
}

const PlatformLayout = ({ children }: PlatformLayoutProps) => {
  return (
    <Box>
      <Navbar />
      <Box>{children}</Box>
    </Box>
  );
};

export default PlatformLayout;
