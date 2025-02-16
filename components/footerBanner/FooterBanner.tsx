import { client } from "@/lib/sanityClient";
import { FooterData } from "@/types";
import { Box, Text } from "@chakra-ui/react";
import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.css";

interface FooterProps {
  footerBanner: FooterData;
}

const FooterBanner = ({ footerBanner }: FooterProps) => {
  const {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    image,
    metaImage,
    product,
    buttonText,
  } = footerBanner;

  const imageProps = Object.assign(
    {},
    useNextSanityImage(client, image && image)
  );

  return (
    <Box className={styles.footerBannerContainer}>
      <Box className={styles.bannerDesc}>
        <Box className={styles.left}>
          {/* <Text as="p">{discount}</Text>
          <Text as="h3">{largeText1}</Text>
          <Text as="h3">{largeText2}</Text>
          <Text as="p">{saleTime}</Text> */}
        </Box>
        <Box className={styles.right}>
          <Text as="p">{smallText}</Text>
          <Text as="h3">{midText}</Text>
          <Text as="p">{desc}</Text>
          <Link href="/personal-map">
            <button type="button">{buttonText}</button>
          </Link>
        </Box>
        <Box className={styles.footerBannerImage}>
          <Image
            {...imageProps}
            alt="footer image"
            placeholder="blur"
            style={{ width: "450px", height: "450px", objectFit: "contain" }}
            blurDataURL={metaImage?.metadata.lqip}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default FooterBanner;
