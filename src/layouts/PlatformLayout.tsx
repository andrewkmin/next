import Router from "next/router";
import Navbar from "../components/Navbar";
import { ReactElement, useState } from "react";
import { Box, Progress } from "@chakra-ui/react";

interface PlatformLayoutProps {
  children: ReactElement;
}

const PlatformLayout = ({ children }: PlatformLayoutProps) => {
  // For providing smooth navigation experience throughout platform pages by showing a progress bar
  const [loading, setLoading] = useState(false);

  // Toggling
  Router.events.on("routeChangeStart", () => setLoading(true));
  // Toggling
  Router.events.on("routeChangeComplete", () => setLoading(false));

  return (
    <Box>
      <Navbar />
      {/* Progress bar */}
      <Progress
        size={"xs"}
        roundedBottom={"xl"}
        colorScheme={"purple"}
        isIndeterminate={loading}
        transition={"250ms ease-in-out"}
      />
      <Box>{children}</Box>
    </Box>
  );
};

export default PlatformLayout;
