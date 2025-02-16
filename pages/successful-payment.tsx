import { Box, Heading, Container, Text, Button, Stack } from "@chakra-ui/react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThankYouImage from "../public/images/thank-you.png";
import { AiFillCopy } from "react-icons/ai";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import { useEffect } from "react";
import Link from "next/link";

const SuccessfulPayment = () => {
  const copyButtonText = () => {
    toast.success(`Successfully copied`, {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    navigator.clipboard.writeText("info@mapola.hr");
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <>
      <Container maxW={"3xl"} mt={"100px"}>
        {/* <ToastContainer /> */}
        <Stack
          as={Box}
          // textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          className="thank-you-container"
        >
          <Heading
            className="thankyou"
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Hvala <br />
            vam na vašoj narudžbi
          </Heading>
          <Box className="shoping-man-icon">
            <Image
              src={ThankYouImage}
              alt="thank you image"
              width={"100"}
              height={"100"}
            />
          </Box>
          <Text color={"gray.500"}>
            Za sva dodatna pitanja obratite nam se putem e-maila.
          </Text>

          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
              rightIcon={<AiFillCopy color="white" size="20px" />}
              onClick={copyButtonText}
            >
              info@mapola.hr
            </Button>
            <Box>
              <Link href="/">
                <Button
                  variant={"link"}
                  color={"#cead6d"}
                  className="go-back-button"
                  size={"sm"}
                  leftIcon={
                    <BsFillArrowLeftCircleFill color="#cead6d" size="20px" />
                  }
                >
                  Vrati se na <br />
                  početnu stranicu
                </Button>
              </Link>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default SuccessfulPayment;
