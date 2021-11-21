import { extendTheme } from "@chakra-ui/react";
import { ThemeConfig } from "@chakra-ui/theme";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = {
  config,
};

export default extendTheme(theme);
