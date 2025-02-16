import { forwardRef } from "react";
import { Box, Spinner } from "@chakra-ui/react";

export const LoadingSpinner = () => (
  <Spinner
    size="xl"
    position="absolute"
    left="50%"
    top="50%"
    ml="calc(0px - var(--spinner-size) / 2)"
    mt="calc(0px - var(--spinner-size))"
  />
);
// eslint-disable-next-line
export const SpinnerContainer = forwardRef(({ children }: any, ref: any) => (
  <Box
    ref={ref}
    className="map-model"
    m="auto"
    mt={["-20px", "-60px", "-50px"]}
    mb={["-40px", "-140px", "50px"]}
    w={[280, 480, 540]}
    h={[280, 480, 540]}
    position="relative"
  >
    {children}
  </Box>
));
