import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillPhone,
  AiFillCopy,
} from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { HiLocationMarker, HiMail } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactForm from "@/components/contactForm/ContactForm";
import dynamic from "next/dynamic";
import Link from "next/link";
import useBlurData from "@/utils/blurHash";
import QuestionBackImage from "../public/images/contact-us-banner.jpg";

const ContactPage = () => {
  const copyButtonText = (type: string) => {
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
    if (type === "phone") {
      navigator.clipboard.writeText("+(385)-988888888");
    }
    if (type === "email") {
      navigator.clipboard.writeText("info@mapola.hr");
    }
  };

  const [blurDataUrlBannerImage] = useBlurData("LVF5,H~VnhM{%3%2xaoK00Ioxu%M");

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 1 }}
    >
      <Container maxW="full" centerContent overflow="hidden" mt={"100px"}>
        <div>
          <Image
            className="contact-us-banner"
            alt="cover image"
            src={QuestionBackImage}
            blurDataURL={blurDataUrlBannerImage}
            placeholder="blur"
          />
        </div>
        <Box />

        <Flex>
          <Box
            bg="#BACBDB"
            color="white"
            borderRadius="lg"
            className="contact-us-text-section"
          >
            <Box p={4}>
              <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                <WrapItem>
                  <Box className="contact-wrapped-items">
                    <Heading>Contact Us</Heading>
                    <Text mt={{ sm: 3, md: 3, lg: 5 }} color="white">
                      Fill up the form below to contact
                    </Text>
                    <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                      <VStack pl={0} spacing={3} alignItems="flex-start">
                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="white"
                          // _hover={{ border: "2px solid #1C6FEB" }}
                          leftIcon={<AiFillPhone color="white" size="30px" />}
                          rightIcon={<AiFillCopy color="white" size="20px" />}
                          onClick={() => copyButtonText("phone")}
                        >
                          (+385) - 988888888
                        </Button>

                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="white"
                          // _hover={{ border: "2px solid #1C6FEB" }}
                          leftIcon={<HiMail color="white" size="30px" />}
                          rightIcon={<AiFillCopy color="white" size="20px" />}
                          onClick={() => copyButtonText("email")}
                        >
                          info@mapola.hr
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          width="200px"
                          variant="ghost"
                          color="white"
                          display="flex"
                          justifyContent="center"
                          // _hover={{ border: "2px solid #1C6FEB" }}
                          leftIcon={
                            <HiLocationMarker color="white" size="30px" />
                          }
                        >
                          Split, Croatia
                        </Button>
                      </VStack>
                    </Box>
                    <HStack
                      mt={{ lg: 10, md: 10 }}
                      mb={{}}
                      spacing={5}
                      px={5}
                      alignItems="flex-start"
                    >
                      <Link
                        href="https://www.facebook.com/profile.php?id=100090706704059"
                        target="_blank"
                      >
                        <IconButton
                          aria-label="facebook"
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: "#0D74FF" }}
                          icon={<AiFillFacebook size="28px" color="white" />}
                        />
                      </Link>
                      <Link
                        href="https://www.instagram.com/mapola_design/"
                        target="_blank"
                      >
                        <IconButton
                          aria-label="github"
                          variant="ghost"
                          size="lg"
                          isRound={true}
                          _hover={{ bg: "#C13584" }}
                          icon={<AiFillInstagram size="28px" color="white" />}
                        />
                      </Link>
                    </HStack>
                  </Box>
                </WrapItem>

                <ContactForm />
              </Wrap>
            </Box>
          </Box>
        </Flex>
      </Container>
    </motion.div>
  );
};

export default ContactPage;
