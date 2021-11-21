import { ReactElement } from "react";
import { Box } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";

interface PlatformLayoutProps {
  children: ReactElement;
}

const PlatformLayout = ({ children }: PlatformLayoutProps) => {
  return (
    <>
      <Navbar />
      <Box>{children}</Box>
    </>
  );
};

export default PlatformLayout;
