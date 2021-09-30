import { extendTheme } from "@chakra-ui/react";
import { Theme, ThemeConfig } from "@chakra-ui/theme";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme: Partial<Theme> = {
  config,
};

export default extendTheme(theme);
