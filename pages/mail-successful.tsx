import React from "react";
import { useRouter } from "next/router";
import { Box, Button, Container, Text } from "@chakra-ui/react";
const ConfirmationMessage = () => {
  const router = useRouter();
  return (
    <Container mt={"100px"}>
      <Box>
        <Text>
          Thank you for submitting this form. Someone should get back to you
          within 24-48 hours.
        </Text>

        <Button
          mt="15px"
          variant="solid"
          color="#686461"
          onClick={() =>
            router.replace("/contact", undefined, { shallow: true })
          }
        >
          Submit Another Mail
        </Button>
      </Box>
    </Container>
  );
};
export default ConfirmationMessage;
