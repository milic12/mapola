import { defineStyle, extendTheme, type ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
  global: () => ({
    body: {
      bg: "",
    },
  }),
};
const breakpoints = {
  sm: "30em", // 480px
  md: "48em", // 768px
  lg: "62em", // 992px
  xl: "80em", // 1280px
  "2xl": "96em", // 1536px
};

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const colors = {
  text: "#000",
  background: "#fff",
  primary: "#07c",
  modes: {
    dark: {
      text: "#fff",
      background: "#000",
      primary: "#0cf",
    },
  },
};

const headerh3 = defineStyle({
  color: "yellow.500",
  fontFamily: "mono",
  fontWeight: "semibold",
  // let's also provide dark mode alternatives
  _dark: {
    color: "yellow.300",
  },
});

const theme = extendTheme({
  breakpoints,
  styles,
  config,
  colors,
  headerh3,
});
export default theme;
