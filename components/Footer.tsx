import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { AiFillInstagram, AiFillFacebook } from "react-icons/ai";
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <Box className="footer-container">
      <Text as="p">©{year} Mapola Design All rights reserverd</Text>
      <Text as="p" className="icons">
        <Link href="https://www.instagram.com/mapola_design/" target="_blank">
          <AiFillInstagram color="CEAD6D" />
        </Link>
        <Link
          href="https://www.facebook.com/profile.php?id=100090706704059"
          target="_blank"
        >
          <AiFillFacebook color="CEAD6D" />
        </Link>
      </Text>
    </Box>
  );
};

export default Footer;
